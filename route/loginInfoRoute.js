'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const userInfoSerivice  = require('../lib/services/loginInfo.service');

function schemaInfoUser(){
    let queryObj = {};
    queryObj = {
        userId:         Joi.number().required().description('id of user')
    };
    return queryObj;
};

function schemaInfoUserUpdate(){
    let queryObj = {};
    queryObj = {
        userId:         Joi.number().required().description('id of user'),
        Points:         Joi.number().required().description('User Points'),
        active:         Joi.boolean().required().description('virtual delete'),
        Logedin:        Joi.boolean().required().description('is the user logedin')
    };
    return queryObj;
}


module.exports = [{
    method: 'GET',
    path: '/xpressInfoUser/api/allInfoUsers',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressInfoUser/api/allInfoUsers');
  
        userInfoSerivice.getAllInfoUsers()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All InfoUser',
      tags: ['api', 'InfoUser'],
    }
  },
  {
    method: 'GET',
    path: '/xpressInfoUser/api/getInfoUserById/{id}',
    config: {
      handler(req, reply) {
        const idUser = req.params.id;
        log.info('Calling /xpressInfoUser/api/getInfoUserById/{id}');
  
        userInfoSerivice.getInfoUserById(idUser)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        }
      },
      description: 'Get All InfoUser',
      tags: ['api', 'InfoUser'],
    }
  },
  {
    method:'POST',
    path: '/xpressInfoUser/api/createNewUserInfo',
    config: {
      handler(req, reply){
        const userId = req.payload.userId;

        //userId, Countryid, DepId
        log.info('Calling /xpressInfoUser/api/createNewUserInfo');
  
        userInfoSerivice.addNewUser(userId)
          .then(function(){
            reply('sucess').code(200);
          });
  
      },
      validate:{
        payload: schemaInfoUser()
      },
      description: 'Create one InfoUser ',
      tags: ['api', 'InfoUser'],
    }
  },
  {
    method: 'PATCH',
    path: '/xpressInfoUser/api/updateInfoUserBy/{id}',
    config:{
      handler(req, reply){
        
        const userId = req.payload.userId;
        const active = req.payload.active
        const Logedin = req.payload.Logedin;
        const Points = req.payload.Points;
        const idUserToUpdate = req.params.id;

        log.info('Calling /xpressInfoUser/api/updateInfoUserBy/{id}');

        userInfoSerivice.updateNewCardBy(userId, active, Logedin, Points, idUserToUpdate)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        },
        payload: schemaInfoUserUpdate()
      },
      description: 'Update one card by id',
      tags: ['api', 'InfoUser'],
    }
  },
  {
    method: 'DELETE',
    path: '/xpressInfoUser/api/deleteinfoUserById/{id}',
    config:{
      handler(req, reply){
        const idUser = req.params.id;

        log.info('Calling /xpressInfoUser/api/deleteinfoUserById/{id}');

        userInfoSerivice.deleteInfoUser(idUser)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id of user to delete for ever')
        }
      },
      description: 'Update one card by id',
      tags: ['api', 'Cards'],
    }
  },
]
