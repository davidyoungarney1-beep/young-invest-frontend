window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");
    const registerBtn = document.getElementById("registerBtn");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const referralCode = document.getElementById("referralCode").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            showError(
                "Password Mismatch",
                "The passwords you entered do not match."
            );

            return;

        }

        registerBtn.disabled = true;

        registerBtn.innerHTML = `
        <span class="loader"></span>
        Creating Account...
        `;

        try {

            const response = await fetch(
                "https://young-invest-backend.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        phone,
                        password,
                        referralCode
                    })
                }
            );

            const data = await response.json();

            registerBtn.disabled = false;
            registerBtn.innerHTML = "Create Account";

            if (response.ok) {

                form.reset();

                showSuccess(
                    "Registration Successful",
                    "Your investment account has been created successfully.",
                    () => {
                        window.location.href = "login.html";
                    }
                );

            } else {

                showError(
                    "Registration Failed",
                    data.message || "Unable to create your account."
                );

            }

        } catch (error) {

            console.log(error);

            registerBtn.disabled = false;
            registerBtn.innerHTML = "Create Account";

            showError(
                "Connection Error",
                "Unable to connect to the server."
            );

        }

    });

    // Auto Referral

    const params = new URLSearchParams(window.location.search);

    const ref = params.get("ref");

    if (ref) {

        const referralInput = document.getElementById("referralCode");

        referralInput.value = ref.toUpperCase();

        referralInput.readOnly = true;

    }

});
