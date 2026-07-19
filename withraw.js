// ================= LOAD USER =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// ================= LOAD BALANCE =================

async function loadBalance() {

    try {

        const response = await fetch(
            `https://young-invest-backend.onrender.com/api/dashboard/${user._id || user.id}`
        );

        const data = await response.json();

        document.getElementById("withdrawableBalance").innerHTML =
            "₦" + Number(data.withdrawableBalance).toLocaleString();

    } catch (error) {

        console.log(error);

    }

}

loadBalance();

// ================= REQUEST WITHDRAWAL =================

async function submitWithdrawal() {

    const bankName = document.getElementById("bankName").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const accountName = document.getElementById("accountName").value;
    const amount = document.getElementById("amount").value;

    if (!bankName || !accountNumber || !accountName || !amount) {

        alert("Please fill in all fields.");

        return;

    }

    try {

        const response = await fetch(
            "https://young-invest-backend.onrender.com/api/withdrawal/request",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    userId:user._id || user.id
                    bankName,
                    accountName,
                    accountNumber,
                    amount

                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert(
`✅ Withdrawal Request Received

Your withdrawal request has been received successfully.

Please allow up to 6 hours for processing.

You can monitor your withdrawal status in Transaction History.

Thank you for choosing Crest Wealth Investment.`
            );

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Something went wrong. Please try again.");

    }

}
