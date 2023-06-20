//cole needs these for the CRC encoding :D
//remember npm install!!
const crypto = require("crypto");
const crc32 = require("crc-32");
global.DEBUG = true;
const fs = require("fs");
const readline = require("readline");
const { EventEmitter } = require("events");

const myEmitter = new EventEmitter();
// All functions to make the CLI menu work

// Function to create directory structure
function createDirectoryStructure() {
  // Enter code here...
}

// Function to create config file
function createConfigFile() {
  const templateFilePath = "/path/to/original/config.json";
  const configFilePath = __dirname + "/js/config.js";

  // Check if the config file already exists
  fs.access(configFilePath, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log("Config file already exists.");
      return;
    }

    fs.readFile(templateFilePath, "utf8", (err, templateData) => {
      if (err) throw err;

      const defaultConfig = JSON.parse(templateData);

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // Prompt the user for input and update the config attributes
      rl.question("Enter the name: ", (name) => {
        defaultConfig.name = name;
        rl.question("Enter the version: ", (version) => {
          defaultConfig.version = version;
          rl.question("Enter the description: ", (description) => {
            defaultConfig.description = description;
            rl.question("Enter the main: ", (main) => {
              defaultConfig.main = main;
              rl.question("Enter the superuser: ", (superuser) => {
                defaultConfig.superuser = superuser;
                rl.question("Enter the database: ", (database) => {
                  defaultConfig.database = database;

                  rl.close();

                  // Write the modified template data to the config file
                  fs.writeFile(
                    configFilePath,
                    JSON.stringify(defaultConfig, null, 2),
                    (err) => {
                      if (err) throw err;
                      console.log("Created a new configuration file.");
                      resetConfig(); // Call resetConfig() again to write the contents to config.js
                    }
                  );
                });
              });
            });
          });
        });
      });
    });
  });
}

// Function to create help filesc
function createHelpFiles() {
  // Enter code here...
}

// Function to view current config settings

function viewConfigSettings() {
  const emitter = new EventEmitter();

  // Check if DEBUG is truthy, and if so, log a debug message
  if (DEBUG) console.log("config.viewConfigSettings()");

  // Read the contents of the "config.js" file
  fs.readFile(__dirname + "/js/config.js", (error, data) => {
    // Handle any errors that occurred during file reading
    if (error) {
      emitter.emit("fileNotFound", error); // Emit 'fileNotFound' event with the error
      return; // Stop execution of the function
    }

    // Parse the data using the js.parse() function and log the result
    console.log(js.parse(data));
  });

  return emitter; // Return the event emitter for handling the custom event
}

// Function to reset config file to default settings
function resetConfigFile() {
  const originalFilePath = "/path/to/original/config.json";
  const configFilePath = __dirname + "/js/config.js";

  // Check if the original configuration file exists
  fs.access(originalFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("Original configuration file does not exist.");
      createConfigFile();
      return;
    }

    // Read the original configuration file
    fs.readFile(originalFilePath, "utf8", (err, data) => {
      if (err) throw err;

      // Write the contents of the original configuration to the config file
      fs.writeFile(configFilePath, data, (err) => {
        if (err) throw err;
        console.log(
          "The configuration file has been reset to its original state!"
        );
        myEmitter.emit(
          "log",
          "resetConfig()",
          "INFO",
          "config.js reset to original state."
        );
      });
    });
  });
}

// Function to update specific config setting
function setConfigSetting(option, value) {
  if (DEBUG) console.log("config.setConfigSettings()");

  // Read the contents of the "config.js" file
  fs.readFile(__dirname + "/js/config.js", (error, data) => {
    if (error) throw error;

    if (DEBUG) console.log(js.parse(data));

    // Parse the data from the config file
    let cfg = js.parse(data);

    // Iterate over the keys of the config object
    for (let key of Object.keys(cfg)) {
      if (key === myArgs[2]) {
        // Update the value for the specified key
        cfg[key] = myArgs[3];
        match = true;
      }
    }

    if (!match) {
      console.log(`Key is not valid: ${myArgs[2]}, Please Try Another.`);

      // Emit a log event with a warning message
      myEmitter.emit(
        "log",
        "config.setConfigSetting()",
        "WARNING",
        `Key Invalid Please Try again: ${myArgs[2]}`
      );
    }

    if (DEBUG) console.log(cfg);

    // Convert the modified config object back to a string
    option = js.stringify(cfg, null, 2);

    // Write the updated config to the file
    fs.writeFile(__dirname + "/js/config.js", data, (error) => {
      if (error) throw error;

      if (DEBUG) console.log("Config File Updated Successfully.");

      // Emit a log event with an info message
      myEmitter.emit(
        "log",
        "config.setConfigSettings()",
        "INFO",
        `config.json "${myArgs[2]}": updated to "${myArgs[3]}"`
      );
    });
  });
}
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
  createDirectoryStructure,
  createConfigFile,
  createHelpFiles,
  viewConfigSettings,
  resetConfigFile,
  setConfigSetting,
  countTokens,
  generateToken,
  updateToken,
  searchToken,
  encodeCRC,
};
