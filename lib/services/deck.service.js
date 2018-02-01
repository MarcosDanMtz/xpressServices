'use strict';

const log     = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _       = require('lodash');

const queryAllDecks = 'SELECT idDeck, title, description, dateCreate, dateUpdate, createByUserID, results, Active, UrlImgVideo, EvaluatePeopleThings, IMGVideoFromPT FROM Deck;';
const queryActiveDecks = 'SELECT idDeck, title, description, dateCreate, dateUpdate, createByUserID, results, Active, UrlImgVideo, EvaluatePeopleThings, IMGVideoFromPT FROM Deck WHERE Active = TRUE;';
const queryDeckById = 'SELECT idDeck, title, description, dateCreate, dateUpdate, createByUserID, results, Active, UrlImgVideo, EvaluatePeopleThings, IMGVideoFromPT FROM Deck WHERE idDeck = ?;';
const queryAddDeck = "INSERT INTO Deck VALUES (DEFAULT, ?, ?, NOW(), NULL, ?, '', TRUE, ?, ?, ?)";
const queryUpdateDeckbyID = 'UPDATE Deck SET title=?, description=?, dateUpdate=NOW(), results=?, Active=?, UrlImgVideo=?, EvaluatePeopleThings=?, IMGVideoFromPT = ? WHERE idDeck = ?;';
const queryDeleteDeckbyId = 'DELETE FROM Deck WHERE idDeck = ?';
const queryAllDecksForAnsByIdUser = 'SELECT D.idDeck, D.title, D.description, D.dateCreate, D.dateUpdate, D.createByUserID, D.results, \
																		D.Active, D.UrlImgVideo, D.EvaluatePeopleThings, D.IMGVideoFromPT \
																		FROM Deck D WHERE NOT EXISTS \
																		(SELECT * FROM DecksAnswered DA WHERE DA.idAssociate = ? AND D.idDeck = DA.idDeck ) \
																		AND D.Active = TRUE';


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

function getActiveDecks() {
	return new Promise(function (resolve, reject) {
    // log.info();
		const client = dbUtil.getMariaClient();

		client.query(queryActiveDecks,function(err, result){
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

function getAllDecksForAnsByIdUser(idAssociate) {
	return new Promise(function (resolve, reject) {
		const client = dbUtil.getMariaClient();
		const params = [idAssociate];
    log.info(`idAssociate = ${idAssociate};`);
		client.query(queryAllDecksForAnsByIdUser, params, function(err, result){
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

function addNewDeck(titleDeck, descriptionDeck, idUser, UrlImgVideo, EvaluatePeopleThings, IMGVideoFromPT){
	return new Promise(function (resolve, reject){

    log.info(`titleDeck = ${titleDeck}; descriptionDeck = ${descriptionDeck}; idUser = ${idUser}; UrlImgVideo = ${UrlImgVideo}; EvaluatePeopleThings = ${EvaluatePeopleThings}; IMGVideoFromPT = ${IMGVideoFromPT}`);
    //log.info(`country = ${country};`);
    const client = dbUtil.getMariaClient();
    const params = [titleDeck, descriptionDeck, idUser, UrlImgVideo, EvaluatePeopleThings, IMGVideoFromPT];
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

function updateDeckBy(title, description, results, active, UrlImgVideo, EvaluatePeopleThings, IMGVideoFromPT, idDeck){
  return new Promise(function (resolve, reject){
    log.info(`title = ${title}; description = ${description}; results = ${results}; active = ${active}; UrlImgVideo = ${UrlImgVideo}; EvaluatePeopleThings = ${EvaluatePeopleThings}; IMGVideoFromPT = ${IMGVideoFromPT}; idDeck = ${idDeck};`);

    const client = dbUtil.getMariaClient();
    const params = [title, description, results, active, UrlImgVideo, EvaluatePeopleThings, idDeck];
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
    log.info(`idCard = ${idDeck};`);

    const client = dbUtil.getMariaClient();
    const params = [idDeck];
    client.getConnection(function (err, connection) {
      connection.query(queryDeleteDeckbyId, params, function(err, result){
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
					log.info(queryDeleteDeckbyId);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}


module.exports = {
	getAllDecksInfo,
	getActiveDecks,
  getDeckById,
  addNewDeck,
  updateDeckBy,
	deleteDeck,
	getAllDecksForAnsByIdUser
};
