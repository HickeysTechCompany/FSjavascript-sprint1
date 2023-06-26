// Function to create config file
const { error } = require("console");
const fs = require("fs").promises;
const path = require("path");

async function createConfigFile() {
  const { configjson } = require("../templates.js"); // Import only configjson

  const configDir = path.join(__dirname, "..", "json"); // Create json directory at one level up
  const configFilePath = path.join(configDir, "config.json");

  // Ensure that the 'json' directory exists
  try {
    await fs.access(configDir);
  } catch (err) {
    await fs.mkdir(configDir);
  }

  // Check if the config file already exists
  try {
    await fs.access(configFilePath);
    console.log("Config file already exists.");
  } catch (err) {
    // Write the configjson data to the config file
    await fs.writeFile(configFilePath, JSON.stringify(configjson, null, 2));
    console.log("Created a new configuration file.");
  }
}

// Function to create directory structure
async function createDirectoryStructure() {
  let createdFolders = 0;
  let errorCount = 0;

  try {
    for (const folderName of folders) {
      const folderPath = `./${folderName}`;

      try {
        // Check if the folder exists
        await fs.promises.access(folderPath, fs.constants.F_OK);
        console.log(`Folder '${folderName}' already exists.`);
      } catch (error) {
        // If the folder doesn't exist, create it
        if (error.code === "ENOENT") {
          try {
            await fs.promises.mkdir(folderPath);
            console.log(`Folder '${folderName}' has been created.`);
            createdFolders++;
          } catch (error) {
            console.error(`Error creating folder '${folderName}':`, error);
            errorCount++;
          }
        } else {
          console.error(`Error checking folder '${folderName}':`, error);
          errorCount++;
        }
      }
    }

    console.log(`Total folders created: ${createdFolders}`);
    console.log(`Total errors creating folders: ${errorCount}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to create help files
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

    // Check if the "commands" help directory exists
    const isDirExists = await fs
      .stat(helpDir)
      .then((stats) => stats.isDirectory());

    if (!isDirExists) {
      // Create the "commands" directory if it doesn't exist
      await fs.mkdir(helpDir);
      console.log(`Directory ${helpDir} created for help files`);
    } else {
      console.log(`Directory ${helpDir} found for help files`);
    }

    // Check and create the help files
    for (const helpFile of helpFiles) {
      const filePath = `${helpDir}/${helpFile.name}`;

      try {
        await fs.stat(filePath);
        console.log(`${helpFile.name} already exists`);
      } catch (error) {
        await fs.writeFile(filePath, helpFile.content);
        console.log(`${helpFile.name} was created`);
      }
    }
  } catch (error) {
    console.error("Error creating help files:", error);
  }
}
module.exports = {
  createConfigFile,
  createDirectoryStructure,
  createHelpFiles,
};
