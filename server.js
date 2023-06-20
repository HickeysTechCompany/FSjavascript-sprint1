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

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req, res) => {
  // Process login form data
  const { username, password } = req.body;

  // Authenticate user
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

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      // Authentication successful, redirect to home page
      res.redirect("/home");
    } else {
      // Authentication failed, display an error message
      res.send("Login failed. Please check your username and password.");
    }
  });
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
