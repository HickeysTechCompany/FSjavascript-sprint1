const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

// Function to create the config file
async function createConfigFile() {
  const { configjson } = require("../templates.js");

  const configDir = path.join(__dirname, "..", "json");
  const configFilePath = path.join(configDir, "config.json");

  try {
    await fs.access(configDir); // Check if the config directory exists
  } catch (err) {
    await fs.mkdir(configDir); // If not, create the config directory
  }

  try {
    await fs.access(configFilePath); // Check if the config file already exists
    console.log(chalk.blue("Config file already exists."));
    return true; // Return true even if the file already exists
  } catch (err) {
    await fs.writeFile(configFilePath, JSON.stringify(configjson, null, 2)); // Write the configjson data to the config file
    console.log(chalk.green("Created a new configuration file."));
    return true;
  }
}

// Function to create the directory structure
async function createDirectoryStructure() {
  let createdFolders = 0;
  let existingFolders = 0;
  let errorCount = 0;
  const { folders } = require("../templates.js");

  const currentDirectory = process.cwd(); // Get the current working directory

  try {
    for (const folderName of folders) {
      const folderPath = path.join(currentDirectory, folderName); // Use path.join to create the correct folder path

      try {
        await fs.access(folderPath, fs.constants.F_OK); // Check if the folder already exists
        console.log(chalk.blue(`Folder '${folderName}' already exists.`));
        existingFolders++;
      } catch (error) {
        if (error.code === "ENOENT") {
          try {
            await fs.mkdir(folderPath); // If the folder doesn't exist, create it
            console.log(
              chalk.green(`Folder '${folderName}' has been created.`)
            );
            createdFolders++;
          } catch (error) {
            console.error(
              chalk.red(`Error creating folder '${folderName}':`, error)
            );
            errorCount++;
          }
        } else {
          console.error(
            chalk.red(`Error checking folder '${folderName}':`, error)
          );
          errorCount++;
        }
      }
    }
    console.log(
      chalk.magenta(`Total folders found: ${existingFolders}/${folders.length}`)
    );
    console.log(
      chalk.magenta(
        `Total folders created: ${createdFolders}/${folders.length}`
      )
    );
    console.log(
      chalk.magenta(
        `Total errors creating folders: ${errorCount}/${folders.length}`
      )
    );
    return true;
  } catch (error) {
    console.error(chalk.red("Error:", error));
    return false;
  }
}

// Function to create the help files
const {
  allhelptxt,
  confighelptxt,
  tokenhelptxt,
  inithelptxt,
} = require("../templates.js");

async function createHelpFiles() {
  try {
    const helpDir = path.join(__dirname, "..", "commands");
    const helpFiles = [
      { name: "inithelp.txt", content: inithelptxt },
      { name: "confighelp.txt", content: confighelptxt },
      { name: "tokenhelp.txt", content: tokenhelptxt },
      { name: "allhelp.txt", content: allhelptxt },
    ];

    let isDirExists;
    try {
      await fs.access(helpDir, fs.constants.F_OK); // Check if the "commands" help directory exists
      isDirExists = true;
    } catch (error) {
      isDirExists = false;
    }

    if (!isDirExists) {
      await fs.mkdir(helpDir); // If not, create the "commands" directory
      console.log(chalk.green(`Directory ${helpDir} created for help files`));
    } else {
      console.log(chalk.blue(`Directory ${helpDir} found for help files`));
    }

    for (const helpFile of helpFiles) {
      const filePath = path.join(helpDir, helpFile.name);

      try {
        await fs.access(filePath, fs.constants.F_OK); // Check if the help file already exists
        console.log(chalk.blue(`${helpFile.name} already exists`));
      } catch (error) {
        await fs.writeFile(filePath, helpFile.content); // If not, create the help file
        console.log(chalk.green(`${helpFile.name} was created`));
      }
    }

    return true;
  } catch (error) {
    console.error("Error creating help files:", error);
    return false;
  }
}

module.exports = {
  createConfigFile,
  createDirectoryStructure,
  createHelpFiles,
};
