const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const { searchToken } = require("./cliFunctions/token.js");
const logMessage = require("./log.js"); // Import logMessage function
const chalk = require("chalk"); // Import chalk module
const DEBUG = true;
const { encodeCRC } = require("./cliFunctions/token.js");

// Generate a token
function generateToken(username) {
  // Implement the logic to generate a token here
  // ...
}

// Creating an instance of express
const app = express();

// Middleware
app.use(bodyParser.json()); // Add this line to parse JSON data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'pages' directory
app.use(express.static(path.join(__dirname, "pages")));

// Serve static files from the 'styles' directory
app.use("/styles", express.static(path.join(__dirname, "styles")));


// Middleware to serve static files from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "pages", "images")));


// Middleware to serve static files from the 'scripts' directory

app.use("/pagescripts", express.static(path.join(__dirname, "pagescripts")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Route for the home page
app.get("/", (req, res) => {
  // Debug log
  if (DEBUG) {
    console.log(chalk.inverse("index.html page was requested."));
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
      res.status(401).json({ success: false, message: "Wrong password" });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    console.error(chalk.red(error));
    logMessage(`Error: ${error}`);
    res.status(401).json({ success: false, message: "User not found" });
  }
});

// Route for the signup page
app.get("/signup", (req, res) => {
  // Debug log
  if (DEBUG) {
    console.log(chalk.inverse("signup.html page was requested."));
    logMessage("signup.html page was requested.");
  }

  // Send signup.html file
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

// Handle signup form submission
app.post("/signup", (req, res) => {
  const { username, password, cell, email } = req.body;

  // Generate a token using the generateToken function
  const token = generateToken(username);

  // Store user data in JSON file
  const newUser = {
    username,
    password,
    cell,
    email,
    token
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

    fs.writeFile(
      "./json/users.json",
      JSON.stringify(users),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }

        console.log("User added successfully");
        res.json({ success: true });
      }
    );
  });
});

// Route for the home page
app.get("/home", function (req, res) {
  // Debug log
  if (DEBUG) {
    console.log(chalk.inverse("home.html page was requested."));
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
