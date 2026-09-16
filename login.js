// =========================================================
// EVERGREEN INVESTMENTS
// LOGIN.JS
// =========================================================

window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    if (!form || !loginBtn) {
        console.error("Login form or login button not found.");
        return;
    }


    // =====================================================
    // POPUP HELPER
    // =====================================================

    function loginMessage(type, title, message, callback = null) {

        if (type === "success" && typeof showSuccess === "function") {

            showSuccess(title, message, callback);
            return;

        }

        if (type === "error" && typeof showError === "function") {

            showError(title, message, callback);
            return;

        }

        // Fallback if popup.js fails to load
        alert(title + "\n\n" + message);

        if (callback) {
            callback();
        }

    }


    // =====================================================
    // LOGIN
    // =====================================================

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        if (!email || !password) {

            loginMessage(
                "error",
                "Missing Details",
                "Please enter your email and password."
            );

            return;

        }


        // =================================================
        // LOADING
        // =================================================

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span class="loader"></span>
            Logging in...
        `;


        try {

            console.log("Sending login request...");


            // =============================================
            // BACKEND LOGIN
            // =============================================

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


            console.log(
                "Login response status:",
                response.status
            );


            // =============================================
            // READ RESPONSE SAFELY
            // =============================================

            const responseText =
                await response.text();

            console.log(
                "Login response:",
                responseText
            );


            let data = {};

            try {

                data =
                    JSON.parse(responseText);

            } catch (jsonError) {

                console.error(
                    "Server did not return JSON:",
                    responseText
                );

                throw new Error(
                    "The server returned an invalid response."
                );

            }


            // =============================================
            // RESTORE BUTTON
            // =============================================

            loginBtn.disabled = false;

            loginBtn.innerHTML =
                "Login to Evergreen";


            // =============================================
            // SUCCESS
            // =============================================

            if (response.ok && data.user) {

                console.log(
                    "Login successful:",
                    data.user
                );


                // Save user
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                loginMessage(
                    "success",
                    "Login Successful",
                    "Welcome back to Evergreen Investments.",
                    () => {

                        if (data.user.role === "admin") {

                            window.location.href =
                                "admin.html";

                        } else {

                            window.location.href =
                                "home.html";

                        }

                    }
                );


                return;

            }


            // =============================================
            // LOGIN FAILED
            // =============================================

            loginMessage(
                "error",
                "Login Failed",
                data.message ||
                "Invalid email or password."
            );

        }


        // =================================================
        // ERROR
        // =================================================

        catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            loginBtn.disabled = false;

            loginBtn.innerHTML =
                "Login to Evergreen";


            loginMessage(
                "error",
                "Login Error",
                error.message ||
                "Unable to connect to the server."
            );

        }

    });

});
