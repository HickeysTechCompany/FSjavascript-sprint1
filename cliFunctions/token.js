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
//function that counts tokens

function countTokens() {
  fs.readFile("./json/users.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error(err);
      return;
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return;
      }
    }

    const tokenCount = users.length;

    console.log(`Total tokens in the system: ${tokenCount}`);
  });
}
// Function that generates a token for a given username
function generateToken(username) {
  fs.readFile("./json/users.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error(err);
      return;
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return;
      }
    }

    const foundUser = users.find((user) => user.username === username);

    if (foundUser) {
      const inputData = Buffer.from(
        foundUser.username +
          foundUser.password +
          foundUser.cell +
          foundUser.email,
        "utf8"
      );
      const token = encodeCRC(inputData);
      console.log(`Token generated for ${username}: ${token}`);
    } else {
      console.log(`User not found: ${username}`);
    }
  });
}
// Function that updates token entry (phone or email) for a given username
function updateToken(tokenType, username, value) {
  fs.readFile("./json/users.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error(err);
      return;
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return;
      }
    }

    const foundUser = users.find((user) => user.username === username);

    if (foundUser) {
      if (tokenType === "phone") {
        foundUser.cell = value;
      } else if (tokenType === "email") {
        foundUser.email = value;
      }

      fs.writeFile(
        "./json/users.json",
        JSON.stringify(users),
        "utf8",
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Token entry updated for ${username}`);
        }
      );
    } else {
      console.log(`User not found: ${username}`);
    }
  });
}
// Function that searches for token based on username, email, or phone
function searchToken(searchType, value) {
  fs.readFile("./json/users.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error(err);
      return;
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return;
      }
    }

    const foundUser = users.find((user) => user[searchType] === value);

    if (foundUser) {
      console.log(`Token found for ${searchType}: ${foundUser.token}`);
    } else {
      console.log(`No token found for ${searchType}: ${value}`);
    }
  });
}

module.exports = {
  countTokens,
  generateToken,
  updateToken,
  searchToken,
  encodeCRC,
};
