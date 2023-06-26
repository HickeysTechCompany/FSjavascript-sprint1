// Function to create config file
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
function createDirectoryStructure() {
  // Enter code here...
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
