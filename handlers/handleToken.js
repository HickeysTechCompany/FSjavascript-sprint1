const cliFunctions = require("../cliFunctions/token.js");
const logMessage = require("../log");

async function handleTokenCommand(options) {
  if (options.includes("--help")) {
    displayTokenHelp();
  } else if (options.includes("--count")) {
    cliFunctions.countTokens();
  } else if (options.includes("--list")) {
    console.log("Listing all users and tokens...");
    cliFunctions.listTokens();

    // Log the action
    logMessage("Listed all users and tokens");
  } else if (options.includes("--new")) {
    const username = options[options.indexOf("--new") + 1];
    cliFunctions.generateToken(username);
    console.log("Token generated successfully!");

    // Log the action
    logMessage(`Generated token for ${username}`);
  } else if (options.includes("--upd")) {
    const tokenType = options[options.indexOf("--upd") + 1];
    const username = options[options.indexOf("--upd") + 2];
    const value = options[options.indexOf("--upd") + 3];
    cliFunctions.updateToken(tokenType, username, value);
    console.log("Token entry updated successfully!");

    // Log the action
    logMessage(`Updated token entry for ${username}`);
  } else if (options.includes("--fetch")) {
    const username = options[options.indexOf("--fetch") + 1];
    if (username) {
      cliFunctions.fetchToken(username);
    } else {
      console.log("You must specify a username to fetch the token for.");
    }

    // Log the action
    logMessage(`Fetched token for ${username}`);
  } else if (options.includes("--search")) {
    const searchType = options[options.indexOf("--search") + 1];
    const value = options[options.indexOf("--search") + 2];
    try {
      const user = await cliFunctions.searchToken(searchType, value);
      console.log(user);

      // Log the action
      logMessage(`Searched token for ${searchType}: ${value}`);
    } catch (err) {
      console.log(`No user found for ${searchType}: ${value}`);
    }
  } else {
    console.log("Invalid option for token command!");
  }
}

module.exports = handleTokenCommand;
