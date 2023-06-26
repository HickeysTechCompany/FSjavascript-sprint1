// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");
const crc32 = require("crc-32");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/pages/signup.html");
});

app.post("/signup", (req, res) => {
  const { username, password, cell, email } = req.body;

  // Convert input data to a Buffer object
  const inputData = Buffer.from(username + password + cell + email, "utf8");

  // Generate unique token using CRC32
  const token = crc32.buf(inputData).toString(16);

  // Store user data in JSON file
  const newUser = {
    username,
    password,
    email,
    cell,
    token,
  };

  fs.readFile("./json/users.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error(err);
      return res.sendStatus(500);
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.sendStatus(500);
      }
    }

    users.push(newUser);

    fs.writeFile("./json/users.json", JSON.stringify(users), "utf8", (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      console.log("User added successfully");
      res.redirect("/login");
    });
  });
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
