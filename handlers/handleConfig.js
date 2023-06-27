const cliFunctions = require("../cliFunctions/config.js");
const logMessage = require("../log.js");

function handleConfigCommand(options) {
  if (options.includes("--help")) {
    displayConfigHelp();
    logMessage("Displayed config help");
  } else if (options.includes("--show")) {
    cliFunctions.viewConfigSettings();
    logMessage("Displayed config settings");
  } else if (options.includes("--reset")) {
    cliFunctions.resetConfigFile();
    console.log("Configuration file reset successfully!");
    logMessage("Reset configuration file to default settings");
  } else if (options.includes("--set")) {
    const configOption = options[options.indexOf("--set") + 1];
    const configValue = options[options.indexOf("--set") + 2];
    cliFunctions.setConfigSetting(configOption, configValue);
    console.log("Configuration setting updated successfully!");
    logMessage(`Updated config setting: ${configOption} = ${configValue}`);
  } else {
    console.log("Invalid option for config command!");
    logMessage("Invalid option for config command");
  }
}

module.exports = handleConfigCommand;