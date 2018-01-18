'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const cardsService  = require('../lib/services/cards.service');

function schemaCard(){
  let queryObj = {};

  queryObj = {
    titleCard:        Joi.string().required().description('Card title will be display on app'),
    descriptonCard:   Joi.string().required().description('Description Card'),
    idUser:           Joi.number().description('Id user that created the card'),
    active:           Joi.boolean().required().description('need to be active first time')
  };
  return queryObj;
}

function schemaUpdateCard(){
  let queryObj = {};

  queryObj = {
    titleCard:        Joi.string().required().description('Card title will be display on app'),
    descriptonCard:   Joi.string().required().description('Description Card'),
    active:           Joi.boolean().required().description('virtual delete')
  };
  return queryObj;
}

module.exports = [{
  method: 'GET',
  path: '/xpressCards/api/allCards',
  config: {
    handler(req, reply) {

      log.info('Calling /xpress/api/allCards');

      cardsService.getAllCardsInfo()
        .then(function(result){
          reply(result).code(200);
        });

    },
    description: 'Get All Cards',
    tags: ['api', 'Cards'],
  }
},
{
  method:'POST',
  path: '/xpressCards/api/updateOneCard',
  config: {
    handler(req, reply){
      const title = req.payload.titleCard;
      const description = req.payload.descriptonCard;
      const idUser = req.payload.idUser;
      const active = req.payload.active


      log.info('Calling /xpressCards/api/updateOneCard');

      cardsService.addNewCard(title, description, idUser, active)
        .then(function(){
          reply('sucess').code(200);
        });

    },
    validate:{
      payload: schemaCard()
    },
    description: 'Create one card by id',
    tags: ['api', 'Cards'],
  }
},
{
    method: 'PATCH',
    path: '/xpressCards/api/updateOneCard/{id}',
    config:{
      handler(req, reply){
        const title = req.payload.titleCard;
        const description = req.payload.descriptonCard;
        const idCard = req.params.id;
        const active = req.payload.active

        log.info('Calling /xpressCards/api/updateOneCard/{id}');

        cardsService.updateNewCard(title, description, active, idCard)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        },
        payload: schemaUpdateCard()
      },
      description: 'Update one card by id',
      tags: ['api', 'Cards'],
    }
},
{
    method: 'DELETE',
    path: '/xpressCards/api/deleteOneCard/{id}',
    config:{
      handler(req, reply){
        const idCard = req.params.id;

        log.info('Calling /xpressCards/api/deleteOneCard/{id}');

        cardsService.deleteCard(idCard)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id Card to update')
        }
      },
      description: 'Update one card by id',
      tags: ['api', 'Cards'],
    }
}
];