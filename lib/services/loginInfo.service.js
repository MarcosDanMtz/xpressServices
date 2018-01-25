'use strict'

const log       = require('../../envConfig').logger;
const dbUtil    = require('../util/dbUtil');
const _         = require('lodash');

const queryAllInfoUser = 'SELECT idLoginInfo, userId, active, DateCreate, lastUpdate, Logedin, Points FROM LoginInfo;';
const queryInfoUserByIdUser = 'SELECT idLoginInfo, userId, active, DateCreate, lastUpdate, Logedin, Points FROM LoginInfo WHERE userId = ?';
const queryAddUserInfo = 'INSERT INTO LoginInfo VALUES (DEFAULT, ?, TRUE, NOW(), NULL, TRUE, 0)';
const queryUpdateUserInfo = "UPDATE LoginInfo SET userId = ?, active = ?, lastUpdate=NOW(), Logedin = ?, Points = ? WHERE userId = ?;";
const queryDeleteUserInfo = 'DELETE FROM LoginInfo WHERE userId = ?;';//userId, Countryid, DepId, active, Logedin

function getAllInfoUsers() {
	return new Promise(function (resolve, reject) {
		const client = dbUtil.getMariaClient();

		client.query(queryAllInfoUser,function(err, result){
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

function getInfoUserById(idUser) {
	return new Promise(function (resolve, reject) {
		log.info(`idUser = ${idUser};`);
		const client = dbUtil.getMariaClient();
		const params = [idUser];
		client.query(queryInfoUserByIdUser, params, function(err, result){
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

function addNewUser(userId){
	return new Promise(function (resolve, reject){

    log.info(`userId = ${userId};`);

    const client = dbUtil.getMariaClient();
    const params = [userId];
		client.getConnection(function (err, connection) {
			connection.query(queryAddUserInfo, params, function(err, result){
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
					log.info(queryAddUserInfo);
					log.info(params);
					dbUtil.closeMariaClient(client);
			  }
	    });
		});
	});
}


function updateNewCardBy(userId, active, Logedin, Points, idUserToUpdate){
  return new Promise(function (resolve, reject){
    log.info(`userId = ${userId}; active = ${active}; Logedin = ${Logedin}; Points = ${Points}; idUserToUpdate = ${idUserToUpdate}`);

    const client = dbUtil.getMariaClient();
    const params = [userId, active, Logedin, Points, idUserToUpdate];
    client.getConnection(function (err, connection) {
      connection.query(queryUpdateUserInfo, params, function(err, result){
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
					log.info(queryUpdateUserInfo);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}

function deleteInfoUser(idUserInfo){
  return new Promise(function (resolve, reject){
    log.info(`idUserInfo = ${idUserInfo};`);

    const client = dbUtil.getMariaClient();
    const params = [idUserInfo];
    client.getConnection(function (err, connection) {
      connection.query(queryDeleteUserInfo, params, function(err, result){
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
					log.info(queryDeleteUserInfo);
					log.info(params);
					dbUtil.closeMariaClient(client);
        }
      });
    });
  });
}


module.exports = {
    getAllInfoUsers,
    getInfoUserById,
    addNewUser,
    updateNewCardBy,
    deleteInfoUser
};
