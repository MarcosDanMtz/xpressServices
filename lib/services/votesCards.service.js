'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllVoteCards = 'SELECT IdRegistrer, idCard, idAssociate, vote, DateCreate, lastUpdate, Active, idThingsPeopleToEvaluate FROM VotesCard;';
const queryGetVoteCardsByIdRegistrer = 'SELECT IdRegistrer, idCard, idAssociate, vote, DateCreate, lastUpdate, Active, idThingsPeopleToEvaluate FROM VotesCard WHERE IdRegistrer = ?;';
const queryGetVoteCardsByIdCard = 'SELECT IdRegistrer, idCard, idAssociate, vote, DateCreate, lastUpdate, Active, idThingsPeopleToEvaluate FROM VotesCard WHERE idCard = ?;';
const queryAddVotesCard = "INSERT INTO VotesCard VALUES (DEFAULT, ?, ?, ?, NOW(), NULL, TRUE, ?);";//idCard, idAssociate, 
const queryUpdateVotesCard = "UPDATE VotesCard SET idCard = ?, idAssociate = ?, vote = ?, lastUpdate = NOW(), Active = ?, idThingsPeopleToEvaluate = ? WHERE IdRegistrer = ?;";//idCard, idAssociate, vote, Active IdRegistrer
const queryDeleteVoteCardsById = "DELETE FROM VotesCard WHERE IdRegistrer = ?;";

function getAllVoteCards() {
	return new Promise(function (resolve, reject) {
    // log.info();
		const client = dbUtil.getMariaClient();

		client.query(queryAllVoteCards,function(err, result){
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

function getVoteCardsByIdRegistrer(IdRegistrer) {
	return new Promise(function (resolve, reject) {
		log.info(`IdRegistrer = ${IdRegistrer};`);
		const client = dbUtil.getMariaClient();
		const params = [IdRegistrer];
		client.query(queryGetVoteCardsByIdRegistrer, params, function(err, result){
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

function getVoteCardsByIdCard(idCard) {
	return new Promise(function (resolve, reject) {
		log.info(`idCard = ${idCard};`);
		const client = dbUtil.getMariaClient();
		const params = [idCard];
		client.query(queryGetVoteCardsByIdCard, params, function(err, result){
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

function addVotesCard(idCard, idAssociate, vote, idThingsPeopleToEvaluate){
	return new Promise(function (resolve, reject){

    log.info(`idCard = ${idCard}; idAssociate = ${idAssociate}; vote = ${vote}; idThingsPeopleToEvaluate = ${idThingsPeopleToEvaluate}`);

    const client = dbUtil.getMariaClient();
    const params = [idCard, idAssociate, vote, idThingsPeopleToEvaluate];
		client.getConnection(function (err, connection) {
			connection.query(queryAddVotesCard, params, function(err, result){
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
					log.info(queryAddVotesCard);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}


function updateNewVotesCard(idCard, idAssociate, vote, Active, idThingsPeopleToEvaluate, IdRegistrer){
    return new Promise(function (resolve, reject){
      log.info(`idCard = ${idCard}; idAssociate = ${idAssociate}; vote = ${vote}; Active = ${Active}; idThingsPeopleToEvaluate = ${idThingsPeopleToEvaluate}; IdRegistrer = ${IdRegistrer};`);
  
      const client = dbUtil.getMariaClient();
      const params = [idCard, idAssociate, vote, Active, idThingsPeopleToEvaluate, IdRegistrer];
      client.getConnection(function (err, connection) {
        connection.query(queryUpdateVotesCard, params, function(err, result){
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
                      log.info(queryUpdateVotesCard);
                      log.info(params);
                      dbUtil.closeMariaClient(client);
          }
        });
      });
    });
  }


  function deleteVotesCard(IdRegistrer){
    return new Promise(function (resolve, reject){
      log.info(`IdRegistrer = ${IdRegistrer};`);
  
      const client = dbUtil.getMariaClient();
      const params = [IdRegistrer];
      client.getConnection(function (err, connection) {
        connection.query(queryDeleteVoteCardsById, params, function(err, result){
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
                      log.info(queryDeleteVoteCardsById);
                      log.info(params);
                      dbUtil.closeMariaClient(client);
          }
        });
      });
    });
  }

module.exports = {
    getAllVoteCards,
    getVoteCardsByIdRegistrer,
    getVoteCardsByIdCard,
    addVotesCard,
    updateNewVotesCard,
    deleteVotesCard
};
  