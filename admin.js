console.log("Admin JS Loaded");
alert("admin.js started");
// ================= ADMIN CHECK =================

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

if (user.role !== "admin") {

    showError(
        "Access Denied",
        "Only administrators can access this page.",
        () => {
            window.location.href = "dashboard.html";
        }
    );

    throw new Error("Access denied");

}

// ================= LOAD USERS =================

async function loadUsers() {

    try {

        const response = await fetch(
            "https://young-invest-backend.onrender.com/api/admin/users",
            {
                headers: {
                    adminemail: user.email
                }
            }
        );

        const users = await response.json();

        const tbody = document.querySelector("#userTable tbody");

        tbody.innerHTML = "";

        document.getElementById("totalUsers").textContent = users.length;

        users.forEach(u => {

            tbody.innerHTML += `
            <tr>
                <td>${u.fullName}</td>
                <td>${u.email}</td>
                <td>₦${Number(u.walletBalance).toLocaleString()}</td>
                <td>₦${Number(u.totalInvestment).toLocaleString()}</td>

                <td>
                    <button
                    class="reset"
                    onclick="resetPassword('${u._id}')">

                    🔑 Reset Password

                    </button>
                </td>

            </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        showError(
            "Error",
            "Unable to load users."
        );

    }

}

// ================= LOAD DEPOSITS =================

async function loadDeposits() {

    try {

        const response = await fetch(
            "https://young-invest-backend.onrender.com/api/admin/deposits",
            {
                headers: {
                    adminemail: user.email
                }
            }
        );

        const deposits = await response.json();

        const tbody = document.querySelector("#depositTable tbody");

        tbody.innerHTML = "";

        let pending = 0;
        let approved = 0;

        deposits.forEach(dep => {

            if (dep.status === "Pending") pending++;

            if (dep.status === "Approved") approved++;

            tbody.innerHTML += `
            <tr>

                <td>${dep.user.fullName}</td>

                <td>${dep.user.email}</td>

                <td>₦${Number(dep.amount).toLocaleString()}</td>

                <td>

                ${
                    dep.receipt
                    ? `<a href="${dep.receipt}" target="_blank">👁 View</a>`
                    : "No Receipt"
                }

                </td>

                <td>${dep.status}</td>

                <td>

                    <button
                    class="approve"
                    onclick="approveDeposit('${dep._id}')">

                    Approve

                    </button>

                    <button
                    class="reject"
                    onclick="rejectDeposit('${dep._id}')">

                    Reject

                    </button>

                </td>

            </tr>
            `;

        });

        document.getElementById("pendingCount").textContent = pending;

        document.getElementById("approvedCount").textContent = approved;

    } catch (error) {

        console.error(error);

        showError(
            "Error",
            "Unable to load deposits."
        );

    }

}

// ================= LOAD WITHDRAWALS =================

async function loadWithdrawals() {

    try {

        const response = await fetch(
            "https://young-invest-backend.onrender.com/api/admin/withdrawals",
            {
                headers: {
                    adminemail: user.email
                }
            }
        );

        const withdrawals = await response.json();

        const tbody = document.querySelector("#withdrawTable tbody");

        tbody.innerHTML = "";

        withdrawals.forEach(item => {

            tbody.innerHTML += `

            <tr>

                <td>${item.user.fullName}</td>

                <td>${item.bankName}</td>

                <td>${item.accountName}</td>

                <td>${item.accountNumber}</td>

                <td>₦${Number(item.amount).toLocaleString()}</td>

                <td>${item.status}</td>

                <td>

                    <button
                    class="approve"
                    onclick="approveWithdrawal('${item._id}')">

                    Approve

                    </button>

                    <button
                    class="reject"
                    onclick="rejectWithdrawal('${item._id}')">

                    Reject

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        showError(
            "Error",
            "Unable to load withdrawals."
        );

    }

}
// ================= APPROVE DEPOSIT =================

async function approveDeposit(id) {

    showConfirm(
        "Approve Deposit",
        "Are you sure you want to approve this deposit?",
        async () => {

            try {

                const response = await fetch(
                    `https://young-invest-backend.onrender.com/api/admin/approve/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            adminemail: user.email
                        }
                    }
                );

                const data = await response.json();

                showSuccess(
                    "Approved!",
                    data.message,
                    () => {
                        loadUsers();
                        loadDeposits();
                    }
                );

            } catch (error) {

                console.error(error);

                showError(
                    "Error",
                    "Something went wrong."
                );

            }

        }
    );

}

// ================= REJECT DEPOSIT =================

async function rejectDeposit(id) {

    showConfirm(
        "Reject Deposit",
        "Are you sure you want to reject this deposit?",
        async () => {

            try {

                const response = await fetch(
                    `https://young-invest-backend.onrender.com/api/admin/reject/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            adminemail: user.email
                        }
                    }
                );

                const data = await response.json();

                showSuccess(
                    "Rejected",
                    data.message,
                    () => {
                        loadDeposits();
                    }
                );

            } catch (error) {

                console.error(error);

                showError(
                    "Error",
                    "Something went wrong."
                );

            }

        }
    );

}

// ================= APPROVE WITHDRAWAL =================
async function approveWithdrawal(id) {

    showConfirm(
        "Approve Withdrawal",
        "Approve this withdrawal request?",
        async () => {

            alert("YES button clicked");

            try {

                const response = await fetch(
                    `https://young-invest-backend.onrender.com/api/admin/withdraw/approve/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            adminemail: user.email
                        }
                    }
                );

                alert("Response: " + response.status);

                const data = await response.json();

                alert(data.message);

                loadWithdrawals();

            } catch (error) {

                alert(error.message);

            }

        }
    );

}

// ================= REJECT WITHDRAWAL =================

async function rejectWithdrawal(id) {

    showConfirm(
        "Reject Withdrawal",
        "Reject this withdrawal request?",
        async () => {

            try {

                const response = await fetch(
                    `https://young-invest-backend.onrender.com/api/admin/withdraw/reject/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            adminemail: user.email
                        }
                    }
                );

                const data = await response.json();

                showSuccess(
                    "Rejected",
                    data.message,
                    () => {
                        loadWithdrawals();
                    }
                );

            } catch (error) {

                console.error(error);

                showError(
                    "Error",
                    "Something went wrong."
                );

            }

        }
    );

}
// ================= RESET PASSWORD =================

async function resetPassword(id) {

    showPasswordPrompt(
        "Reset User Password",
        async (newPassword) => {

            try {

                const response = await fetch(
                    `https://young-invest-backend.onrender.com/api/admin/reset-password/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            adminemail: user.email
                        },
                        body: JSON.stringify({
                            newPassword
                        })
                    }
                );

                const data = await response.json();

                if (response.ok) {

                    showSuccess(
                        "Password Reset",
                        data.message
                    );

                } else {

                    showError(
                        "Reset Failed",
                        data.message
                    );

                }

            } catch (error) {

                console.error(error);

                showError(
                    "Error",
                    "Unable to reset password."
                );

            }

        }
    );

}

// ================= START =================

window.addEventListener("DOMContentLoaded", () => {

    loadUsers();

    loadDeposits();

    loadWithdrawals();

});
window.approveDeposit = approveDeposit;
window.rejectDeposit = rejectDeposit;
window.approveWithdrawal = approveWithdrawal;
window.rejectWithdrawal = rejectWithdrawal;
window.resetPassword = resetPassword;
