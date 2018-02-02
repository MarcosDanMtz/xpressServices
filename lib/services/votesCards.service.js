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
const queryValuesForProm = 'SELECT COUNT(*) AS TotalTrue FROM VotesCard WHERE idCard = ? AND vote = TRUE; \
														SELECT COUNT(*) AS TotalTrue FROM VotesCard WHERE idCard = ? AND vote = FALSE; \
														SELECT COUNT(*) AS TotalVotesCard FROM VotesCard WHERE idCard = ?;';
const queryBestVsWorst = 'SELECT V.idCard, COUNT(V.vote) countVotes FROM VotesCard V, Card C WHERE C.idCard = V.idCard AND C.idDeck = ? AND V.vote = TRUE \
													GROUP BY (V.idCard) ORDER BY countVotes DESC LIMIT 1; \
													SELECT V.idCard, COUNT(V.vote) countVotes FROM VotesCard V, Card C WHERE C.idCard = V.idCard AND C.idDeck = ? AND V.vote = TRUE \
													GROUP BY (V.idCard) ORDER BY countVotes ASC LIMIT 1; \
													SELECT V.idCard, COUNT(V.vote) countVotes FROM VotesCard V, Card C WHERE C.idCard = V.idCard AND C.idDeck = ? AND V.vote = FALSE \
													GROUP BY (V.idCard) ORDER BY countVotes ASC LIMIT 1; \
													SELECT V.idCard, COUNT(V.vote) countVotes FROM VotesCard V, Card C WHERE C.idCard = V.idCard AND C.idDeck = ? AND V.vote = FALSE \
													GROUP BY (V.idCard) ORDER BY countVotes DESC LIMIT 1;';

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
	
	function getProm(idAssociate) {
		return new Promise(function (resolve, reject){
			log.info(`idAssociate = ${idAssociate};`);
			const client = dbUtil.getMariaClient();
			const params = [idAssociate, idAssociate, idAssociate];
			client.query(queryValuesForProm, params, function(err, result){
				if (err) {
					dbUtil.closeMariaClient(client);
					reject(err);
				} else {
					dbUtil.closeMariaClient(client);
					const finalResult = [];
					var trueVoteTotal;
					var falseVoteTotal;
					var totalVotes;
					var promPositive;
					var promNegative;
					result[0].filter(function (value, index){
						trueVoteTotal = value.TotalTrue;
					});
					result[1].filter(function (value, index){
						falseVoteTotal = value.TotalTrue;
					});
					result[2].filter(function (value, index){
						totalVotes = value.TotalVotesCard;
					});

					if(trueVoteTotal > 0){
						promPositive = Math.round((trueVoteTotal/totalVotes)*100);
					}else if(promPositive === undefined)
						promPositive = 0;
					if(falseVoteTotal > 0){
						promNegative = Math.round((falseVoteTotal/totalVotes)*100);
					}if(promNegative === undefined)
						promNegative = 0;
						
					var resultToSend = [{
						'postive': promPositive,
						'false': promNegative
					}];
					resolve(resultToSend);
	
				}
			});
		});
	}

	function getBestWorts(idDeck) {
		return new Promise(function (resolve, reject){
			log.info(`idDeck = ${idDeck};`);
			const client = dbUtil.getMariaClient();
			const params = [idDeck, idDeck, idDeck, idDeck];
			client.query(queryBestVsWorst, params, function(err, result){
				if (err) {
					dbUtil.closeMariaClient(client);
					reject(err);
				} else {
					dbUtil.closeMariaClient(client);
					var postiveBest;
					var postiveWorst;
					var falseBest;
					var falseWorst;
					
					var resultToSend = [{
						'postiveBest': [],
						'postiveWorst': [],
						'falseBest': [],
						'falseWorst': []
					}];
					result[0].filter(function (value, index){
						resultToSend[0].postiveBest.push({'idCard': value.idCard, 'countVotes': value.countVotes});
					});
					result[1].filter(function (value, index){
						resultToSend[0].postiveWorst.push({'idCard': value.idCard, 'countVotes': value.countVotes});
					});
					result[2].filter(function (value, index){
						resultToSend[0].falseBest.push({'idCard': value.idCard, 'countVotes': value.countVotes});
					});
					result[3].filter(function (value, index){
						resultToSend[0].falseWorst.push({'idCard': value.idCard, 'countVotes': value.countVotes});
					});					
					resolve(resultToSend);
				}
			});
		});
	}

module.exports = {
    getAllVoteCards,
    getVoteCardsByIdRegistrer,
    getVoteCardsByIdCard,
    addVotesCard,
    updateNewVotesCard,
		deleteVotesCard,
		getProm,
		getBestWorts
};
  