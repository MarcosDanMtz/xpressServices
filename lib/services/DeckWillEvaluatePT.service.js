'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllPTTBE = 'SELECT IdRegistrerPTTBE, IdDeck, IdPTTE, DateCreate, LastUpdate FROM DeckWillEvaluatePT';
const queryAllRTEByidDeck = 'SELECT IdRegistrerPTTBE, IdDeck, IdPTTE, DateCreate, LastUpdate FROM DeckWillEvaluatePT WHERE IdDeck = ?';
const queryInsertTTBE = 'INSERT INTO DeckWillEvaluatePT VALUES (DEFAULT, 4, 3, NOW(), NULL)' //IdDeck, IdPTTE, 

function getAllTTBE() {
	return new Promise(function (resolve, reject) {
		const client = dbUtil.getMariaClient();

		client.query(queryAllPTTBE,function(err, result){
			if (err) {
				dbUtil.closeMariaClient(client);
				reject(err);
			} else {
				if (result.length === 0) {
					resolve('{}');
				} else {
					resolve(result);
				}
			}
			dbUtil.closeMariaClient(client);
		});
	});
}

function getDTTBEByIdDeck(idDeck) {
	return new Promise(function (resolve, reject) {
		log.info(`idDeck = ${idDeck};`);
		const client = dbUtil.getMariaClient();
		const params = [idDeck];
		client.query(queryAllRTEByidDeck, params, function(err, result){
			if (err) {
				dbUtil.closeMariaClient(client);
				reject(err);
			} else {
				if (result.length === 0) {
					resolve('{}');
				} else {
					resolve(result);
				}
			}
			dbUtil.closeMariaClient(client);
		});
	});
}

module.exports = {
    getAllTTBE,
    getDTTBEByIdDeck
};