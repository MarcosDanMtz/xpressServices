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


// create table Results(
// 	IdResult int not null AUTO_INCREMENT, 
//     IdDeck int,
//     ResultDescription varchar(100),
//     lastUpdate datetime,
//     primary key(IdResult)
// )

// SELECT IdResult, IdDeck, ResultDescription FROM Results
// SELECT IdResult, IdDeck, ResultDescription FROM Results WHERE IdDeck = 
// INSERT INTO Results VALUES (DEFAULT, 1, 'DESCRIPTION')


// create table LoginInfo(
// 	idLoginInfo int not null AUTO_INCREMENT, 
//     userId varchar(100),
//     Countryid varchar(100),
//     active	boolean,
//     lastUpdate datetime,
//     primary key(idLoginInfo)
// )