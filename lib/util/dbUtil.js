'use strict';

const log = require('../../envConfig').logger;
const crypto = require('crypto');

const algorithm = 'aes-128-ecb';
const key = new Buffer('65663130663834383262356234313066', 'hex'); //ef10f8482b5b410f
const iv = new Buffer('');

function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  cipher.setAutoPadding(true);
  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');
  return crypted;
}

module.exports = {
  decrypt,
  encrypt
};
