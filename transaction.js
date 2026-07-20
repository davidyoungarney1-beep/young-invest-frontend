// ================= LOAD USER =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// ================= LOAD TRANSACTIONS =================

async function loadTransactions() {

    try {

        const response = await fetch(
            `https://young-invest-backend.onrender.com/api/transaction/${user._id || user.id}`
        );

        const transactions = await response.json();

        const container = document.getElementById("transactions");

        container.innerHTML = "";

        if (transactions.length === 0) {

            container.innerHTML = `
                <div class="transaction">
                    <center>
                        <h3>No Transactions Yet</h3>
                        <p>Your transaction history will appear here.</p>
                    </center>
                </div>
            `;

            return;
        }

        transactions.forEach(item => {

            container.innerHTML += `

            <div class="transaction">

                <div class="top">

                    <span class="type">${item.type}</span>

                    <span class="amount">₦${Number(item.amount).toLocaleString()}</span>

                </div>

                <span class="status ${item.status}">
                    ${item.status}
                </span>

                <div class="date">
                    ${new Date(item.date).toLocaleString()}
                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        alert("Unable to load transaction history.");

    }

}

loadTransactions();
