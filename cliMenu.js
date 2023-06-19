const fs = require("fs");
const readline = require("readline");
const initHandler = require("./handlers/handleInit.js");
const configHandler = require("./handlers/handleConfig.js");
const tokenHandler = require("./handlers/handleToken.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a command: ", (input) => {
  const [command, subcommand, ...options] = input.split(" ");

  switch (command) {
    case "myapp":
      if (subcommand === "--help") {
        displayHelp("./commands/allhelp.txt");
      } else {
        handleMainCommand(subcommand, options);
      }
      break;
    default:
      console.log("Invalid command!");
      break;
  }

  rl.close();
});

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
      console.log("Invalid subcommand!");
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
