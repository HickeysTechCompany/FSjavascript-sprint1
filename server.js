// Importing required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { searchToken } = require("./cliFunctions/token.js");
const logMessage = require("./log.js"); // Import logMessage function
const chalk = require("chalk"); // Import chalk module

// Creating an instance of express
const app = express();

// Global DEBUG flag
global.DEBUG = true;

// Middleware to serve static files from the 'pages' directory
app.use(express.static(path.join(__dirname, "pages")));

// Middleware to serve static files from the 'styles' directory
app.use("/styles", express.static(path.join(__dirname, "styles")));

// Middleware to serve static files from the 'scripts' directory
app.use("/pagescripts", express.static(path.join(__dirname, "scripts")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Route for the home page
app.get("/", function (req, res) {
  // Debug log
  if (DEBUG) {
    console.log(chalk.bgGreen("index.html page was requested."));
    logMessage("User has landed.");
  }

  // Send index.html file
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await searchToken("u", username);

    if (user.password !== password) {
      res.status(401).send("Wrong password");
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.error(chalk.red(error));
    logMessage(`Error: ${error}`);
    res.status(401).send("User not found");
  }
});

// Route for the signup page
app.get("/signup", function (req, res) {
  // Debug log
  if (DEBUG) {
    console.log(chalk.bgGreen("signup.html page was requested."));
    logMessage("signup.html page was requested.");
  }

  // Send signup.html file
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

// Route for the home page
app.get("/home", function (req, res) {
  // Debug log
  if (DEBUG) {
    console.log(chalk.bgGreen("home.html page was requested."));
    logMessage("User routed to home page.");
  }

  // Send home.html file
  res.sendFile(path.join(__dirname, "pages", "home.html"));
});

// Route for the notFound page
app.get("/notFound", function (req, res) {
  // Debug log
  if (DEBUG) {
    console.log(chalk.yellow("notFound.html page was requested."));
    logMessage("notFound.html page was requested.");
  }

  // Send notFound.html file
  res.sendFile(path.join(__dirname, "pages", "notFound.html"));
});

// Middleware for handling 404 requests
app.use(function (req, res, next) {
  // Ignore favicon.ico requests
  if (req.path === "/favicon.ico") {
    return res.status(204).end();
  }

  // Debug log
  if (DEBUG) {
    console.log(chalk.red("Unknown page was requested."));
    logMessage("Unknown page was requested.");
  }

 // Skip redirect if the request is already for the notFound route
  if (req.path === "/notFound") {
    return next();
  }

  // Redirect to notFound.html page
  res.redirect("/notFound");
});

// Starting the server and listening on port 3000
app.listen(3000, function () {
  console.log(chalk.blue("Server is listening on port 3000."));
  logMessage("Server has been started on port 3000");
});