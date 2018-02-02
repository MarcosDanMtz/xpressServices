'use strict';

const mainRoute             = require('./mainRoute');
const cardsRoute            = require('./cardsRoute');
const decksRoute            = require('./deckRoute');
const resultsRoute          = require('./resultsDeckRoute')
const infoUserRoute         = require('./loginInfoRoute');
const DecksAvailableInRoute = require('./decksAvailableInRoute');
const votesCarsRoute        = require('./VotesCardsRoute');
const peopleThingsEvalute   = require('./evaluatePTRoute');
const PTTBEByDeck           = require('./DeckWillEvaluatePTTRoute');
const deckAnswered          = require('./decksAnsRoute');

module.exports = [].concat(
  mainRoute,
  cardsRoute,
  decksRoute,
  resultsRoute,
  infoUserRoute,
  DecksAvailableInRoute,
  votesCarsRoute,
  peopleThingsEvalute,
  PTTBEByDeck,
  deckAnswered
);
