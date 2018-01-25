'use strict';

const bunyan = require('bunyan');
const RotatingFileStream = require('bunyan-rotating-file-stream');

const logger = bunyan.createLogger({
  name: 'innovation',
  streams: [{
    stream: new RotatingFileStream({
      level: 'info',
      path: 'xpressServices.%d-%m-%Y.log',
      gzip: true
    }),
  }],
  src: true
});

let xpressRepository = '';

xpressRepository = {
  db:'xpress',
  host:'127.0.0.1',
  user:'JcD4reMu/wYATnzq0sU0jg==',
  pwd:'ZYzt8+3BBFtFBLDD67JFZg=='
  // host:'104.131.130.192',
  // user:'GKvuPiC+I6AHbN6GyoY+UQ==',
  // pwd:'rKaJp5XU0qgkSl8/wFLfag=='
};

module.exports = {
  logger,
  xpressRepository
};
