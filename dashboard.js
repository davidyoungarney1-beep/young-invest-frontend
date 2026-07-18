// ================= CHECK LOGIN =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ================= USER DETAILS =================

document.getElementById("userName").textContent =
user.fullName;

document.getElementById("profileName").textContent =
user.fullName;

document.getElementById("profileEmail").textContent =
user.email;

document.getElementById("profilePhone").textContent =
user.phone;

// ================= WALLET =================

document.getElementById("walletBalance").textContent =
"₦" + Number(user.walletBalance).toLocaleString();

document.getElementById("totalInvestment").textContent =
"₦" + Number(user.totalInvestment).toLocaleString();

document.getElementById("totalEarnings").textContent =
"₦" + Number(user.totalEarnings).toLocaleString();

document.getElementById("withdrawable").textContent =
"₦" + Number(user.withdrawableBalance || 0).toLocaleString();

// ================= LOGOUT =================

document.getElementById("logout").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("user");

        window.location.href = "login.html";

    }

});
