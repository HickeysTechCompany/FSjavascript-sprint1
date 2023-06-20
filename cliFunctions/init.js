// Function to create config file
const fs = require("fs");
const path = require("path");
const readline = require("readline");

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

// Function to create directory structure
function createDirectoryStructure() {
  // Enter code here...
}

// Function to create help filesc
function createHelpFiles() {
  // Enter code here...
}

module.exports = {
  createConfigFile,
  createDirectoryStructure,
  createHelpFiles,
};
