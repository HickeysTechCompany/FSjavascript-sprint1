//cole needs these for the CRC encoding :D
//remember npm install!!
const crypto = require("crypto");
const crc32 = require("crc-32");
global.DEBUG = true;
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { EventEmitter } = require("events");

const myEmitter = new EventEmitter();

//cole will take in the these token related functions dont worry about it
// Function that counts tokens
function encodeCRC(input) {
  const inputData = Buffer.from(input, "utf8");
  const token = crc32.buf(inputData).toString(16);
  return token;
}

function countTokens() {
  // Enter code here...
}

// Function that generates a token for a given username
function generateToken(username) {
  // Enter code here...
}

// Function that updates token entry (phone or email) for a given username
function updateToken(tokenType, username, value) {
  // Enter code here...
}

// Function that searches for token based on username, email, or phone
function searchToken(searchType, value) {
  // Enter Code here...
}

module.exports = {
  countTokens,
  generateToken,
  updateToken,
  searchToken,
  encodeCRC,
};
