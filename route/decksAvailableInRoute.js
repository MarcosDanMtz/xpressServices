'use strict';

const log           = require('../envConfig').logger;
const JoiBase       = require('joi');
const JoiExtension  = require('joi-date-extensions');
const Joi           = JoiBase.extend(JoiExtension);
const AvailableInService  = require('../lib/services/decksAvailableIn.service');

function schemaDecksAvailableIn(){
    let queryObj = {};
    queryObj = {
        IdDeck:               Joi.number().required().description('id Deck to be available'),
        IdCountryAvailable:   Joi.number().required().description('country id to be available'),
        IdDepAvailable:       Joi.number().required().description('id depertment to be available'),
        OfficeAvailableIn:    Joi.number().required().required().description('office to be available')
    };
    return queryObj;
}

function schemaUpdateDecksAvailableIn(){
    let queryObj = {};
    //IdDeck, IdCountryAvailable, IdDepAvailable, Active, OfficeAvailableIn, IdRegistrer
    queryObj = {
        IdDeck:               Joi.number().required().description('id Deck to be available'),
        IdCountryAvailable:   Joi.number().required().description('country id to be available'),
        IdDepAvailable:       Joi.number().required().description('id depertment to be available'),
        OfficeAvailableIn:    Joi.number().required().description('office to be available'),
        Active:               Joi.boolean().required().description('virtual delete')
    };
    return queryObj;
}

module.exports = [{
    method: 'GET',
    path: '/xpressAvailableIn/api/DecksAvailableIn',
    config: {
      handler(req, reply) {
  
        log.info('Calling /xpressAvailableIn/api/DecksAvailableIn');
  
        AvailableInService.getAllDecksAvailableIn()
          .then(function(result){
            reply(result).code(200);
          });
  
      },
      description: 'Get All DecksAvailableIn',
      tags: ['api', 'DecksAvailableIn'],
    }
  },
  {
    method: 'GET',
    path: '/xpressAvailableIn/api/getDecksByCountryOfficeDep/{idCountry}&{idOffice}&{idDep}',
    config: {
      handler(req, reply) {
        const idCountry = req.params.idCountry;
        const idOffice = req.params.idOffice;
        const idDep = req.params.idDep;

        log.info('Calling /xpressAvailableIn/api/getDecksByCountryOfficeDep/{idCountry}&{idOffice}&{idDep}');
        //IdCountryAvailable, OfficeAvailableIn, IdDepAvailable
        AvailableInService.getDecksByCOD(idCountry, idOffice, idDep)
          .then(function(result){
            reply(result).code(200);
          });
      },
      validate:{
        params: {
          idCountry: Joi.number().required().description('Id Country to search'),
          idOffice: Joi.number().required().description('Id Office to search'),
          idDep: Joi.number().required().description('Id Dep to search')
        }
      },
      description: 'Get All Decks Available In specific country, office and department',
      tags: ['api', 'DecksAvailableIn'],
    }
  },
  {
    method:'POST',
    path: '/xpressAvailableIn/api/getDecksByCountryOfficeDep',
    config: {
      handler(req, reply){
        // IdDeck, IdCountryAvailable, IdDepAvailable, OfficeAvailableIn

        const IdDeck = req.payload.IdDeck;
        const IdCountryAvailable = req.payload.IdCountryAvailable;
        const IdDepAvailable = req.payload.IdDepAvailable;
        const OfficeAvailableIn = req.payload.OfficeAvailableIn;
  
        log.info('Calling /xpressAvailableIn/api/getDecksByCountryOfficeDep');
  
        AvailableInService.addNewAvailableIn(IdDeck, IdCountryAvailable, IdDepAvailable, OfficeAvailableIn)
          .then(function(){
            reply('sucess').code(200);
          });
  
      },
      validate:{
        payload: schemaDecksAvailableIn()
      },
      description: 'Create one new registrer of DecksAvailableIn',
      tags: ['api', 'DecksAvailableIn'],
    }
  },
  {
    method: 'PATCH',
    path: '/xpressAvailableIn/api/AvailableInByIdRegistrer/{IdRegistrer}',
    config:{
      handler(req, reply){
          //IdDeck, IdCountryAvailable, IdDepAvailable, lastUpdate, Active, OfficeAvailableIn, IdRegistrer
        const IdDeck = req.payload.IdDeck;
        const IdCountryAvailable = req.payload.IdCountryAvailable;
        const IdDepAvailable = req.payload.IdDepAvailable;
        const Active = req.payload.Active;
        const OfficeAvailableIn = req.payload.OfficeAvailableIn;
        const IdRegistrer = req.params.IdRegistrer;

        log.info('Calling /xpressAvailableIn/api/AvailableInByIdRegistrer/{IdRegistrer}');

        AvailableInService.updateAvailableInByIdRegistrer(IdDeck, IdCountryAvailable, IdDepAvailable, Active, OfficeAvailableIn, IdRegistrer)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
            IdRegistrer: Joi.number().required().description('Id registrer tu update')
        },
        payload: schemaUpdateDecksAvailableIn()
      },
      description: 'Update one registrer of DecksAvailableIn',
      tags: ['api', 'DecksAvailableIn'],
    }
},
{
    method: 'DELETE',
    path: '/xpressAvailableIn/api/deleteAbailableInById/{id}',
    config:{
      handler(req, reply){
        const idRegistrer = req.params.id;

        log.info('Calling /xpressAvailableIn/api/deleteAbailableInById/{id}');

        AvailableInService.deleteAvailableInByIdRegistrer(idRegistrer)
          .then(function(){
            reply('succes').code(200);
          });
      },
      validate:{
        params: {
          id: Joi.number().required().description('Id of registrer to delete')
        }
      },
      description: 'Delete one DecksAvailableIn',
      tags: ['api', 'DecksAvailableIn'],
    }
}];
  