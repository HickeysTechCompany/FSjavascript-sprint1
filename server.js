// Importing required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { searchToken } = require("./cliFunctions/token.js");
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

// Route for the home page
app.get("/", function (req, res) {
  // Debug log
  if (DEBUG) console.log("index.html page was requested.");

  // Send index.html file
  res.sendFile(path.join(__dirname, "index.html"));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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
    console.error(error);
    res.status(401).send("User not found");
  }
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

// Middleware for handling 404 requests
app.use(function (req, res, next) {
  // Debug log
  if (DEBUG) console.log("Unknown page was requested.");

  // Set status to 404 and send notFound.html file
  res.status(404).sendFile(path.join(__dirname, "pages", "notFound.html"));
});

// Starting the server and listening on port 3000
app.listen(3000, function () {
  console.log("Server is listening on port 3000.");
});
