const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Function to create config file

function createConfigFile() {
  const template = require("../templates.js");

  const configDir = path.join(__dirname, "json");
  const configFilePath = path.join(configDir, "config.json");

  // Ensure that the 'json' directory exists
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }

  // Check if the config file already exists
  fs.access(configFilePath, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log("Config file already exists.");
      return;
    }

    const defaultConfig = template;

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
}

// Function to view current config settings

function viewConfigSettings() {
  const emitter = new EventEmitter();

  // Check if DEBUG is truthy, and if so, log a debug message
  if (DEBUG) console.log("config.viewConfigSettings()");

  // Define the path to the config.json file
  const configPath = path.join(__dirname, "../json/config.json");

  // Read the contents of the "config.json" file
  fs.readFile(configPath, (error, data) => {
    // Handle any errors that occurred during file reading
    if (error) {
      emitter.emit("fileNotFound", error); // Emit 'fileNotFound' event with the error
      return; // Stop execution of the function
    }

    // Parse the data using the JSON.parse() function and log the result
    console.log(JSON.parse(data));
  });

  return emitter; // Return the event emitter for handling the custom event
}

// Function to reset config file to default settings
function resetConfigFile() {
  const configFilePath = path.join(__dirname, "../json/config.json");

  // Convert the templateConfig object to a string
  const data = JSON.stringify(templateConfig, null, 2);

  // Write the template config to the config.json file
  fs.writeFile(configFilePath, data, (err) => {
    if (err) throw err;
    console.log("The configuration file has been reset to its original state!");
    myEmitter.emit(
      "log",
      "resetConfig()",
      "INFO",
      "config.json reset to original state."
    );
  });
}
