// Function to create config file
const fs = require("fs");
const path = require("path");

function createConfigFile() {
  const { configjson } = require("../templates.js"); // Import only configjson

  const configDir = path.join(__dirname, "..", "json"); // Create json directory at one level up
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

    // Write the configjson data to the config file
    fs.writeFile(configFilePath, JSON.stringify(configjson, null, 2), (err) => {
      if (err) throw err;
      console.log("Created a new configuration file.");
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
