const cliFunctions = require("../cliFunctions/init.js");
const chalk = require("chalk");

async function handleInitCommand(options) {
  try {
    if (options.includes("--all")) {
      console.log(chalk.yellow.bold("\nInitializing Directory Structure..."));
      const directoryStructureInitialized =
        await cliFunctions.createDirectoryStructure();
      if (!directoryStructureInitialized) {
        console.log(chalk.red("Error initializing function structure\n"));
        return;
      }
      console.log(chalk.green("Directory Structure Initialized\n"));

      console.log(chalk.yellow.bold("Initializing Config Files..."));
      const configFilesInitialized = await cliFunctions.createConfigFile();
      if (!configFilesInitialized) {
        console.log(chalk.red("Error initializing config files\n"));
        return;
      }
      console.log(chalk.green("Config Files Initialized\n"));

      console.log(chalk.yellow.bold("Initializing Help Files..."));
      const helpFilesInitialized = await cliFunctions.createHelpFiles();
      if (!helpFilesInitialized) {
        console.log(chalk.red("Error initializing help files\n"));
        return;
      }
      console.log(chalk.green("Help Files Initialized\n"));
    } else if (options.includes("--mk")) {
      console.log(chalk.yellow.bold("\nInitializing Directory Structure..."));
      const directoryStructureInitialized =
        await cliFunctions.createDirectoryStructure();
      if (!directoryStructureInitialized) {
        console.log(chalk.red("Error initializing function structure\n"));
        return;
      }
      console.log(chalk.green("Function Structure Initialized\n"));
    } else if (options.includes("--cat")) {
      console.log(chalk.yellow.bold("Initializing Config Files..."));
      const configFilesInitialized = await cliFunctions.createConfigFile();
      if (!configFilesInitialized) {
        console.log(chalk.red("Error initializing config files\n"));
        return;
      }
      console.log(chalk.green("Config Files Initialized\n"));

      console.log(chalk.yellow.bold("Initializing Help Files..."));
      const helpFilesInitialized = await cliFunctions.createHelpFiles();
      if (!helpFilesInitialized) {
        console.log(chalk.red("Error initializing help files\n"));
        return;
      }
      console.log(chalk.green("Help Files Initialized\n"));
    } else {
      console.log(chalk.red("Invalid option for init command!"));
    }
  } catch (error) {
    console.error(chalk.red("Error:", error));
  }
}

module.exports = handleInitCommand;
