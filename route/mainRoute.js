'use strict';

const log         = require('../envConfig').logger;
const Joi         = require('joi');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
        log.info('starting Hello, world!');
    }
}]
