const fs = require("fs");
const readline = require("readline");
const cliFunctions = require("./cliFunctions");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Read input from command line
rl.question("Enter a command: ", (input) => {
  const [command, ...options] = input.split(" ");

  switch (command) {
    case "init":
      handleInitCommand(options);
      break;
    case "config":
      handleConfigCommand(options);
      break;
    case "token":
      handleTokenCommand(options);
      break;
    case "--help":
      displayAllHelp();
      break;
    default:
      console.log("Invalid command!");
      break;
  }

  rl.close();
});

function handleInitCommand(options) {
  if (options.includes("--help")) {
    console.log("Displays help for the init command");
  } else if (options.includes("--all")) {
    cliFunctions.createDirectoryStructure();
    cliFunctions.createConfigFile();
    cliFunctions.createHelpFiles();
    console.log(
      "Folder structure, config file, and help files created successfully!"
    );
  } else if (options.includes("--mk")) {
    cliFunctions.createDirectoryStructure();
    console.log("Folder structure created successfully!");
  } else if (options.includes("--cat")) {
    cliFunctions.createConfigFile();
    cliFunctions.createHelpFiles();
    console.log("Config file and help files created successfully!");
  } else {
    console.log("Invalid option for init command!");
  }
}

function handleConfigCommand(options) {
  if (options.includes("--help")) {
    console.log("Displays help for the config command");
  } else if (options.includes("--show")) {
    cliFunctions.viewConfigSettings();
  } else if (options.includes("--reset")) {
    cliFunctions.resetConfigFile();
    console.log("Configuration file reset successfully!");
  } else if (options.includes("--set")) {
    const configOption = options[options.indexOf("--set") + 1];
    const configValue = options[options.indexOf("--set") + 2];
    cliFunctions.setConfigSetting(configOption, configValue);
    console.log("Configuration setting updated successfully!");
  } else {
    console.log("Invalid option for config command!");
  }
}

function handleTokenCommand(options) {
  if (options.includes("--help")) {
    console.log("Displays help for the token command");
  } else if (options.includes("--count")) {
    cliFunctions.countTokens();
  } else if (options.includes("--new")) {
    const username = options[options.indexOf("--new") + 1];
    cliFunctions.generateToken(username);
    console.log("Token generated successfully!");
  } else if (options.includes("--upd")) {
    const tokenType = options[options.indexOf("--upd") + 1];
    const username = options[options.indexOf("--upd") + 2];
    const value = options[options.indexOf("--upd") + 3];
    cliFunctions.updateToken(tokenType, username, value);
    console.log("Token entry updated successfully!");
  } else if (options.includes("--search")) {
    const searchType = options[options.indexOf("--search") + 1];
    const value = options[options.indexOf("--search") + 2];
    cliFunctions.searchToken(searchType, value);
  } else {
    console.log("Invalid option for token command!");
  }
}

function displayAllHelp() {
  console.log("Usage:");
  console.log("myapp <command> <option>");
  console.log("");
  console.log(
    "myapp --help                                                          Displays all help"
  );
  console.log(
    "myapp init --help                                                  Displays help for the init command"
  );
  console.log(
    "myapp init --all                                                      Creates the folder structure and the config and help files"
  );
  console.log(
    "myapp init --mk                                                    Creates the folder structure"
  );
  console.log(
    "myapp init --cat                                                    Creates the config file with default settings and the help files"
  );
  console.log(
    "myapp config -- help                                          Displays help for the config command"
  );
  console.log(
    "myapp config --show                                         Displays a list of the current config settings"
  );
  console.log(
    "myapp config --reset                                          Resets the config file with default settings"
  );
  console.log(
    "myapp config --set <option> <value>       Sets a specific config setting"
  );
  console.log(
    "myapp token --help                                            Displays help for the token command"
  );
  console.log(
    "myapp token --count                                         Displays a count for the tokens created"
  );
  console.log(
    "myapp token --new <username>                Generates a token for a given username, saves token to json file"
  );
  console.log(
    "myapp token --upd p <username> <phone> updates the json entry with a new phone number"
  );
  console.log(
    "myapp token --upd e <username> <email> updates the json entry with a new email"
  );
  console.log(
    "myapp token --search u <username>        Fetches a token for a given username"
  );
  console.log(
    "myapp token --search e <email>                  Fetches a token for a given email"
  );
  console.log(
    "myapp token --search p <phone>                Fetches a token for a given phone number"
  );
}
