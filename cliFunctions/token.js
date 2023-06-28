//cole needs these for the CRC encoding :D
//remember npm install!!
const crypto = require("crypto");
const crc32 = require("crc-32");
global.DEBUG = true;
const fs = require("fs");
const path = require("path");
const readline = require("readline");

//cole will take in the these token related functions dont worry about it
// Function that counts tokens
function encodeCRC(input) {
  const inputData = Buffer.from(input, "utf8");
  const token = crc32.buf(inputData).toString(16);
  return token;
}
 
// Function that lists tokens with corresponding usernames
function listTokens() {
  const jsonFilePath = path.join(__dirname, "..", "json", "users.json");

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading users file: ${err}`);
      return;
    }

    const users = JSON.parse(data);
    users.forEach((user) => {
      console.log(`${user.username} : ${user.token}`);
    });

    // Log the action
    logMessage("Listed all users and tokens");
  });
}



// Function for fetching user record from username
function fetchToken(username) {
  const jsonFilePath = path.join(__dirname, "..", "json", "users.json");

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading users file: ${err}`);
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((user) => user.username === username);

    if (user) {
      console.log(user); // Prints the full user record

      // Log the action
      logMessage(`Fetched token for ${username}`);
    } else {
      console.log(`No user found with username: ${username}`);
    }
  });
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
// Function that generates a token for a given username
function generateToken(username) {
  const jsonFilePath = path.join(__dirname, "..", "json", "users.json");

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
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
      foundUser.token = token; // Update the token in the user object

      fs.writeFile(jsonFilePath, JSON.stringify(users), "utf8", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Token generated for ${username}: ${token}`);
      });
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
async function searchToken(searchType, value) {
  return new Promise((resolve, reject) => {
    const jsonFilePath = path.join(__dirname, "..", "json", "users.json");

    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading users file: ${err}`);
        reject(err);
      }

      const users = JSON.parse(data);
      let foundUser;

      switch (searchType) {
        case "u":
          foundUser = users.find((user) => user.username === value);
          break;
        case "e":
          foundUser = users.find((user) => user.email === value);
          break;
        case "p":
          foundUser = users.find((user) => user.phone === value);
          break;
        default:
          reject(`Invalid search type: ${searchType}`);
      }

      if (foundUser) {
        resolve(foundUser);
      } else {
        reject(`No user found for ${searchType}: ${value}`);
      }
    });
  });
}

module.exports = {
  countTokens,
  generateToken,
  updateToken,
  searchToken,
  encodeCRC,
  listTokens,
  fetchToken,
};