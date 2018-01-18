'use strict';

const mainRoute = require('./mainRoute');
const cardsRoute = require('./cardsRoute');

module.exports = [].concat(
  mainRoute,
  cardsRoute
);
