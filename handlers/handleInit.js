const cliFunctions = require("../cliFunctions/init.js");

async function handleInitCommand(options) {
  try {
    if (options.includes("--all")) {
      const directoryStructureInitialized =
        await cliFunctions.createDirectoryStructure();
      if (!directoryStructureInitialized) {
        console.log("Error initializing function structure");
        return;
      }
      console.log("Directory Structure Initialized");

      const configFilesInitialized = await cliFunctions.createConfigFile();
      if (!configFilesInitialized) {
        console.log("Error initializing config files");
        return;
      }
      console.log("Config Files Initialized");

      const helpFilesInitialized = await cliFunctions.createHelpFiles();
      if (!helpFilesInitialized) {
        console.log("Error initializing help files");
        return;
      }
      console.log("Help Files Initialized");
    } else if (options.includes("--mk")) {
      const directoryStructureInitialized =
        await cliFunctions.createDirectoryStructure();
      if (!directoryStructureInitialized) {
        console.log("Error initializing function structure");
        return;
      }
      console.log("Function Structure Initialized");
    } else if (options.includes("--cat")) {
      const configFilesInitialized = await cliFunctions.createConfigFile();
      if (!configFilesInitialized) {
        console.log("Error initializing config files");
        return;
      }
      console.log("Config Files Initialized");

      const helpFilesInitialized = await cliFunctions.createHelpFiles();
      if (!helpFilesInitialized) {
        console.log("Error initializing help files");
        return;
      }
      console.log("Help Files Initialized");
    } else {
      console.log("Invalid option for init command!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = handleInitCommand;
