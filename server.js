// Importing required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { searchToken } = require("./cliFunctions/token.js");

// Creating an instance of express
const app = express();

// Global DEBUG flag
global.DEBUG = true;

// Middleware to serve static files from the 'styles' directory
app.use("/styles", express.static(path.join(__dirname, "styles")));

// Middleware to serve static files from the 'scripts' directory
app.use("/pagescripts", express.static(path.join(__dirname, "scripts")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Route for the home page
app.get("/", function (req, res) {
  // Debug log
  if (DEBUG) console.log("index.html page was requested.");

  // Send index.html file
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route for the signup page
app.get("/signup", function (req, res) {
  // Debug log
  if (DEBUG) console.log("signup.html page was requested.");

  // Send signup.html file
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

// Route for the home page
app.get("/home", function (req, res) {
  // Debug log
  if (DEBUG) console.log("home.html page was requested.");

  // Send home.html file
  res.sendFile(path.join(__dirname, "pages", "home.html"));
});

// Route for serving images from the 'pages' directory
app.use("/images", express.static(path.join(__dirname, "pages", "images")));

// Route for the notFound page
app.get("/notFound", function (req, res) {
  // Debug log
  if (DEBUG) console.log("notFound.html page was requested.");

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
  if (DEBUG) console.log("Unknown page was requested.");

  // Skip redirect if the request is already for the notFound route
  if (req.path === "/notFound") {
    return next();
  }

  // Redirect to notFound.html page
  res.redirect("/notFound");
});

// Starting the server and listening on port 3000
app.listen(3000, function () {
  console.log("Server is listening on port 3000.");
});