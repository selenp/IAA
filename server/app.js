const config = require('./config');
const logger = require('./lib/logging').getLogger('app');

const path = require('path');
const fs = require('fs');

const express = require('express');
const Rollbar = require('rollbar');

const rollbar = new Rollbar('9ed41a9be5834ee8a6d76399adee630b');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const socketHelper = require('./lib/socket_helper');
const appHelper = require('./lib/app_helper');

io.on('connection', socket => socketHelper.helper(socket));

appHelper.helper(app, io);

const bodyParser = require('body-parser');
const redis = require('promise-redis')();

const redisClient = redis.createClient(config.redis);

const errors = require('./lib/errors');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization,Cache-Control');
  next();
});

app.use('/', express.static(path.join(__dirname, 'public')));

// logger
app.use((req, res, next) => {
  logger.info(`----------- New Request ---------
${req.method}: ${req.originalUrl}
query: ${JSON.stringify(req.query)}
body: ${JSON.stringify(req.body)}
---------------------------------`);
  next();
});

// user authorization
app.use(async (req, res, next) => {
  try {
    logger.debug('authorization:', req.headers.authorization);
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      req.$token = token;

      const mobile = await redisClient.get(token);

      req.$wxUserInfo = JSON.parse(await redisClient.get(mobile));
      logger.debug('wxUserInfo:', req.$wxUserInfo);
    }
  } catch (e) {
    logger.error('无效的token', e);
  }
  next();
});

// load router
fs.readdirSync(path.join(__dirname, 'api')).forEach((file) => {
  if (file.endsWith('.js')) {
    const name = file.split('.')[0];
    let p = '/api';
    if (name !== 'index') {
      p = `/api/${name}`;
    }
    logger.debug(p);
    app.use(p, require(`./api/${name}`)); // name
  }
});

// load manage portal
fs.readdirSync(path.join(__dirname, 'mp')).forEach((file) => {
  if (file.endsWith('.js')) {
    const name = file.split('.')[0];
    let p = '/mp';
    if (name !== 'index') {
      p = `/mp/${name}`;
    }
    logger.debug(p);
    app.use(p, require(`./mp/${name}`)); // name
  }
});

/* app.use('/graphql', graphqlHTTP (req => ({
 *   schema,
 *   pretty: true,
 *   graphiql: true,
 * })));
 * */

// Errors load
errors(app);

server.listen(config.port);
