const fs = require("fs");
const path = require("path");
global.DEBUG = false;

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

// Function to update specific config setting
function setConfigSetting(option, value) {
  if (DEBUG) console.log("config.setConfigSettings()");

  // Read the contents of the "config.json" file
  fs.readFile(
    path.join(__dirname, "../json/config.json"),
    "utf-8",
    (error, data) => {
      if (error) throw error;

      // Parse the data from the config file
      let cfg = JSON.parse(data);

      // Check if the key exists in the config object
      if (cfg.hasOwnProperty(option)) {
        // Update the value for the specified key
        cfg[option] = value;

        if (DEBUG) console.log(cfg);

        // Convert the modified config object back to a string
        let updatedConfig = JSON.stringify(cfg, null, 2);

        // Write the updated config to the file
        fs.writeFile(
          path.join(__dirname, "../json/config.json"),
          updatedConfig,
          (error) => {
            if (error) throw error;

            if (DEBUG) console.log("Config File Updated Successfully.");

            // Emit a log event with an info message
            myEmitter.emit(
              "log",
              "config.setConfigSettings()",
              "INFO",
              `config.json "${option}": updated to "${value}"`
            );
          }
        );
      } else {
        console.log(`Key is not valid: ${option}, Please Try Another.`);

        // Emit a log event with a warning message
        myEmitter.emit(
          "log",
          "config.setConfigSetting()",
          "WARNING",
          `Key Invalid Please Try again: ${option}`
        );
      }
    }
  );
}

module.exports = {
  viewConfigSettings,
  resetConfigFile,
  setConfigSetting,
};
