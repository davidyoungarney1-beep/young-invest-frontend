window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Disable button while logging in
        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span class="loader"></span>
            Logging In...
        `;

        try {

            // Send login request to existing backend
            const response = await fetch(
                "https://young-invest-backend.onrender.com/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            // Restore button
            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";

            // Successful login
            if (response.ok) {

                // Save user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                showSuccess(
                    "Login Successful",
                    "Welcome back to Evergreen Investments.",
                    () => {

                        // Admin users
                        if (data.user.role === "admin") {

                            window.location.href = "admin.html";

                        } else {

                            // Normal users
                            // New Evergreen Investments Home page
                            window.location.href = "home.html";

                        }

                    }
                );

            } else {

                // Login failed
                showError(
                    "Login Failed",
                    data.message || "Invalid email or password."
                );

            }

        } catch (error) {

            console.log("Login Error:", error);

            // Restore button
            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";

            // Connection error
            showError(
                "Connection Error",
                "Unable to connect to the server."
            );

        }

    });

});
