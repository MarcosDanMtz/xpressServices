'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllCards = 'SELECT idCard, title, description, dateCreate, dateUpdate, createByUserID, Active, idDeck, UrlImgVideo FROM Card;';
const queryGetCardById = 'SELECT idCard, title, description, dateCreate, dateUpdate, createByUserID, Active, idDeck, UrlImgVideo FROM Card WHERE idCard = ? AND Active = TRUE;';
const queryGetCardByIdDeck = 'SELECT idCard, title, description, dateCreate, dateUpdate, createByUserID, Active, idDeck, UrlImgVideo FROM Card WHERE idDeck = ? AND Active = TRUE;';
const queryAddCard = "INSERT INTO Card VALUES (default, ?, ?, now(), null, ?, ?, ?, ?)";
const queryUpdateCardBy = "UPDATE Card SET title = ?, description = ?, dateUpdate = NOW(), active = ?, idDeck = ?, UrlImgVideo = ? WHERE idCard = ? AND Active = TRUE;";
const queryDeleteCardById = "DELETE FROM Card WHERE idCard = ?";
const queryCardsNoVotedByDeck = 'SELECT * FROM Card C WHERE NOT EXISTS (SELECT idCard FROM VotesCard V WHERE idAssociate = ? and C.idCard = V.idCard) AND C.idDeck = ? AND C.Active = TRUE'
const queryCardsNVPTByIdDeck = 'SELECT C.idCard, PT.NameObject title, C.description, C.idDeck, PT.IdThingPeople, PT.isAssociate, Pt.ImgVideoURL UrlImgVideo \
																FROM Card C, PeopleThingsToEvaluate PT, DeckWillEvaluatePT DWEPT \
																WHERE DWEPT.IdDeck = C.idDeck AND DWEPT.IdPTTE = PT.IdThingPeople AND  DWEPT.IdDeck = ? \
																AND NOT EXISTS (SELECT * FROM VotesCard V, Deck D \
																WHERE C.idCard = V.idCard AND V.idThingsPeopleToEvaluate = PT.IdThingPeople AND C.idDeck = D.idDeck AND D.idDeck = ? AND V.idAssociate = ?) \
																ORDER BY RAND()'

function getAllCardsInfo() {
	return new Promise(function (resolve, reject) {
    // log.info();
		const client = dbUtil.getMariaClient();

		client.query(queryAllCards,function(err, result){
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

function getCardByIdDeck(idDeck) {
	return new Promise(function (resolve, reject) {
		log.info(`idDeck = ${idDeck};`);
		const client = dbUtil.getMariaClient();
		const params = [idDeck];
		client.query(queryGetCardByIdDeck, params, function(err, result){
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

function getCardNoVotedYetByIdDeck(idAssociate, idDeck) {
	return new Promise(function (resolve, reject) {
		log.info(`idAssociate = ${idAssociate}; idDeck = ${idDeck};`);
		const client = dbUtil.getMariaClient();
		const params = [idAssociate, idDeck];
		client.query(queryCardsNoVotedByDeck, params, function(err, result){
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

function getCardNVPTByIdDeck(idAssociate, idDeck) {
	return new Promise(function (resolve, reject) {
		log.info(`idAssociate = ${idAssociate}; idDeck = ${idDeck};`);
		const client = dbUtil.getMariaClient();
		const params = [idDeck, idDeck, idAssociate];
		client.query(queryCardsNVPTByIdDeck, params, function(err, result){
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

function addNewCard(titleCard, descriptionCard, idUser, active, idDeck, UrlImgVideo){
	return new Promise(function (resolve, reject){

    log.info(`titleCard = ${titleCard}; descriptionCard = ${descriptionCard}; idUser = ${idUser}; active = ${active}; idDeck = ${idDeck}; UrlImgVideo = ${UrlImgVideo}`);

    const client = dbUtil.getMariaClient();
    const params = [titleCard, descriptionCard, idUser, active, idDeck, UrlImgVideo];
		client.getConnection(function (err, connection) {
			connection.query(queryAddCard, params, function(err, result){
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
					log.info(queryAddCard);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}


function updateNewCardBy(title, description, active, idDeck, UrlImgVideo, idCard){
  return new Promise(function (resolve, reject){
    log.info(`title = ${title}; description = ${description}; active = ${active}; idDeck = ${idDeck}; UrlImgVideo = ${UrlImgVideo}; idCard = ${idCard};`);

    const client = dbUtil.getMariaClient();
    const params = [title, description, active, idDeck, UrlImgVideo, idCard];
    client.getConnection(function (err, connection) {
      connection.query(queryUpdateCardBy, params, function(err, result){
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
					log.info(queryUpdateCardBy);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}

function deleteCard(idCard){
  return new Promise(function (resolve, reject){
    log.info(`idCard = ${idCard};`);

    const client = dbUtil.getMariaClient();
    const params = [idCard];
    client.getConnection(function (err, connection) {
      connection.query(queryDeleteCardById, params, function(err, result){
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
					log.info(queryDeleteCardById);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}


function getCardById(idCard) {
	return new Promise(function (resolve, reject) {
		log.info(`idCard = ${idCard};`);
		const client = dbUtil.getMariaClient();
		const params = [idCard];
		client.query(queryGetCardById, params, function(err, result){
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
  getAllCardsInfo,
  addNewCard,
  updateNewCardBy,
  deleteCard,
	getCardById,
	getCardByIdDeck,
	getCardNoVotedYetByIdDeck,
	getCardNVPTByIdDeck
};
