'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllCards = 'SELECT idCard, title, description, dateCreate, dateUpdate, createByUserID, Active  FROM Card;';
const queryAddCard = "INSERT INTO Card VALUES (default, ?, ?, now(), null, ?, ?)";
const queryUpdateCard = "UPDATE Card SET title = ?, description = ?, dateUpdate = NOW(), active = ? WHERE idCard = ?;";
const queryDeleteCard = "DELETE FROM Card WHERE idCard = ?";

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
		});
	});
}

function addNewCard(titleCard, descriptionCard, idUser, active){
	return new Promise(function (resolve, reject){

    log.info(`titleCard = ${titleCard}; descriptionCard = ${descriptionCard}; idUser = ${idUser}; active = ${active}`);
    //log.info(`country = ${country};`);
    const client = dbUtil.getMariaClient();
    const params = [titleCard, descriptionCard, idUser, active];
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


function updateNewCard(titleCard, descriptionCard, active, idCard){
  return new Promise(function (resolve, reject){
    log.info(`titleCard = ${titleCard}; descriptionCard = ${descriptionCard}; active = ${active}; idCard = ${idCard};`);

    const client = dbUtil.getMariaClient();
    const params = [titleCard, descriptionCard, active, idCard];
    client.getConnection(function (err, connection) {
      connection.query(queryUpdateCard, params, function(err, result){
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
					log.info(queryUpdateCard);
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
      connection.query(queryDeleteCard, params, function(err, result){
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
					log.info(queryDeleteCard);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}

module.exports = {
  getAllCardsInfo,
  addNewCard,
  updateNewCard,
  deleteCard
};
