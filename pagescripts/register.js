const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const cell = document.getElementById("cell").value;
  const email = document.getElementById("email").value;

  // Send an AJAX request to the server with the user data
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, cell, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Redirect to the login page
        window.location.href = "/";
      } else {
        // Handle registration error
        console.error("Registration failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error during registration: " + error);
    });
});