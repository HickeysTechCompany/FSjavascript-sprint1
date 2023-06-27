const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send an AJAX request to the server and handle the response
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Redirect to the home page
        window.location.href = "/home";
      } else {
        // Handle login error
        console.error("Login failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error during login: " + error);
    });
});
