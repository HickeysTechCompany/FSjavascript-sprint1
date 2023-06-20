const cliFunctions = require("../cliFunctions/config.js");

function handleConfigCommand(options) {
  if (options.includes("--help")) {
    displayConfigHelp();
  } else if (options.includes("--show")) {
    cliFunctions.viewConfigSettings();
  } else if (options.includes("--reset")) {
    cliFunctions.resetConfigFile();
    console.log("Configuration file reset successfully!");
  } else if (options.includes("--set")) {
    const configOption = options[options.indexOf("--set") + 1];
    const configValue = options[options.indexOf("--set") + 2];
    cliFunctions.setConfigSetting(configOption, configValue);
    console.log("Configuration setting updated successfully!");
  } else {
    console.log("Invalid option for config command!");
  }
}

module.exports = handleConfigCommand;
