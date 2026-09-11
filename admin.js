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

        if (!response.ok || !Array.isArray(users)) {
            throw new Error(users.message || "Unable to load users.");
        }

        const tbody = document.querySelector("#userTable tbody");

        tbody.innerHTML = "";

        document.getElementById("totalUsers").textContent = users.length;

        users.forEach(u => {

            tbody.innerHTML += `
            <tr>

                <td>${u.fullName || "N/A"}</td>

                <td>${u.email || "N/A"}</td>

                <td>₦${Number(u.walletBalance || 0).toLocaleString()}</td>

                <td>₦${Number(u.totalInvestment || 0).toLocaleString()}</td>

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

        console.error("Load Users Error:", error);

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

        if (!response.ok || !Array.isArray(deposits)) {
            throw new Error(
                deposits.message || "Unable to load deposits."
            );
        }

        const tbody = document.querySelector("#depositTable tbody");

        tbody.innerHTML = "";

        // ================= COUNT DEPOSITS FIRST =================

        const pending = deposits.filter(
            dep => dep.status === "Pending"
        ).length;

        const approved = deposits.filter(
            dep => dep.status === "Approved"
        ).length;


        // ================= UPDATE COUNTERS =================

        document.getElementById("pendingCount").textContent = pending;

        document.getElementById("approvedCount").textContent = approved;


        // ================= SHOW DEPOSITS =================

        if (deposits.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;padding:25px;">
                        No deposits available.
                    </td>
                </tr>
            `;

            return;

        }


        deposits.forEach(dep => {

            // ================= SAFE USER HANDLING =================
            // If the user was deleted, dep.user can be null.

            const userName = dep.user
                ? (dep.user.fullName || "Unknown User")
                : "Deleted User";

            const userEmail = dep.user
                ? (dep.user.email || "N/A")
                : "N/A";


            tbody.innerHTML += `
            <tr>

                <td>${userName}</td>

                <td>${userEmail}</td>

                <td>
                    ₦${Number(dep.amount || 0).toLocaleString()}
                </td>

                <td>

                ${
                    dep.receipt
                    ? `<a href="${dep.receipt}" target="_blank">👁 View</a>`
                    : "No Receipt"
                }

                </td>

                <td>${dep.status || "Unknown"}</td>

                <td>

                    ${
                        dep.status === "Pending"
                        ? `
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
                        `
                        : `
                            <span>
                                ${dep.status || "Processed"}
                            </span>
                        `
                    }

                </td>

            </tr>
            `;

        });

    } catch (error) {

        console.error("Load Deposits Error:", error);

        // Keep counters visible even if a rendering error happens.

        document.getElementById("pendingCount").textContent = "0";

        document.getElementById("approvedCount").textContent = "0";

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

        if (!response.ok || !Array.isArray(withdrawals)) {
            throw new Error(
                withdrawals.message || "Unable to load withdrawals."
            );
        }

        const tbody = document.querySelector("#withdrawTable tbody");

        tbody.innerHTML = "";

        if (withdrawals.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;padding:25px;">
                        No withdrawal requests available.
                    </td>
                </tr>
            `;

            return;

        }

        withdrawals.forEach(item => {

            const userName = item.user
                ? (item.user.fullName || "Unknown User")
                : "Deleted User";


            tbody.innerHTML += `

            <tr>

                <td>${userName}</td>

                <td>${item.bankName || "N/A"}</td>

                <td>${item.accountName || "N/A"}</td>

                <td>${item.accountNumber || "N/A"}</td>

                <td>
                    ₦${Number(item.amount || 0).toLocaleString()}
                </td>

                <td>${item.status || "Unknown"}</td>

                <td>

                    ${
                        item.status === "Pending"
                        ? `

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

                        `
                        : `
                            <span>
                                ${item.status || "Processed"}
                            </span>
                        `
                    }

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error("Load Withdrawals Error:", error);

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

                if (!response.ok) {

                    throw new Error(
                        data.message || "Unable to approve deposit."
                    );

                }

                showSuccess(
                    "Approved!",
                    data.message,
                    () => {

                        loadUsers();

                        loadDeposits();

                    }
                );

            } catch (error) {

                console.error("Approve Deposit Error:", error);

                showError(
                    "Error",
                    error.message || "Something went wrong."
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

                if (!response.ok) {

                    throw new Error(
                        data.message || "Unable to reject deposit."
                    );

                }

                showSuccess(
                    "Rejected",
                    data.message,
                    () => {

                        loadDeposits();

                    }
                );

            } catch (error) {

                console.error("Reject Deposit Error:", error);

                showError(
                    "Error",
                    error.message || "Something went wrong."
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

                const data = await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message || "Unable to approve withdrawal."
                    );

                }

                showSuccess(
                    "Approved!",
                    data.message,
                    () => {

                        loadWithdrawals();

                    }
                );

            } catch (error) {

                console.error(
                    "Approve Withdrawal Error:",
                    error
                );

                showError(
                    "Error",
                    error.message || "Something went wrong."
                );

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

                if (!response.ok) {

                    throw new Error(
                        data.message || "Unable to reject withdrawal."
                    );

                }

                showSuccess(
                    "Rejected",
                    data.message,
                    () => {

                        loadWithdrawals();

                    }
                );

            } catch (error) {

                console.error(
                    "Reject Withdrawal Error:",
                    error
                );

                showError(
                    "Error",
                    error.message || "Something went wrong."
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

                console.error(
                    "Reset Password Error:",
                    error
                );

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


// ================= MAKE FUNCTIONS AVAILABLE =================

window.approveDeposit = approveDeposit;

window.rejectDeposit = rejectDeposit;

window.approveWithdrawal = approveWithdrawal;

window.rejectWithdrawal = rejectWithdrawal;

window.resetPassword = resetPassword;
