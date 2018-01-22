'use strict';

const log     = require('../../envConfig').logger;
const dbUtil = require('../util/dbUtil');
const _       = require('lodash');

const queryAllResults = 'SELECT IdResult, IdDeck, ResultDescription, lastUpdate FROM Results;';
const queryResultsByIdResults = 'SELECT IdResult, IdDeck, ResultDescription, lastUpdate FROM Results WHERE IdDeck = ?;';
const queryResultsBy = 'SELECT IdResult, IdDeck, ResultDescription, lastUpdate FROM Results WHERE IdResult = ?;';
const queryAddResult = "INSERT INTO Results VALUES (DEFAULT, ?, ?, NOW());"; //IdDeck, ResultDescription
const queryUpdateResultID = 'UPDATE Results SET IdDeck=?, ResultDescription=?, lastUpdate=NOW() WHERE IdResult = 2;';//IdDeck, ResultDescription
const queyDeleteResultsbyId = 'DELETE FROM Results WHERE idDeck = 1'; //idDeck


