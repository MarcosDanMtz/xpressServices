'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllCards = 'SELECT idCard, title, description, dateCreate, dateUpdate, createByUserID, Active, idDeck, UrlImgVideo FROM Card;';
const queryGetCardById = 'SELECT idCard, title, description, dateCreate, dateUpdate, createByUserID, Active, idDeck, UrlImgVideo FROM Card WHERE idCard = ?;';
const queryAddCard = "INSERT INTO Card VALUES (default, ?, ?, now(), null, ?, ?, ?, ?)";
const queryUpdateCardBy = "UPDATE Card SET title = ?, description = ?, dateUpdate = NOW(), active = ?, idDeck = ?, UrlImgVideo = ? WHERE idCard = ?;";
const queryDeleteCardById = "DELETE FROM Card WHERE idCard = ?";

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
	getCardById
};
