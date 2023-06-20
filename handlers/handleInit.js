const cliFunctions = require("../cliFunctions/init.js");

function handleInitCommand(options) {
  if (options.includes("--all")) {
    cliFunctions.createDirectoryStructure();
    cliFunctions.createConfigFile();
    cliFunctions.createHelpFiles();
    console.log(
      "Folder structure, config file, and help files created successfully!"
    );
  } else if (options.includes("--mk")) {
    cliFunctions.createDirectoryStructure();
    console.log("Folder structure created successfully!");
  } else if (options.includes("--cat")) {
    cliFunctions.createConfigFile();
    cliFunctions.createHelpFiles();
    console.log("Config file and help files created successfully!");
  } else {
    console.log("Invalid option for init command!");
  }
}

module.exports = handleInitCommand;
