window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!email || !password) {

            showError(
                "Missing Information",
                "Please enter your email and password."
            );

            return;
        }

        loginBtn.disabled = true;

        loginBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Logging In...';

        try {

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

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Invalid email or password."
                );

            }

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            showSuccess(
                "Login Successful",
                "Welcome back to Evergreen Investments.",
                () => {

                    if (data.user.role === "admin") {

                        window.location.href = "admin.html";

                    } else {

                        window.location.href = "home.html";

                    }

                }
            );

        } catch (error) {

            console.error("Login Error:", error);

            showError(
                "Login Failed",
                error.message ||
                "Unable to connect to the server."
            );

        } finally {

            loginBtn.disabled = false;

            loginBtn.innerHTML =
                "Login to Evergreen";

        }

    });

});
