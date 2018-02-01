'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const decksAnsService  = require('../lib/services/decksAns.service');

function schemaDecksAns(){
    let queryObj = {};
  
    queryObj = {
        idDeck:        Joi.number().required().description('id Deck answered'),
        idAssociate:   Joi.number().required().description('who answered the deck'),
    };
    return queryObj;
}

module.exports = [{
    method: 'GET',
    path: '/xpressDecksAnswered/api/allDecksAns',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressDecksAnswered/api/allDecksAns');
  
        decksAnsService.getAllDecksAns()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All DeckAnswered',
      tags: ['api', 'DeckAnswered'],
    }
  },
  {
    method:'POST',
    path: '/xpressDecksAnswered/api/registrerDeckAnswered',
    config: {
      handler(req, reply){
        const idDeck = req.payload.idDeck;
        const idAssociate = req.payload.idAssociate;
  
        log.info('Calling /xpressDecksAnswered/api/registrerDeckAnswered');
  
        decksAnsService.addNewDeckAns(idDeck, idAssociate)
          .then(function(){
            reply('sucess').code(200);
          });
  
      },
      validate:{
        payload: schemaDecksAns()
      },
      description: 'Create new registrer of deck answered',
      tags: ['api', 'DeckAnswered'],
    }
  }]