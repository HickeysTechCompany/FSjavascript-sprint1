// Importing necessary filesystem and path modules from Node.js
const fs = require("fs");
const path = require("path");

// Importing custom handlers from 'handlers' directory
const initHandler = require("./handlers/handleInit.js");
const configHandler = require("./handlers/handleConfig.js");
const tokenHandler = require("./handlers/handleToken.js");

// Parsing command-line arguments
const [nodePath, scriptPath, subcommand, ...options] = process.argv;

// Getting the filename without the extension to use as the command
const filename = path.basename(scriptPath, path.extname(scriptPath));

// Checking if a subcommand was provided
if (subcommand === undefined) {
  // If subcommand is undefined, displaying help from 'commands.txt'
  displayHelp("./commands.txt");
} else if (subcommand === "--help") {
  // If '--help' is requested, displaying help from 'allhelp.txt'
  displayHelp("./commands/allhelp.txt");
} else {
  // Handling main command if a valid subcommand is given
  handleMainCommand(subcommand, options);
}

// Function to handle main commands
function handleMainCommand(subcommand, options) {
  switch (subcommand) {
    case "init":
      // If 'init' subcommand is given without options or with '--help', displaying help from 'inithelp.txt'
      // Else, calling initHandler with provided options
      if (options.length === 0 || options.includes("--help")) {
        displayHelp("./commands/inithelp.txt");
      } else {
        initHandler(options);
      }
      break;
    case "config":
      // If 'config' subcommand is given without options or with '--help', displaying help from 'confighelp.txt'
      // Else, calling configHandler with provided options
      if (options.length === 0 || options.includes("--help")) {
        displayHelp("./commands/confighelp.txt");
      } else {
        configHandler(options);
      }
      break;
    case "token":
      // If 'token' subcommand is given without options or with '--help', displaying help from 'tokenhelp.txt'
      // Else, calling tokenHandler with provided options
      if (options.length === 0 || options.includes("--help")) {
        displayHelp("./commands/tokenhelp.txt");
      } else {
        tokenHandler(options);
      }
      break;
    default:
      // If an invalid subcommand is given, logging an error message
      console.log(`Invalid subcommand for ${filename}!`);
      break;
  }
}

// Function to display help messages
function displayHelp(filePath) {
  // Reading the help file using filesystem's readFile method
  fs.readFile(filePath, "utf8", (err, data) => {
    // If an error occurs during reading, logging the error
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // Logging the contents of the help file
    console.log(data);
  });
}