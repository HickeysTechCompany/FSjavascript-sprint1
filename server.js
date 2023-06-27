const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Add this line to parse JSON data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'pages' directory
app.use(express.static(path.join(__dirname, "pages")));

// Serve static files from the 'styles' directory
app.use("/styles", express.static(path.join(__dirname, "styles")));

// Serve static files from the 'scripts' directory
app.use("/pagescripts", express.static(path.join(__dirname, "scripts")));

// Route for the home page
app.get("/", (req, res) => {
  // Debug log
  console.log("index.html page was requested.");

  // Send index.html file
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route for the signup page
app.get("/signup", (req, res) => {
  // Debug log
  console.log("signup.html page was requested.");

  // Send signup.html file
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

// Handle signup form submission
app.post("/signup", (req, res) => {
  const { username, password, cell, email } = req.body;

  // Store user data in JSON file
  const newUser = {
    username,
    password,
    cell,
    email
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

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
