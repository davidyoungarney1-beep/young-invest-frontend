window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        loginBtn.disabled = true;
        loginBtn.innerHTML = "Connecting...";

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

            const text = await response.text();

            console.log("STATUS:", response.status);
            console.log("RESPONSE:", text);

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                alert(
                    "Server response:\n\n" +
                    text
                );

                loginBtn.disabled = false;
                loginBtn.innerHTML =
                    "Login to Evergreen";

                return;
            }

            if (!response.ok) {

                alert(
                    "Login failed:\n\n" +
                    (data.message || "Unknown error")
                );

                loginBtn.disabled = false;
                loginBtn.innerHTML =
                    "Login to Evergreen";

                return;
            }

            if (!data.user) {

                alert(
                    "Login response did not contain a user."
                );

                loginBtn.disabled = false;
                loginBtn.innerHTML =
                    "Login to Evergreen";

                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("LOGIN SUCCESSFUL");

            window.location.href = "home.html";

        } catch (error) {

            console.error(error);

            alert(
                "Connection error:\n\n" +
                error.message
            );

            loginBtn.disabled = false;
            loginBtn.innerHTML =
                "Login to Evergreen";
        }

    });

});
