/**
 * Handlebars的帮助
 */
const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/utilities');

const util = require('util');
const _ = require('lodash');
const numeral = require('numeral');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const helper = exports.helper = {
  eq: (v1, v2) => v1 === v2,
  about_eq: (v1, v2) => {
    if (v1 && v2) {
      return v1.toString() == v2.toString();
    }
    return false;
  },
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and: (v1, v2) => v1 && v2,
  or: (v1, v2) => v1 || v2,
  add: (v1, v2) => parseFloat(v1, 10) + parseFloat(v2, 10),
  minus: (v1, v2) => v1 - v2,
  multiply: (v1, v2) => parseInt(v1 * v2, 10),
  divide: (v1, v2) => parseFloat(v1, 10) / parseFloat(v2, 10),
  exists: (list, key) => (list ? list.indexOf(key) > -1 : false),
  abbr: (v, length) => {
    if (v) {
      return `${v.substring(0, length)}${v.length > length ? '...' : ''}`;
    }
    return '';
  },
  currency_format: currency => `${numeral(parseFloat(currency)).format('0,0.00')}元`,
  now: f => moment().format(f),
  now_add: (n, unit, f) => moment().add(n, unit).format(f),
  ymd: (date, f) => moment(date).format(f),
  ymd_add: (date, n, unit, f) => moment(date).add(n, unit).format(f),
  not: v1 => !v1,
  toJSON: object => JSON.stringify(object),
  format: (str, arg) => util.format(str, arg),
  trim: str => (str ? str.trim().replace('.', '') : ''),
  split: (str, separator) => (str ? _.split(str, separator) : ''),
  minute2hms: (timer) => {
    const t = timer * 60;
    const h = parseInt(t / 3600, 10);
    const m = parseInt((t % 3600) / 60, 10);
    const s = parseInt(t % 60, 10);

    const hours = h < 10 ? `0${h}` : h;
    const minutes = m < 10 ? `0${m}` : m;
    const seconds = s < 10 ? `0${s}` : s;

    return `${hours}:${minutes}:${seconds}`;
  },
  fen2yuan: fen =>
    numeral(parseInt(fen, 10) / 100).format('0,0'),
  km2meter: km =>
    numeral(parseInt(km * 1000, 10)).format('0,0'),
  times: (n, block) => {
    let accum = '';
    for (let i = 0; i < n; i += 1) {
      accum += block.fn(i);
    }
    return accum;
  },
  getDistanceFromLatLngInKm: (lat1, lng1, lat2, lng2) => {
    const deg2rad = deg => deg * (Math.PI / 180);

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLng = deg2rad(lng2 - lng1);
    const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
          (Math.cos(deg2rad(lat1)) *
           Math.cos(deg2rad(lat2)) *
           Math.sin(dLng / 2) *
           Math.sin(dLng / 2)
          );
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    const distance = d.toFixed(1);
    if (distance < 1) {
      return `约${distance * 1000}m`;
    }
    return `约${distance}km`;
  },
};

// redis的retry策略
exports.redis_retry_strategy = (options) => {
  if (options.error && options.error.code === 'ECONNREFUSED') {
    return new Error('The server refused the connection');
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
    return new Error('Retry time exhausted');
  }
  if (options.times_connected > 10) {
    return undefined;
  }
  // reconnect after
  return Math.max(options.attempt * 100, 3000);
};
