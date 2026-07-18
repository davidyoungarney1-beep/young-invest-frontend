// ================= ADMIN CHECK =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

if (user.role !== "admin") {
    alert("Access Denied!");
    window.location.href = "dashboard.html";
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
            </tr>
            `;

        });

    } catch (error) {

        console.error(error);

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
        <button class="approve" onclick="approveDeposit('${dep._id}')">
            Approve
        </button>

        <button class="reject" onclick="rejectDeposit('${dep._id}')">
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

    }

}

// ================= APPROVE DEPOSIT =================

async function approveDeposit(id) {

    if (!confirm("Approve this deposit?")) return;

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

        alert(data.message);

        loadUsers();
        loadDeposits();

    } catch (error) {

        console.error(error);
        alert("Something went wrong.");

    }

}

// ================= REJECT DEPOSIT =================

async function rejectDeposit(id) {

    if (!confirm("Reject this deposit?")) return;

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

        alert(data.message);

        loadDeposits();

    } catch (error) {

        console.error(error);
        alert("Something went wrong.");

    }

}

// ================= START =================

loadUsers();
loadDeposits();
