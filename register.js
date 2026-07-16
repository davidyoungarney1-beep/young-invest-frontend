const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("https://young-invest-backend.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration Successful!");
            form.reset();
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration failed.");
        }

    } catch (error) {
        console.error("Registration Error:", error);
        alert("Unable to connect to the server.");
    }
});
