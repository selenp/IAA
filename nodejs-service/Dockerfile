#
# docker run -d -p 3013:3013 oizhaolei:node7-centos7
# docker build --rm -t oizhaolei:node7-centos7 .
#

FROM node:7.2.1
MAINTAINER oizhaolei <oizhaolei@gmail.com>

RUN npm install pm2 -g

ADD . /src

RUN cd /src; npm install

EXPOSE 3010

CMD ["pm2-docker", "/src/app.js"]
