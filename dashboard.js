// ================= CHECK LOGIN =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    showError(
        "Login Required",
        "Please login first.",
        () => {
            window.location.href = "login.html";
        }
    );

    throw new Error("No user logged in");

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
document.getElementById("logout").onclick = function () {

    showConfirm(
        "Logout",
        "Are you sure you want to logout?",
        () => {

            localStorage.removeItem("user");

            showSuccess(
                "Logged Out",
                "You have been logged out successfully.",
                () => {
                    window.location.href = "login.html";
                }
            );

        }
    );

};

