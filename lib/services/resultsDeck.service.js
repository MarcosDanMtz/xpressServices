'use strict';

const log     = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _       = require('lodash');

const queryAllResults = 'SELECT IdResult, IdDeck, ResultDescription, lastUpdate, Active FROM ResultsDeck;';
const queryResultsByIdDeck = 'SELECT IdResult, IdDeck, ResultDescription, lastUpdate, Active FROM ResultsDeck WHERE IdDeck = ?;';
const queryResultsBy = 'SELECT IdResult, IdDeck, ResultDescription, lastUpdate, Active FROM ResultsDeck WHERE IdResult = ?;';
const queryAddResult = "INSERT INTO ResultsDeck VALUES (DEFAULT, ?, ?, NOW(), TRUE);"; //IdDeck, ResultDescription
const queryUpdateResultID = 'UPDATE ResultsDeck SET IdDeck=?, ResultDescription=?, lastUpdate=NOW(), Active = ? WHERE IdResult = ?;';//IdDeck, ResultDescription
const queyDeleteResultsbyId = 'DELETE FROM ResultsDeck WHERE IdResult = ?;'; //idDeck

function getAllResultsInfo(){
    return new Promise(function (resolve, reject) {
        const client = dbUtil.getMariaClient();
        client.query(queryAllResults,function(err, result){
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


function getResultByIdDeck(idDeck) {
	return new Promise(function (resolve, reject) {
		log.info(`idDeck = ${idDeck};`);
		const client = dbUtil.getMariaClient();
		const params = [idDeck];
		client.query(queryResultsByIdDeck, params, function(err, result){
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

function getResultByIdResult(idResult) {
	return new Promise(function (resolve, reject) {
		log.info(`idResult = ${idResult};`);
		const client = dbUtil.getMariaClient();
		const params = [idResult];
		client.query(queryResultsBy, params, function(err, result){
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

function addNewResult(idDeck, descriptionResult, Active){
	return new Promise(function (resolve, reject){

    log.info(`idDeck = ${idDeck}; descriptionResult = ${descriptionResult}; Active = ${Active}`);

    const client = dbUtil.getMariaClient();
    const params = [idDeck, descriptionResult, Active];
		client.getConnection(function (err, connection) {
			connection.query(queryAddResult, params, function(err, result){
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
					log.info(queryAddResult);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}

function updateResultById(idDeck, descriptionResult, Active, idResult){
    return new Promise(function (resolve, reject){
      log.info(`idDeck = ${idDeck}; descriptionResult = ${descriptionResult}; Active = ${Active}; idResult = ${idResult}`);
  
      const client = dbUtil.getMariaClient();
      const params = [idDeck, descriptionResult, Active, idResult];
      client.getConnection(function (err, connection) {
        connection.query(queryUpdateResultID, params, function(err, result){
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
                log.info(queryUpdateResultID);
                log.info(params);
                dbUtil.closeMariaClient(client);
          }
        });
      });
    });
  }

function deleteResult(idresult){
return new Promise(function (resolve, reject){
    log.info(`idresult = ${idresult};`);

    const client = dbUtil.getMariaClient();
    const params = [idresult];
    client.getConnection(function (err, connection) {
    connection.query(queyDeleteResultsbyId, params, function(err, result){
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
                    log.info(queyDeleteResultsbyId);
                    log.info(params);
                    dbUtil.closeMariaClient(client);
        }
    });
    });
});
}



module.exports = {
    getAllResultsInfo,
    getResultByIdDeck,
    getResultByIdResult,
    addNewResult,
    updateResultById,
    deleteResult
};