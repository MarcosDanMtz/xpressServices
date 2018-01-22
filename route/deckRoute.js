'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const deckService  = require('../lib/services/deck.service');

function schemaDeck(){
  let queryObj = {};

  queryObj = {
    title:        Joi.string().required().description('deck title will be display on app'),
    description:  Joi.string().required().description('Description deck'),
    idUser:       Joi.number().required().description('Id user that created the deck'),
    UrlImgVideo:  Joi.string().required().description('url image deck')
  };
  return queryObj;
}


function schemaUpdateDeck(){
  let queryObj = {};

  queryObj = {
    title:        Joi.string().required().description('deck title will be display on app'),
    description:  Joi.string().required().description('Description deck'),
    results:      Joi.string().required().description('Primary results of deck'),
    active:       Joi.boolean().required().description('Virtual delete'),
    UrlImgVideo:  Joi.string().required().description('url image deck')

  };
  return queryObj;
}


module.exports = [{
  method: 'GET',
  path: '/xpressDeck/api/allDecks',
  config: {
    handler(req, reply) {

      log.info('Calling /xpressDeck/api/allDecks');

      deckService.getAllDecksInfo()
        .then(function(result){
          reply(result).code(200);
        });

    },
    description: 'Get All Decks',
    tags: ['api', 'Deck'],
  }
},
{
  method: 'GET',
  path: '/xpressDeck/api/getDeckById/{id}',
  config: {
    handler(req, reply) {
      const idDeck = req.params.id;
      log.info('Calling /xpressDeck/api/getDeckById/{id}');

      deckService.getDeckById(idDeck)
        .then(function(result){
          reply(result).code(200);
        });
    },
    validate:{
      params: {
        id: Joi.number().required().description('Id Deck to show')
      }
    },
    description: 'Get one specific deck by Id',
    tags: ['api', 'Deck'],
  }
},
{
  method:'POST',
  path: '/xpressDeck/api/createOneNewDeck',
  config: {
    handler(req, reply){
      const title = req.payload.title;
      const description = req.payload.description;
      const idUser = req.payload.idUser;
      const UrlImgVideo = req.payload.UrlImgVideo;

      log.info('Calling /xpressDeck/api/createOneNewDeck');

      deckService.addNewDeck(title, description, idUser, UrlImgVideo)
        .then(function(){
          reply('sucess').code(200);
        });

    },
    validate:{
      payload: schemaDeck()
    },
    description: 'Create one card by id',
    tags: ['api', 'Cards'],
  }
},
{
    method: 'PATCH',
    path: '/xpressDeck/api/updateOneDeckBy/{id}',
    config:{
      handler(req, reply){
        const title = req.payload.title;
        const description = req.payload.description;
        const results = req.payload.results;
        const active = req.payload.active;
        const UrlImgVideo = req.payload.UrlImgVideo;
        const idDeck = req.params.id;

        log.info('Calling /xpressDeck/api/updateOneDeckBy/{id}');

        deckService.updateDeckBy(title, description, results, active, UrlImgVideo, idDeck)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        },
        payload: schemaUpdateDeck()
      },
      description: 'Update one card by id',
      tags: ['api', 'Deck'],
    }
},
{
    method: 'DELETE',
    path: '/xpressDeck/api/deleteOneDeck/{id}',
    config:{
      handler(req, reply){
        const idDeck = req.params.id;

        log.info('Calling /xpressDeck/api/deleteOneDeck/{id}');

        deckService.deleteDeck(idDeck)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Deck to delete')
        }
      },
      description: 'delete one deck by id',
      tags: ['api', 'Deck'],
    }
}
];
