'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllThingsPeople = 'SELECT IdThingPeople, NameObject, DescriptioObject, isAssociate, CreationDate, LastUpdate FROM PeopleThingsToEvaluate;';
const queryGetThingsPeopleByIdRegistrer = 'SELECT IdThingPeople, NameObject, DescriptioObject, isAssociate, CreationDate, LastUpdate FROM PeopleThingsToEvaluate WHERE IdThingPeople = ?;';
const queryAddNewThingsPeople = "INSERT INTO PeopleThingsToEvaluate VALUES (DEFAULT, ?, ?, ?, NOW(), NULL);"; //NameObject, DescriptioObject, isAssociate
const queryUpdateThingsPeople = "UPDATE PeopleThingsToEvaluate SET NameObject = ?, DescriptioObject = ?, isAssociate = ?, LastUpdate = NOW() WHERE IdThingPeople = ?;";//NameObject, DescriptioObject, isAssociate, IdThingPeople
const queryDeleteThingsPeopleById = "DELETE FROM PeopleThingsToEvaluate WHERE IdThingPeople = ?;";

function getAllPT() {
	return new Promise(function (resolve, reject) {
		const client = dbUtil.getMariaClient();

		client.query(queryAllThingsPeople,function(err, result){
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

function getPTByIdRegistrer(IdRegistrer) {
	return new Promise(function (resolve, reject) {
		log.info(`IdRegistrer = ${IdRegistrer};`);
		const client = dbUtil.getMariaClient();
		const params = [IdRegistrer];
		client.query(queryGetThingsPeopleByIdRegistrer, params, function(err, result){
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

function addPT(NameObject, DescriptioObject, isAssociate){
	return new Promise(function (resolve, reject){

    log.info(`NameObject = ${NameObject}; DescriptioObject = ${DescriptioObject}; isAssociate = ${isAssociate}`);

    const client = dbUtil.getMariaClient();
    const params = [NameObject, DescriptioObject, isAssociate];
		client.getConnection(function (err, connection) {
			connection.query(queryAddNewThingsPeople, params, function(err, result){
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
					log.info(queryAddNewThingsPeople);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}

function updatePT(NameObject, DescriptioObject, isAssociate, IdThingPeople){
    return new Promise(function (resolve, reject){
      log.info(`NameObject = ${NameObject}; DescriptioObject = ${DescriptioObject}; isAssociate = ${isAssociate}; IdThingPeople = ${IdThingPeople};`);
  
      const client = dbUtil.getMariaClient();
      const params = [NameObject, DescriptioObject, isAssociate, IdThingPeople];
      client.getConnection(function (err, connection) {
        connection.query(queryUpdateThingsPeople, params, function(err, result){
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
                      log.info(queryUpdateThingsPeople);
                      log.info(params);
                      dbUtil.closeMariaClient(client);
          }
        });
      });
    });
  }


  function deletePT(IdPT){
    return new Promise(function (resolve, reject){
      log.info(`IdPT = ${IdPT};`);
  
      const client = dbUtil.getMariaClient();
      const params = [IdPT];
      client.getConnection(function (err, connection) {
        connection.query(queryDeleteThingsPeopleById, params, function(err, result){
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
                      log.info(queryDeleteThingsPeopleById);
                      log.info(params);
                      dbUtil.closeMariaClient(client);
          }
        });
      });
    });
  }

module.exports = {
    getAllPT,
    getPTByIdRegistrer,
    addPT,
    updatePT,
    deletePT
};
  
