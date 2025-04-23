
// Helper function to get backend base URL
const BASE_URL = "http://localhost:5000";

// ----------- Registration -----------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      const msgEl = document.getElementById("registerMsg");
      if (res.ok) {
        msgEl.textContent = "Registration successful!";
        // Optionally, redirect to login page:
        // window.location.href = "login.html";
      } else {
        msgEl.textContent = result.msg || "Registration failed.";
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// ----------- Login -----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      const msgEl = document.getElementById("loginMsg");
      if (res.ok) {
        msgEl.textContent = "Login successful!";
        // Save the token in localStorage for later use
        localStorage.setItem("token", result.token);
        // Redirect to dashboard after login
        if(data.email=="admin1@example.com"){
          window.location.href = "admin.html";
        }
        else{
          window.location.href = "index.html";
        }
       
      } else {
        msgEl.textContent = result.msg || "Login failed.";
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// ----------- Dashboard (Protected Route) -----------
const dashboardContent = document.getElementById("dashboardContent");
if (dashboardContent) {
  // Get token from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    dashboardContent.innerHTML = "<p>You are not logged in. Please <a href='login.html'>login</a>.</p>";
  } else {
    // Fetch data from a protected route
    fetch(`${BASE_URL}/api/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          dashboardContent.innerHTML = `<p>${data.msg}</p>
            <p>User ID: ${data.user.userId}</p>
            <p>Role: ${data.user.role}</p>`;
        } else {
          dashboardContent.innerHTML = "<p>Access denied. Invalid token.</p>";
        }
      })
      .catch((error) => {
        console.error(error);
        dashboardContent.innerHTML = "<p>Error loading dashboard data.</p>";
      });
  }
}

