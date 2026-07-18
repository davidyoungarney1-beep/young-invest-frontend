// Check if user is logged in
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Show user information
document.getElementById("userName").textContent = user.fullName;
document.getElementById("profileName").textContent = user.fullName;
document.getElementById("profileEmail").textContent = user.email;
document.getElementById("profilePhone").textContent = user.phone;

// Logout
document.getElementById("logout").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("user");

        window.location.href = "login.html";

    }

});
