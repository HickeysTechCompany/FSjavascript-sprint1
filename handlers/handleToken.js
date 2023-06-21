const cliFunctions = require("../cliFunctions/token.js");

function handleTokenCommand(options) {
  if (options.includes("--help")) {
    displayTokenHelp();
  } else if (options.includes("--count")) {
    cliFunctions.countTokens();
  } else if (options.includes("--list")) {
    // Handle token --list command
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
  } else if (options.includes("--fetch")) {
    // Handle token --fetch command
  } else if (options.includes("--search")) {
    const searchType = options[options.indexOf("--search") + 1];
    const value = options[options.indexOf("--search") + 2];
    cliFunctions.searchToken(searchType, value);
  } else {
    console.log("Invalid option for token command!");
  }
}

module.exports = handleTokenCommand;
