// Function to create config file
const { error } = require("console");
const fs = require("fs");
const path = require("path");

function createConfigFile() {
  const { configjson } = require("../templates.js"); // Import only configjson

  const configDir = path.join(__dirname, "..", "json"); // Create json directory at one level up
  const configFilePath = path.join(configDir, "config.json");

  // Ensure that the 'json' directory exists
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }

  // Check if the config file already exists
  fs.access(configFilePath, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log("Config file already exists.");
      return;
    }

    // Write the configjson data to the config file
    fs.writeFile(configFilePath, JSON.stringify(configjson, null, 2), (err) => {
      if (error) throw error;
      console.log("Created a new configuration file.");
    });
  });
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

createDirectoryStructure();

// Function to create help filesc
function createHelpFiles() {}
module.exports = {
  createConfigFile,
  createDirectoryStructure,
  createHelpFiles,
};
