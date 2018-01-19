'use strict';

const log     = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _       = require('lodash');

const queryAllDecks = 'SELECT idDeck, title, description, dateCreate, dateUpdate, createByUserID, results, Active FROM Deck;';
const queryDeckById = 'SELECT idDeck, title, description, dateCreate, dateUpdate, createByUserID, results, Active FROM Deck WHERE idDeck = ?;';
const queryAddDeck = "INSERT INTO Deck VALUES (DEFAULT, ?, ?, NOW(), NULL, ?, '', TRUE)";
const queryUpdateDeckbyID = 'UPDATE Deck SET title=?, description=?, dateUpdate=NOW(), results=?, Active=? WHERE idDeck = ?;';
const queyDeleteDeckbyId = 'DELETE FROM Deck WHERE idCard = ?';

function getAllDecksInfo() {
	return new Promise(function (resolve, reject) {
    // log.info();
		const client = dbUtil.getMariaClient();

		client.query(queryAllDecks,function(err, result){
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

function getDeckById(idDeck) {
	return new Promise(function (resolve, reject) {
		const client = dbUtil.getMariaClient();
		const params = [idDeck];
    log.info(`idDeck = ${idDeck};`);
		client.query(queryDeckById, params, function(err, result){
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

function addNewDeck(titleDeck, descriptionDeck, idUser){
	return new Promise(function (resolve, reject){

    log.info(`titleDeck = ${titleDeck}; descriptionDeck = ${descriptionDeck}; idUser = ${idUser};`);
    //log.info(`country = ${country};`);
    const client = dbUtil.getMariaClient();
    const params = [titleDeck, descriptionDeck, idUser];
		client.getConnection(function (err, connection) {
			connection.query(queryAddDeck, params, function(err, result){
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
					log.info(queryAddDeck);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}

function updateDeckBy(title, description, results, active, idDeck){
  return new Promise(function (resolve, reject){
    log.info(`title = ${title}; description = ${description}; results = ${results}; active = ${active}; idDeck = ${idDeck};`);

    const client = dbUtil.getMariaClient();
    const params = [title, description, results, active, idDeck];
    client.getConnection(function (err, connection) {
      connection.query(queryUpdateDeckbyID, params, function(err, result){
        if(err){
          log.info("Error: ", err);
          reject(err);
        }else {
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
					log.info(queryUpdateDeckbyID);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}


function deleteDeck(idDeck){
  return new Promise(function (resolve, reject){
    log.info(`idCard = ${idCard};`);

    const client = dbUtil.getMariaClient();
    const params = [idCard];
    client.getConnection(function (err, connection) {
      connection.query(queyDeleteDeckbyId, params, function(err, result){
        if(err){
          log.info("Error: ", err);
          reject(err);
        }else {
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
					log.info(queyDeleteDeckbyId);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}


module.exports = {
  getAllDecksInfo,
  getDeckById,
  addNewDeck,
  updateDeckBy,
  deleteDeck
};
