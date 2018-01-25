'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const resultsService  = require('../lib/services/resultsDeck.service');

function schemaResultsUpdate(){
    let queryObj = {};
    
    queryObj = {
        IdDeck:             Joi.number().required().description('Id of the deck to display the result'),
        ResultDescription:  Joi.string().required().description('description of the result'),
        Active:             Joi.boolean().required().description('Virtual delete')
    }
    return queryObj;
}

function schemaResults(){
    let queryObj = {};
    
    queryObj = {
        IdDeck:             Joi.number().required().description('Id of the deck to display the result '),
        ResultDescription:  Joi.string().required().description('description of the result')
    }
    return queryObj;
}

module.exports = [{
    method: 'GET',
    path: '/xpressResultsDeck/api/allresults',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressResultsDeck/api/allresults');
  
        resultsService.getAllResultsInfo()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All Results',
      tags: ['api', 'Resuts'],
    }
  },
  {
    method: 'GET',
    path: '/xpressResultsDeck/api/getResultsByIdDeck/{id}',
    config: {
      handler(req, reply) {
        const idDeck = req.params.id;
        log.info('Calling /xpressResultsDeck/api/getResultsByIdDeck/{id}');
  
        resultsService.getResultByIdDeck(idDeck)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id result to update')
        }
      },
      description: 'Get All Results',
      tags: ['api', 'Results'],
    }
  },
  {
    method: 'GET',
    path: '/xpressResultsDeck/api/getResultsById/{id}',
    config: {
      handler(req, reply) {
        const idDeck = req.params.id;
        log.info('Calling /xpressResultsDeck/api/getResultsById/{id}');
  
        resultsService.getResultByIdResult(idDeck)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id result to update')
        }
      },
      description: 'Get All Results',
      tags: ['api', 'Results'],
    }
  },
  {
    method:'POST',
    path: '/xpressResultsDeck/api/createOneResult',
    config: {
      handler(req, reply){
        const description = req.payload.ResultDescription;
        const idDeck = req.payload.IdDeck;
        const Active = req.payload.Active;
        log.info('Calling /xpressResultsDeck/api/createOneResult');
  
        resultsService.addNewResult(idDeck, description, Active)
          .then(function(){
            reply('sucess').code(200);
          });
  
      },
      validate:{
        payload: schemaResults()
      },
      description: 'Create one card by id',
      tags: ['api', 'Results'],
    }
  },
  {
    method: 'PATCH',
    path: '/xpressResultsDeck/api/updateOneResultById/{id}',
    config:{
      handler(req, reply){
        const ResultDescription = req.payload.ResultDescription;
        const active = req.payload.Active;
        const IdDecks = req.payload.IdDeck;
        const idResult = req.params.id;

        log.info('Calling /xpressResultsDeck/api/updateOneResultById/{id}');

        resultsService.updateResultById(IdDecks, ResultDescription, active, idResult)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id result to update')
        },
        payload: schemaResultsUpdate()
      },
      description: 'Update one result by id',
      tags: ['api', 'Results'],
    }
},
{
    method: 'DELETE',
    path: '/xpressResultsDeck/api/deleteOneResultById/{id}',
    config:{
      handler(req, reply){
        const idResult = req.params.id;

        log.info('Calling /xpressResultsDeck/api/deleteOneResultById/{id}');

        resultsService.deleteResult(idResult)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        }
      },
      description: 'Update one result by id',
      tags: ['api', 'Results'],
    }
}
]