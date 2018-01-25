'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const PTService  = require('../lib/services/evaluatePT.service');

function schemaPeopleThings(){
    let queryObj = {};
    queryObj = {
        NameObject:         Joi.string().description('Name of user o thing'),
        DescriptioObject:   Joi.string().description('description of people or thing'),
        isAssociate:        Joi.boolean().description('is an associate')
    };
    return queryObj;
}

function schemaPeopleThingsUpdate(){
    let queryObj = {};
    queryObj = {
        NameObject:         Joi.string().description('Name of user o thing'),
        DescriptioObject:   Joi.string().description('description of people or thing'),
        isAssociate:        Joi.boolean().description('is an associate')
    };
    return queryObj;
}

module.exports = [{
    method: 'GET',
    path: '/xpressPeopleThings/api/allPT',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressPeopleThings/api/allPT');
  
        PTService.getAllPT()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All People things to be evaluate',
      tags: ['api', 'PT'],
    }
  },
  {
    method: 'GET',
    path: '/xpressPeopleThings/api/getPTByIdRegistrer/{id}',
    config: {
      handler(req, reply) {
        const IdRegistrer = req.params.id;
        log.info('Calling /xpressPeopleThings/api/getPTByIdRegistrer/{id}');
  
        PTService.getPTByIdRegistrer(IdRegistrer)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Registrer to display it resuts')
        }
      },
      description: 'Get specific People things to be evaluate',
      tags: ['api', 'PT']
    }
  },
  {
    method:'POST',
    path: '/xpressPeopleThings/api/createPT',

    config: {
      handler(req, reply){
        const NameObject = req.payload.NameObject;
        const DescriptioObject = req.payload.DescriptioObject;
        const isAssociate = req.payload.isAssociate;
  
        log.info('Calling /xpressPeopleThings/api/createPT');
  
        PTService.addPT(NameObject, DescriptioObject, isAssociate)
          .then(function(){
            reply('sucess').code(200);
          });
  
      },
      validate:{
        payload: schemaPeopleThings()
      },
      description: 'Create one people or thing',
      tags: ['api', 'PT']
    }
  },
  {
    method: 'PATCH',
    path: '/xpressPeopleThings/api/updatePTBy/{id}',
    config:{
        //NameObject, DescriptioObject, isAssociate, IdThingPeople
      handler(req, reply){
        const NameObject = req.payload.NameObject;
        const DescriptioObject = req.payload.DescriptioObject;
        const isAssociate = req.payload.isAssociate;
        const IdThingPeople = req.params.id;
        

        log.info('Calling /xpressPeopleThings/api/updatePTBy/{id}');

        PTService.updatePT(NameObject, DescriptioObject, isAssociate, IdThingPeople)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id of people or thing to update')
        },
        payload: schemaPeopleThingsUpdate()
      },
      description: 'Update one people or thing',
      tags: ['api', 'PT']
    }
},
{
    method: 'DELETE',
    path: '/xpressPeopleThings/api/deletePTBy/{id}',
    config:{
      handler(req, reply){
        const IdRegistrer = req.params.id;

        log.info('Calling /xpressPeopleThings/api/deletePTBy/{id}');

        PTService.deletePT(IdRegistrer)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id People or thing to delete')
        }
      },
      description: 'Delete one people or thing',
      tags: ['api', 'PT']
    }
}]