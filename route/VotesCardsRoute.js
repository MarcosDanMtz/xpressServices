'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const VotesCardsService  = require('../lib/services/votesCards.service');

function schemaVotesCards(){
    let queryObj = {};
    queryObj = {
        idCard:         Joi.number().description('id Cards to update'),
        idAssociate:    Joi.number().description('id Associate to update'),
        idToEvaluate:   Joi.number().description('id of the thing or people to evaluate'),
        vote:           Joi.boolean().description('like or not')
    };
    return queryObj;
}

function schemaVotesCardsUpdate(){
    let queryObj = {};
    queryObj = {
      idCard:         Joi.number().required().description('id card to update'),
      idAssociate:      Joi.number().required().description('id associate tu update'),
      vote:         Joi.boolean().required().description('vote or change vote'),
      Active:        Joi.boolean().required().description('virtual delete'),
      idToEvaluate:   Joi.number().description('id of the thing or people to evaluate')
    };
    return queryObj;
}


module.exports = [{
    method: 'GET',
    path: '/xpressVotesCards/api/allVotesCards',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressVotesCards/api/allVotesCards');
  
        VotesCardsService.getAllVoteCards()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All Cards',
      tags: ['api', 'Cards'],
    }
  },
  {
    method: 'GET',
    path: '/xpressVotesCards/api/getVoteCardsByIdRegistrer/{id}',
    config: {
      handler(req, reply) {
        const IdRegistrer = req.params.id;
        log.info('Calling /xpressVotesCards/api/getVoteCardsByIdRegistrer/{id}');
  
        VotesCardsService.getVoteCardsByIdRegistrer(IdRegistrer)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Registrer to display it resuts')
        }
      },
      description: 'Get All Cards',
      tags: ['api', 'Cards'],
    }
  },
  {
    method: 'GET',
    path: '/xpressVotesCards/api/getVoteCardsByIdCard/{id}',
    config: {
      handler(req, reply) {
        const idCard = req.params.id;
        log.info('Calling /xpressVotesCards/api/getVoteCardsByIdCard/{id}');
  
        VotesCardsService.getVoteCardsByIdCard(idCard)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        }
      },
      description: 'Get All Cards',
      tags: ['api', 'Cards'],
    }
  },
  {
    method:'POST',
    path: '/xpressVotesCards/api/createVoteCards',

    config: {
      handler(req, reply){
        const idCard = req.payload.idCard;
        const idAssociate = req.payload.idAssociate;
        const idToEvaluate = req.payload.idToEvaluate;
        const vote = req.payload.vote;
  
        log.info('Calling /xpressVotesCards/api/createVoteCards');
  
        VotesCardsService.addVotesCard(idCard, idAssociate, vote, idToEvaluate)
          .then(function(){
            reply('sucess').code(200);
          });
  
      },
      validate:{
        payload: schemaVotesCards()
      },
      description: 'Create one card by id',
      tags: ['api', 'Cards'],
    }
  },
  {
    method: 'PATCH',
    path: '/xpressVotesCards/api/updateVotesCardBy/{id}',
    config:{
      handler(req, reply){
        const idCard = req.payload.idCard;
        const idAssociate = req.payload.idAssociate;
        const vote = req.payload.vote;
        const active = req.payload.Active;
        const IdRegistrer = req.params.id;
        const idToEvaluate = req.payload.idToEvaluate;

        log.info('Calling /xpressVotesCards/api/updateVotesCardBy/{id}');

        VotesCardsService.updateNewVotesCard(idCard, idAssociate, vote, active, idToEvaluate, IdRegistrer)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        },
        payload: schemaVotesCardsUpdate()
      },
      description: 'Update one card by id',
      tags: ['api', 'Cards'],
    }
},
{
    method: 'DELETE',
    path: '/xpressVotesCards/api/deleteVotesCardBy/{id}',
    config:{
      handler(req, reply){
        const IdRegistrer = req.params.id;

        log.info('Calling /xpressVotesCards/api/deleteVotesCardBy/{id}');

        VotesCardsService.deleteVotesCard(IdRegistrer)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Registrer to delete')
        }
      },
      description: 'Update one card by id',
      tags: ['api', 'Cards'],
    }
},
{
  method:'GET',
  path: '/xpressVotesCards/api/promByIdAssociate/{id}',
  config: {
    handler(req, reply) {
      const idAssociate = req.params.id;
      log.info('Calling /xpressVotesCards/api/promByIdAssociate/{id}');

      VotesCardsService.getProm(idAssociate)
        .then(function(result){
          reply(result).code(200);
        });

    },
    validate:{
      params: {
        id: Joi.number().required().description('Id Card')
      }
    },
    description: 'Get all projects',
    tags: ['api', 'Projects'],
  }
},
{
  method:'GET',
  path: '/xpressVotesCards/api/bestWorstCaculate/{idDeck}',
  config: {
    handler(req, reply) {
      const idDeck = req.params.idDeck;
      log.info('Calling /xpressVotesCards/api/bestWorstCaculate/{idDeck}');

      VotesCardsService.getBestWorts(idDeck)
        .then(function(result){
          reply(result).code(200);
        });

    },
    validate:{
      params: {
        idDeck: Joi.number().required().description('Id deck to search')
      }
    },
    description: 'Get all projects',
    tags: ['api', 'Projects'],
  }
}
]