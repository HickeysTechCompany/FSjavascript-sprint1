const EventEmitter = require("events");
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

// Example usage:
const configEmitter = viewConfigSettings();
configEmitter.on("fileNotFound", (error) => {
  console.error("File not found:", error);
});

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
  // Enter code here...
}

// Function that counts tokens
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
};
