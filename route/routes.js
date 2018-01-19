'use strict';

const mainRoute   = require('./mainRoute');
const cardsRoute  = require('./cardsRoute');
const decksRoute  = require('./deckRoute');

module.exports = [].concat(
  mainRoute,
  cardsRoute,
  decksRoute
);
