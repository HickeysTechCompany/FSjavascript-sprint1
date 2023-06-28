const signupForm = document.getElementById("signupForm");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const cell = document.getElementById("cell").value;
  const email = document.getElementById("email").value;

  // Generate a unique token using the encodeCRC function
  const token = encodeCRC(username + password + cell + email);

  // Perform form validation
  // Send an AJAX request to the server with the user data and token
  // Handle the response and redirect to the login page on success

  // Example AJAX request using fetch API
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, cell, email, token }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Redirect to the login page
        window.location.href = "/login";
      } else {
        // Handle registration error
        console.error("Registration failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error during registration: " + error);
    });

  // Call generateToken function with the username
  function generateToken() {
    // Define the length of the token
    const tokenLength = 16;
  
    // Generate random bytes
    const randomBytes = crypto.randomBytes(tokenLength);
  
    // Convert the random bytes to a hexadecimal string
    const token = randomBytes.toString("hex");
  
    return token;
  }
  

// Store user data in JSON file
const newUser = {
  username,
  password,
  cell,
  email,
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

module.exports = {
  generateToken,
};
