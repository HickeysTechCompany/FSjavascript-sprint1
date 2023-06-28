const folders = [`commands`, `json`, `logs`, `styles`, `pages`, `pagescripts`]; // Any folders added here will be created by createDirectoryStructure(); in cliFunctions/init.js

// Template for when user requests node cli --help
const allhelptxt = `

cli <command> <option>

Usage:

cli --help                            displays all commands
cli init --all                        creates the folder structure and config file
cli init --mk                         creates the folder structure
cli init --cat                        creates the config file with default settings


cli config --help                     displays help for configuration
cli config --show                     displays a list of the current config settings
cli config --reset                    resets the config file with default settings
cli config --set                      sets a specific config setting


cli token --help                      displays help for tokens
cli token --count                     displays a count of the tokens created
cli token --list                      list all the usernames with tokens
cli token --new <username>            generates a token for a given username, saves tokens to the json file
cli token --upd p <username> <phone>  updates the json entry with phone number
cli token --upd e <username> <email>  updates the json entry with email
cli token --fetch <username>          fetches a user record for a given username
cli token --search u <username>       searches a token for a given username
cli token --search e <email>          searches a token for a given email
cli token --search p <phone>          searches a token for a given phone number

`;

// Template for when user request node cli config --help
const confighelptxt = `

cli <command> <option>

Usage:

cli config --help
cli config --show     displays a list of the current config settings
cli config --reset    resets the config file with default settings
cli config --set      sets a specific config setting


`;

//Template for when user request node cli init --help
const inithelptxt = `

cli init <command> <option>

Usage:

cli init --help
cli init --all          creates the folder structure and config file
cli init --mk           creates the folder structure
cli init --cat          creates the config file with default settings


`;

//Template for when user request node cli token --help
const tokenhelptxt = `

cli <command> <option>

Usage:

cli token --help
cli token --count                     displays a count of the tokens created
cli token --list                      list all the usernames with tokens
cli token --new <username>            generates a token for a given username, saves tokens to the json file
cli token --upd p <username> <phone>  updates the json entry with phone number
cli token --upd e <username> <email>  updates the json entry with email
cli token --fetch <username>          fetches a user record for a given username
cli token --search u <username>       searches a token for a given username
cli token --search e <email>          searches a token for a given email
cli token --search p <phone>          searches a token for a given phone number


`;

//Template for the app configuration JSON file
const configjson = {
  name: "SprintCLI",
  version: "1.0.0",
  description: "Command line interface for app",
  main: "cli.js",
  superuser: "admin",
  database: "defaultdb",
};

module.exports = {
  folders,
  allhelptxt,
  confighelptxt,
  tokenhelptxt,
  configjson,
  inithelptxt,
};
