'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const PTTBEByDeck  = require('../lib/services/DeckWillEvaluatePT.service');

module.exports = [{
    method: 'GET',
    path: '/xpressPTTBEByDeck/api/AllPTTBE',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressPTTBEByDeck/api/AllPTTBE');
  
        PTTBEByDeck.getAllTTBE()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All PTTBE',
      tags: ['api', 'PTTBEByDeck'],
    }
  },
  {
    method: 'GET',
    path: '/xpressPTTBEByDeck/api/AllPTTBEByIdDeck/{idDeck}',
    config: {
      handler(req, reply) {
        const idDeck = req.params.idDeck;
    
        log.info('Calling /xpressPTTBEByDeck/api/AllPTTBEByIdDeck/{idDeck}');
        //IdCountryAvailable, OfficeAvailableIn, IdDepAvailable
        PTTBEByDeck.getDTTBEByIdDeck(idDeck)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
            idDeck: Joi.number().required().description('Id Country to search')
        }
      },
      description: 'Get All PTTBE By id Deck',
      tags: ['api', 'PTTBEByDeck'],
    }
  }
];