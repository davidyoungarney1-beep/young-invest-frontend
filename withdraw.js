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


// ================= WITHDRAWAL POPUP =================

function showWithdrawalPopup() {

    const bankName =
        document.getElementById("bankName").value;

    const accountNumber =
        document.getElementById("accountNumber").value;

    const accountName =
        document.getElementById("accountName").value;

    const amount =
        Number(document.getElementById("amount").value);


    const formattedAmount =
        Number.isFinite(amount)
            ? "₦" + amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            : "₦0.00";


    const popup = document.createElement("div");

    popup.id = "withdrawPopup";


    popup.innerHTML = `

        <div class="withdraw-popup-overlay">

            <div class="withdraw-popup">

                <div class="withdraw-popup-header">

                    <div class="withdraw-popup-icon">
                        <i class="fa-solid fa-arrow-up-right-dots"></i>
                    </div>

                    <div>

                        <span class="popup-brand">
                            EVERGREEN
                        </span>

                        <h2>
                            Confirm Withdrawal
                        </h2>

                    </div>

                </div>


                <div class="popup-amount">

                    <span>
                        Withdrawal Amount
                    </span>

                    <strong>
                        ${formattedAmount}
                    </strong>

                </div>


                <div class="popup-details">

                    <div class="popup-detail">

                        <span>
                            Bank
                        </span>

                        <strong>
                            ${escapePopupText(bankName)}
                        </strong>

                    </div>


                    <div class="popup-detail">

                        <span>
                            Account Number
                        </span>

                        <strong>
                            ${escapePopupText(accountNumber)}
                        </strong>

                    </div>


                    <div class="popup-detail">

                        <span>
                            Account Name
                        </span>

                        <strong>
                            ${escapePopupText(accountName)}
                        </strong>

                    </div>

                </div>


                <div class="popup-notice">

                    <div class="popup-notice-icon">

                        <i class="fa-solid fa-circle-check"></i>

                    </div>

                    <p>
                        Your withdrawal will be processed shortly
                        and should arrive within a few minutes.
                        Please make sure your bank details are correct.
                    </p>

                </div>


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

                        <i class="fa-solid fa-check"></i>

                        Confirm

                    </button>

                </div>


                <div class="popup-secure">

                    <i class="fa-solid fa-shield-halved"></i>

                    Secure withdrawal request

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

            background:
                rgba(3, 28, 19, .64);

            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 18px;

            z-index: 9999;

            animation:
                evergreenFade .2s ease;

        }


        .withdraw-popup {

            width: 100%;

            max-width: 410px;

            background: #ffffff;

            border-radius: 26px;

            padding: 23px;

            box-shadow:
                0 30px 90px
                rgba(0,0,0,.25);

            animation:
                evergreenScale .25s ease;

            border:
                1px solid #e2ebe6;

        }


        .withdraw-popup-header {

            display: flex;

            align-items: center;

            gap: 13px;

            margin-bottom: 20px;

        }


        .withdraw-popup-icon {

            width: 52px;

            height: 52px;

            border-radius: 16px;

            background: #e8f6f0;

            color: #0f6b4d;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 19px;

            flex-shrink: 0;

        }


        .popup-brand {

            display: block;

            font-size: 8px;

            letter-spacing: 2px;

            font-weight: 800;

            color: #15966a;

            margin-bottom: 3px;

        }


        .withdraw-popup h2 {

            margin: 0;

            font-family: "Manrope", sans-serif;

            font-size: 18px;

            font-weight: 800;

            color: #10251d;

        }


        .popup-amount {

            background:
                linear-gradient(
                    135deg,
                    #073b2a,
                    #0f6b4d
                );

            border-radius: 18px;

            padding: 17px;

            color: white;

            margin-bottom: 13px;

        }


        .popup-amount span {

            display: block;

            font-size: 10px;

            opacity: .7;

            margin-bottom: 5px;

        }


        .popup-amount strong {

            display: block;

            font-family: "Manrope", sans-serif;

            font-size: 26px;

            font-weight: 800;

            letter-spacing: -.5px;

        }


        .popup-details {

            border:
                1px solid #e2ebe6;

            border-radius: 16px;

            overflow: hidden;

            background: #fbfcfb;

        }


        .popup-detail {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            padding: 12px 14px;

            border-bottom:
                1px solid #e8efeb;

        }


        .popup-detail:last-child {

            border-bottom: 0;

        }


        .popup-detail span {

            color: #7b8983;

            font-size: 10px;

        }


        .popup-detail strong {

            color: #10251d;

            font-size: 11px;

            font-weight: 700;

            text-align: right;

            max-width: 60%;

            word-break: break-word;

        }


        .popup-notice {

            display: flex;

            gap: 9px;

            margin-top: 13px;

            padding: 12px;

            border-radius: 13px;

            background: #f1f7f4;

            border:
                1px solid #dcebe4;

        }


        .popup-notice-icon {

            color: #15966a;

            font-size: 13px;

            padding-top: 1px;

            flex-shrink: 0;

        }


        .popup-notice p {

            margin: 0;

            font-size: 9.5px;

            line-height: 1.55;

            color: #65736d;

        }


        .withdraw-popup-buttons {

            display: flex;

            gap: 9px;

            margin-top: 17px;

        }


        .withdraw-popup-buttons button {

            flex: 1;

            height: 47px;

            border: 0;

            border-radius: 13px;

            font-family:
                "Manrope", sans-serif;

            font-size: 11px;

            font-weight: 800;

            cursor: pointer;

            transition: .2s;

        }


        .withdraw-cancel {

            background: #f0f4f2;

            color: #53635c;

        }


        .withdraw-confirm {

            background: #0f6b4d;

            color: white;

            box-shadow:
                0 8px 20px
                rgba(15,107,77,.20);

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 7px;

        }


        .withdraw-popup-buttons button:active {

            transform: scale(.97);

        }


        .popup-secure {

            text-align: center;

            margin-top: 13px;

            font-size: 8px;

            color: #9aa6a1;

        }


        .popup-secure i {

            margin-right: 4px;

            color: #15966a;

        }


        @keyframes evergreenFade {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }


        @keyframes evergreenScale {

            from {
                opacity: 0;
                transform: scale(.94)
                    translateY(8px);
            }

            to {
                opacity: 1;
                transform: scale(1)
                    translateY(0);
            }

        }


        @media(max-width:380px) {

            .withdraw-popup {

                padding: 19px;

                border-radius: 22px;

            }

            .popup-amount strong {

                font-size: 23px;

            }

        }

    `;


    document.head.appendChild(style);


    // ================= CANCEL =================

    document.getElementById("withdrawCancel").onclick =
        function () {

            popup.remove();

            style.remove();

        };


    // ================= CONFIRM =================

    document.getElementById("withdrawConfirm").onclick =
        function () {

            popup.remove();

            style.remove();

            processWithdrawal();

        };

}


// ================= SAFETY =================

function escapePopupText(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

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


    if (
        !bankName ||
        !accountNumber ||
        !accountName ||
        !amount
    ) {

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
