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

        const balance = Number(data.withdrawableBalance);

        document.getElementById("withdrawableBalance").textContent =
            "₦" + (
                Number.isFinite(balance) ? balance : 0
            ).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

    } catch (error) {

        console.log(error);

        document.getElementById("withdrawableBalance").textContent =
            "₦0.00";

    }

}

loadBalance();


// ================= POPUP =================

function showWithdrawalPopup() {

    const popup = document.createElement("div");

    popup.id = "withdrawPopup";

    popup.innerHTML = `

        <div class="withdraw-popup-overlay">

            <div class="withdraw-popup">

                <div class="withdraw-popup-icon">
                    <i class="fa-solid fa-arrow-up-right-dots"></i>
                </div>

                <h2>Confirm Withdrawal</h2>

                <p>
                    Please make sure your bank details and withdrawal amount
                    are correct before continuing.
                </p>

                <div class="withdraw-popup-buttons">

                    <button
                        type="button"
                        class="withdraw-cancel"
                        id="withdrawCancel">
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="withdraw-confirm"
                        id="withdrawConfirm">
                        Confirm Withdrawal
                    </button>

                </div>

            </div>

        </div>

    `;

    document.body.appendChild(popup);


    // ================= POPUP STYLE =================

    const style = document.createElement("style");

    style.id = "withdrawPopupStyle";

    style.textContent = `

        .withdraw-popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(4, 25, 18, .58);
            backdrop-filter: blur(7px);
            -webkit-backdrop-filter: blur(7px);

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 20px;

            z-index: 9999;

            animation: popupFade .2s ease;
        }

        .withdraw-popup {
            width: 100%;
            max-width: 390px;

            background: #ffffff;

            border-radius: 24px;

            padding: 28px 22px 22px;

            text-align: center;

            box-shadow:
                0 25px 70px rgba(0,0,0,.22);

            animation: popupScale .25s ease;
        }

        .withdraw-popup-icon {
            width: 58px;
            height: 58px;

            margin: 0 auto 15px;

            border-radius: 18px;

            background: #e8f6f0;

            color: #0f6b4d;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 21px;
        }

        .withdraw-popup h2 {
            margin: 0;

            font-family: "Manrope", sans-serif;

            font-size: 19px;

            color: #10251d;
        }

        .withdraw-popup p {
            margin: 10px 5px 22px;

            font-family: "DM Sans", sans-serif;

            font-size: 12px;

            line-height: 1.6;

            color: #74827c;
        }

        .withdraw-popup-buttons {
            display: flex;
            gap: 10px;
        }

        .withdraw-popup-buttons button {
            flex: 1;

            height: 46px;

            border: 0;

            border-radius: 12px;

            font-family: "Manrope", sans-serif;

            font-size: 11px;

            font-weight: 800;

            cursor: pointer;
        }

        .withdraw-cancel {
            background: #f1f5f3;

            color: #53635c;
        }

        .withdraw-confirm {
            background: #0f6b4d;

            color: white;

            box-shadow:
                0 7px 18px rgba(15,107,77,.18);
        }

        .withdraw-popup-buttons button:active {
            transform: scale(.97);
        }

        @keyframes popupFade {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }

        @keyframes popupScale {

            from {
                opacity: 0;
                transform: scale(.92);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }

        }

    `;

    document.head.appendChild(style);


    // ================= CANCEL =================

    document.getElementById("withdrawCancel").onclick = function () {

        popup.remove();
        style.remove();

    };


    // ================= CONFIRM =================

    document.getElementById("withdrawConfirm").onclick = function () {

        popup.remove();
        style.remove();

        processWithdrawal();

    };

}


// ================= BUTTON CLICK =================

async function submitWithdrawal() {

    const bankName =
        document.getElementById("bankName").value;

    const accountNumber =
        document.getElementById("accountNumber").value;

    const accountName =
        document.getElementById("accountName").value;

    const amount =
        document.getElementById("amount").value;


    if (!bankName || !accountNumber || !accountName || !amount) {

        alert("Please fill in all fields.");

        return;

    }


    showWithdrawalPopup();

}


// ================= ACTUAL WITHDRAWAL =================

async function processWithdrawal() {

    const bankName =
        document.getElementById("bankName").value;

    const accountNumber =
        document.getElementById("accountNumber").value;

    const accountName =
        document.getElementById("accountName").value;

    const amount =
        document.getElementById("amount").value;


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

            window.location.href =
                "dashboard.html";

        }


    } catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

        }
