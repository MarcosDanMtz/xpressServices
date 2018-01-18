
'use strict';

const log = require('../../envConfig').logger;
const xpressRepository = require('../../envConfig').xpressRepository;
const cryptoUtil = require('./cryptoUtil');
const mysql = require('mysql');


function getMariaClient() {

  log.info(`Connectig to mariaDB with mysql ${xpressRepository.host}...`);

  const client = mysql.createPool({database: xpressRepository.db,
                                    host: xpressRepository.host,
                                    user: cryptoUtil.decrypt(xpressRepository.user),
                                    password: cryptoUtil.decrypt(xpressRepository.pwd),
                                    multipleStatements: true});

  return client;
}

function closeMariaClient(client) {

  log.info('Clossing mariaDB client...');
  client.end();
}

function callQuery(query,params)
{
    return new Promise(function (resolve, reject) {

        const client = getMariaClient();

        client.query(query, params, function(err, result)
        {
            if (err)
            {
                closeMariaClient(client);
                reject(err);
            } else
            {
                if (result.length === 0)
                {
                    resolve('{}');
                }
                else
                {
                    resolve(result);
                }
            }
        });
    });
}

function callQueryCommit(query,params)
{
    return new Promise(function (resolve, reject)
    {
        const client = getMariaClient();

        client.getConnection(function (err, connection)
        {
            connection.query(query, params, function(err, result)
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    connection.commit(function (errorCom)
                    {
                        if (errorCom)
                        {
                            return connection.rollback(function()
                            {
                                closeMariaClient(client);
                            });
                        }

                    });

                    resolve(result);

                    closeMariaClient(client);
                }
            });
        });
    });
}

module.exports = {
  getMariaClient,
  closeMariaClient,
  callQuery,
  callQueryCommit
};
