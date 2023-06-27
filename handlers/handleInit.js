const cliFunctions = require("../cliFunctions/init.js");

async function handleInitCommand(options) {
  try {
    if (options.includes("--all")) {
      console.log("\nInitializing Directory Structure...");
      const directoryStructureInitialized =
        await cliFunctions.createDirectoryStructure();
      if (!directoryStructureInitialized) {
        console.log("Error initializing function structure\n");
        return;
      }
      console.log("Directory Structure Initialized\n");

      console.log("Initializing Config Files...");
      const configFilesInitialized = await cliFunctions.createConfigFile();
      if (!configFilesInitialized) {
        console.log("Error initializing config files\n");
        return;
      }
      console.log("Config Files Initialized\n");

      console.log("Initializing Help Files...");
      const helpFilesInitialized = await cliFunctions.createHelpFiles();
      if (!helpFilesInitialized) {
        console.log("Error initializing help files\n");
        return;
      }
      console.log("Help Files Initialized\n");
    } else if (options.includes("--mk")) {
      console.log("\nInitializing Directory Structure...");
      const directoryStructureInitialized =
        await cliFunctions.createDirectoryStructure();
      if (!directoryStructureInitialized) {
        console.log("Error initializing function structure\n");
        return;
      }
      console.log("Function Structure Initialized\n");
    } else if (options.includes("--cat")) {
      console.log("Initializing Config Files...");
      const configFilesInitialized = await cliFunctions.createConfigFile();
      if (!configFilesInitialized) {
        console.log("Error initializing config files\n");
        return;
      }
      console.log("Config Files Initialized\n");

      console.log("Initializing Help Files...");
      const helpFilesInitialized = await cliFunctions.createHelpFiles();
      if (!helpFilesInitialized) {
        console.log("Error initializing help files\n");
        return;
      }
      console.log("Help Files Initialized\n");
    } else {
      console.log("Invalid option for init command!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = handleInitCommand;
