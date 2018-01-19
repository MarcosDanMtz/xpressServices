'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const deckService  = require('../lib/services/deck.service');

function schemaDeck(){
  let queryObj = {};

  queryObj = {
    title:        Joi.string().required().description('Card title will be display on app'),
    description:  Joi.string().required().description('Description Card'),
    idUser:       Joi.number().required().description('Id user that created the card')
  };
  return queryObj;
}


function schemaUpdateDeck(){
  let queryObj = {};

  queryObj = {
    title:        Joi.string().required().description('Card title will be display on app'),
    description:  Joi.string().required().description('Description Card'),
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

      log.info('Calling /xpressDeck/api/createOneNewDeck');

      deckService.addNewDeck(title, description, idUser)
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
// {
//     method: 'PATCH',
//     path: '/xpressCards/api/updateOneCardBy/{id}',
//     config:{
//       handler(req, reply){
//         const title = req.payload.titleCard;
//         const description = req.payload.descriptonCard;
//         const idCard = req.params.id;
//         const active = req.payload.active
//         const idDeck = req.payload.idDeck;
//
//         log.info('Calling /xpressCards/api/updateOneCardBy/{id}');
//
//         cardsService.updateNewCardBy(title, description, active, idDeck, idCard)
//           .then(function(){
//             reply('succes').code(200);
//           });
//       },
//       validate:{
//         params: {
//           id: Joi.number().required().description('Id Card to update')
//         },
//         payload: schemaUpdateDeck()
//       },
//       description: 'Update one card by id',
//       tags: ['api', 'Cards'],
//     }
// },
// {
//     method: 'DELETE',
//     path: '/xpressCards/api/deleteOneCard/{id}',
//     config:{
//       handler(req, reply){
//         const idCard = req.params.id;
//
//         log.info('Calling /xpressCards/api/deleteOneCard/{id}');
//
//         cardsService.deleteCard(idCard)
//           .then(function(){
//             reply('succes').code(200);
//           });
//       },
//       validate:{
//         params: {
//           id: Joi.number().required().description('Id Card to update')
//         }
//       },
//       description: 'Update one card by id',
//       tags: ['api', 'Cards'],
//     }
// },
];
