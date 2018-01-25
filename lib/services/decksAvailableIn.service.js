'use strict';

const log = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _ = require('lodash');

const queryAllDeckssAvailable = 'SELECT  IdRegistrer, IdDeck, IdCountryAvailable, IdDepAvailable, DateCreate, lastUpdate, Active, OfficeAvailableIn FROM DecksAvailableIn;';
const queryDecksByCOD = 'SELECT  IdRegistrer, IdDeck, IdCountryAvailable, IdDepAvailable, DateCreate, lastUpdate, Active, OfficeAvailableIn FROM DecksAvailableIn \
                     WHERE IdCountryAvailable = ? AND OfficeAvailableIn = ? AND IdDepAvailable = ?;';//IdCountryAvailable, OfficeAvailableIn, IdDepAvailable
const queryAddAvailableIn= "INSERT INTO DecksAvailableIn VALUES (DEFAULT, ?, ?, ?, NOW(), NULL, TRUE, ?);";//IdDeck, IdCountryAvailable, IdDepAvailable, OfficeAvailableIn
const queryUpdateAvailableIn = "UPDATE  DecksAvailableIn SET IdDeck = ?, IdCountryAvailable = ?, IdDepAvailable = ?, lastUpdate = NOW(), Active = ?, OfficeAvailableIn = ? \
                          WHERE IdRegistrer = ?;";//IdDeck, IdCountryAvailable, IdDepAvailable, lastUpdate, Active, OfficeAvailableIn, IdRegistrer
const queryDeleteAvailableInById = "DELETE FROM DecksAvailableIn WHERE IdRegistrer = ?";

function getAllDecksAvailableIn() {
	return new Promise(function (resolve, reject) {
		const client = dbUtil.getMariaClient();

		client.query(queryAllDeckssAvailable,function(err, result){
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

function getDecksByCOD(idCountry, idOffice, idDep) {
	return new Promise(function (resolve, reject) {
		log.info(`idCountry = ${idCountry}; idOffice = ${idOffice}; idDep = ${idDep}`);
		const client = dbUtil.getMariaClient();
		const params = [idCountry, idOffice, idDep];
		client.query(queryDecksByCOD, params, function(err, result){
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

function addNewAvailableIn(IdDeck, IdCountryAvailable, IdDepAvailable, OfficeAvailableIn){
	return new Promise(function (resolve, reject){

    log.info(`IdDeck = ${IdDeck}; IdCountryAvailable = ${IdCountryAvailable}; IdDepAvailable = ${IdDepAvailable}; OfficeAvailableIn = ${OfficeAvailableIn};`);

    const client = dbUtil.getMariaClient();
    const params = [IdDeck, IdCountryAvailable, IdDepAvailable, OfficeAvailableIn];
		client.getConnection(function (err, connection) {
			connection.query(queryAddAvailableIn, params, function(err, result){
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
					log.info(queryAddAvailableIn);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}

function updateAvailableInByIdRegistrer(IdDeck, IdCountryAvailable, IdDepAvailable, Active, OfficeAvailableIn, IdRegistrer){
	return new Promise(function (resolve, reject){
	  log.info(`IdDeck = ${IdDeck}; IdCountryAvailable = ${IdCountryAvailable}; IdDepAvailable = ${IdDepAvailable}; Active = ${Active}; OfficeAvailableIn = ${OfficeAvailableIn}; IdRegistrer = ${IdRegistrer}`);
		
	  const client = dbUtil.getMariaClient();
	  const params = [IdDeck, IdCountryAvailable, IdDepAvailable, Active, OfficeAvailableIn, IdRegistrer];
	  client.getConnection(function (err, connection) {
		connection.query(queryUpdateAvailableIn, params, function(err, result){
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
					  log.info(queryUpdateAvailableIn);
					  log.info(params);
					  dbUtil.closeMariaClient(client);
		  }
		});
	  });
	});
  }

  function deleteAvailableInByIdRegistrer(IdRegistrer){
	return new Promise(function (resolve, reject){
	  log.info(`IdRegistrer = ${IdRegistrer};`);
  
	  const client = dbUtil.getMariaClient();
	  const params = [IdRegistrer];
	  client.getConnection(function (err, connection) {
		connection.query(queryDeleteAvailableInById, params, function(err, result){
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
					  log.info(queryDeleteAvailableInById);
					  log.info(params);
					  dbUtil.closeMariaClient(client);
		  }
		});
	  });
	});
  }

module.exports = {
	getAllDecksAvailableIn,
	getDecksByCOD,
	addNewAvailableIn,
	updateAvailableInByIdRegistrer,
	deleteAvailableInByIdRegistrer
};