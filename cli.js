const fs = require("fs");
const path = require("path");
const initHandler = require("./handlers/handleInit.js");
const configHandler = require("./handlers/handleConfig.js");
const tokenHandler = require("./handlers/handleToken.js");

// Parse command-line arguments
const [nodePath, scriptPath, subcommand, ...options] = process.argv;

// Get the filename without the extension to use as the command
const filename = path.basename(scriptPath, path.extname(scriptPath));

if (subcommand === "--help" || subcommand === undefined) {
  displayHelp("./commands/allhelp.txt");
} else {
  handleMainCommand(subcommand, options);
}

function handleMainCommand(subcommand, options) {
  switch (subcommand) {
    case "init":
      if (options.includes("--help")) {
        displayHelp("./commands/initHelp.txt");
      } else {
        initHandler(options);
      }
      break;
    case "config":
      if (options.includes("--help")) {
        displayHelp("./commands/configHelp.txt");
      } else {
        configHandler(options);
      }
      break;
    case "token":
      if (options.includes("--help")) {
        displayHelp("./commands/tokenHelp.txt");
      } else {
        tokenHandler(options);
      }
      break;
    default:
      console.log(`Invalid subcommand for ${filename}!`);
      break;
  }
}

function displayHelp(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log(data);
  });
}
