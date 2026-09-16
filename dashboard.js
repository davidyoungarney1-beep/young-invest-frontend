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

document.getElementById("userName").textContent =
    user.fullName || "User";

document.getElementById("profileName").textContent =
    user.fullName || "User";

document.getElementById("profileEmail").textContent =
    user.email || "—";

document.getElementById("profilePhone").textContent =
    user.phone || "—";


// ================= WALLET =================

document.getElementById("walletBalance").textContent =
    "₦" + Number(user.walletBalance || 0).toLocaleString();

document.getElementById("totalInvestment").textContent =
    "₦" + Number(user.totalInvestment || 0).toLocaleString();

document.getElementById("totalEarnings").textContent =
    "₦" + Number(user.totalEarnings || 0).toLocaleString();

document.getElementById("withdrawable").textContent =
    "₦" + Number(user.withdrawableBalance || 0).toLocaleString();


// ================= LOGOUT =================

const logoutButton =
    document.getElementById("logout");


if (logoutButton) {

    logoutButton.onclick = function (event) {

        event.preventDefault();

        showConfirm(
            "Log Out?",
            "Are you sure you want to log out of your Evergreen account?",
            () => {

                // Remove logged-in user
                localStorage.removeItem("user");

                // Show success popup
                showSuccess(
                    "Logged Out",
                    "You have been logged out successfully.",
                    () => {

                        window.location.href =
                            "login.html";

                    }
                );

            }
        );

    };

}
