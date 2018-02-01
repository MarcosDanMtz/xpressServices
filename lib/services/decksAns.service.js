'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllDeksAns = 'SELECT idDecksAns, idDeck, idAssociate, dateCreate FROM DecksAnswered';
const queryAddDeckAdns = 'INSERT INTO DecksAnswered VALUES (DEFAULT, ?, ?, NOW())'; //idDeck, idAssociate

function getAllDecksAns() {
	return new Promise(function (resolve, reject) {
    // log.info();
		const client = dbUtil.getMariaClient();

		client.query(queryAllDeksAns,function(err, result){
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


function addNewDeckAns(idDeck, idAssociate){
	return new Promise(function (resolve, reject){

    log.info(`idDeck = ${idDeck}; idAssociate = ${idAssociate};`);

    const client = dbUtil.getMariaClient();
    const params = [idDeck, idAssociate];
		client.getConnection(function (err, connection) {
			connection.query(queryAddDeckAdns, params, function(err, result){
			  if (err) {

					log.info("Error: ", err);
	        reject(err);
			  } else {
					connection.commit(function (errorCom) {
					    if (errorCom) {
					      return connection.rollback(function() {
					        log.info('Error while commiting query ...');
					        log.info(errorCom);
									dbUtil.closeMariaClient(client);
					      });
					    }
					    log.info('Query executed successfully');
					});
					log.info("Resul: ",result);
				  resolve('success');
					log.info(queryAddDeckAdns);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}


module.exports = {
    getAllDecksAns,
    addNewDeckAns
}