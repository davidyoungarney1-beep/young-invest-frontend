// =========================================================
// EVERGREEN INVESTMENTS
// DASHBOARD.JS
// =========================================================


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

const userName = document.getElementById("userName");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");

if (userName) {
    userName.textContent = user.fullName || "User";
}

if (profileName) {
    profileName.textContent = user.fullName || "User";
}

if (profileEmail) {
    profileEmail.textContent = user.email || "—";
}

if (profilePhone) {
    profilePhone.textContent = user.phone || "—";
}


// ================= WALLET =================

const walletBalance = document.getElementById("walletBalance");
const totalInvestment = document.getElementById("totalInvestment");
const totalEarnings = document.getElementById("totalEarnings");
const withdrawable = document.getElementById("withdrawable");

if (walletBalance) {
    walletBalance.textContent =
        "₦" + Number(user.walletBalance || 0).toLocaleString();
}

if (totalInvestment) {
    totalInvestment.textContent =
        "₦" + Number(user.totalInvestment || 0).toLocaleString();
}

if (totalEarnings) {
    totalEarnings.textContent =
        "₦" + Number(user.totalEarnings || 0).toLocaleString();
}

if (withdrawable) {
    withdrawable.textContent =
        "₦" + Number(user.withdrawableBalance || 0).toLocaleString();
}


// ================= LOGOUT =================

const logoutButton = document.getElementById("logout");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        showConfirm(
            "Log Out?",
            "Are you sure you want to log out of your Evergreen account?",

            function () {

                localStorage.removeItem("user");

                showSuccess(
                    "Logged Out",
                    "You have been logged out successfully.",

                    function () {

                        window.location.href = "login.html";

                    }
                );

            }
        );

    });

}
