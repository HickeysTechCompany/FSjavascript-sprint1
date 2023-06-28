// TO BE USED FOR GENERALIZED LOGGING
// HOW TO USE
// In any .js or any other file
// const logMessage = require('log.js'); to load the module
// logMessage('This is a test message'); to log your message when that action is taken

//Importa whata wea needa mama mia pizzaria 
const fs = require("fs");
const util = require("util");
const path = require("path");

const appendFile = util.promisify(fs.appendFile);
const access = util.promisify(fs.access);

// Creates or appends a message to the log.txt file.
async function logMessage(message) {
  const logFolderPath = path.join(__dirname, "logs");

  try {
    // Check if log directory exists
    await access(logFolderPath, fs.constants.F_OK);
  } catch (error) {
    console.error("File Structure not fully initialized, log folder missing");
    return;
  }

  // Generate filename with today's date
  const today = new Date();
  const logFileName = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}.txt`;

  const logFilePath = path.join(logFolderPath, logFileName);
  const timestamp = today.toISOString();

  try {
    await appendFile(logFilePath, `${timestamp} - ${message}\n`);
  } catch (error) {
    console.error(`Failed to write to log file: ${error}`);
  }
}

module.exports = logMessage;
