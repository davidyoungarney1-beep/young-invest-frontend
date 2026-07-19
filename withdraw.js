// ================= LOAD USER =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// ================= LOAD BALANCE =================

async function loadBalance() {

    try {

        const response = await fetch(
            `https://young-invest-backend.onrender.com/api/dashboard/${user._id}`
        );

        const data = await response.json();

        document.getElementById("withdrawableBalance").innerHTML =
            "₦" + Number(data.withdrawableBalance).toLocaleString();

    } catch (error) {

        console.log(error);

    }

}

loadBalance();

// ================= SUBMIT WITHDRAWAL =================

async function submitWithdrawal() {

    const bankName = document.getElementById("bankName").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const accountName = document.getElementById("accountName").value;
    const amount = document.getElementById("amount").value;

    if (!bankName || !accountNumber || !accountName || !amount) {
        return alert("Please fill in all fields.");
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

                    userId: user._id,
                    bankName,
                    accountNumber,
                    accountName,
                    amount

                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href = "dashboard.html";

        }

    } catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

}
