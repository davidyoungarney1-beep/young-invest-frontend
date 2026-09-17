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


// ================= WITHDRAWAL CONFIRMATION POPUP =================

function showWithdrawalPopup() {

    const bankName =
        document.getElementById("bankName").value.trim();

    const accountNumber =
        document.getElementById("accountNumber").value.trim();

    const accountName =
        document.getElementById("accountName").value.trim();

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
                        Please confirm that your bank details
                        are correct before submitting your
                        withdrawal request.
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


    // ================= CONFIRMATION POPUP STYLE =================

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

            font-family:
                "Manrope",
                sans-serif;

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

            font-family:
                "Manrope",
                sans-serif;

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
                "Manrope",
                sans-serif;

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

                transform:
                    scale(.94)
                    translateY(8px);
            }

            to {
                opacity: 1;

                transform:
                    scale(1)
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


// ================= ESCAPE TEXT =================

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
        document.getElementById("bankName").value.trim();

    const accountNumber =
        document.getElementById("accountNumber").value.trim();

    const accountName =
        document.getElementById("accountName").value.trim();

    const amount =
        document.getElementById("amount").value.trim();


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
        document.getElementById("bankName").value.trim();

    const accountNumber =
        document.getElementById("accountNumber").value.trim();

    const accountName =
        document.getElementById("accountName").value.trim();

    const amount =
        document.getElementById("amount").value.trim();


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


        if (response.ok) {

            showWithdrawalSuccess(amount);

        } else {

            showWithdrawalError(
                data.message ||
                "Your withdrawal request could not be submitted."
            );

        }


    } catch (error) {

        console.log(error);

        showWithdrawalError(
            "Unable to connect to the server. Please try again."
        );

    }

}


// ================= SUCCESS POPUP =================

function showWithdrawalSuccess(amount) {

    const formattedAmount =
        Number(amount).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


    const popup = document.createElement("div");

    popup.id = "withdrawSuccessPopup";


    popup.innerHTML = `

        <div class="success-overlay">

            <div class="success-popup">

                <div class="success-icon">

                    <i class="fa-solid fa-check"></i>

                </div>


                <span class="success-brand">
                    EVERGREEN
                </span>


                <h2>
                    Withdrawal Request Submitted
                </h2>


                <p class="success-subtitle">
                    Your withdrawal request has been
                    successfully submitted.
                </p>


                <div class="success-amount">

                    <span>
                        Requested Amount
                    </span>

                    <strong>
                        ₦${formattedAmount}
                    </strong>

                </div>


                <div class="success-message">

                    <i class="fa-solid fa-circle-info"></i>

                    <p>
                        Your request has been received.
                        You can monitor your withdrawal
                        status from your dashboard.
                    </p>

                </div>


                <button
                    type="button"
                    class="success-done"
                    id="successDone">

                    Done

                    <i class="fa-solid fa-arrow-right"></i>

                </button>


                <div class="success-secure">

                    <i class="fa-solid fa-shield-halved"></i>

                    Evergreen secure withdrawal

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(popup);


    const style = document.createElement("style");

    style.id = "withdrawSuccessStyle";


    style.textContent = `

        .success-overlay {

            position: fixed;

            inset: 0;

            z-index: 10000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 18px;

            background:
                rgba(3, 28, 19, .68);

            backdrop-filter: blur(9px);

            -webkit-backdrop-filter: blur(9px);

            animation:
                successFade .22s ease;

        }


        .success-popup {

            width: 100%;

            max-width: 400px;

            padding: 29px 23px 22px;

            background: #ffffff;

            border-radius: 28px;

            text-align: center;

            border:
                1px solid #e1ebe5;

            box-shadow:
                0 30px 90px
                rgba(0,0,0,.28);

            animation:
                successScale .28s ease;

        }


        .success-icon {

            width: 68px;

            height: 68px;

            margin: 0 auto 15px;

            border-radius: 50%;

            display: flex;

            align-items: center;

            justify-content: center;

            background:
                linear-gradient(
                    145deg,
                    #15966a,
                    #0f6b4d
                );

            color: #ffffff;

            font-size: 27px;

            box-shadow:
                0 12px 28px
                rgba(15,107,77,.25);

            animation:
                successIcon .4s ease;

        }


        .success-brand {

            display: block;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 8px;

            letter-spacing: 2.5px;

            font-weight: 800;

            color: #15966a;

            margin-bottom: 6px;

        }


        .success-popup h2 {

            margin: 0;

            color: #10251d;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 19px;

            line-height: 1.25;

            font-weight: 800;

        }


        .success-subtitle {

            margin: 9px auto 18px;

            max-width: 290px;

            color: #74827c;

            font-size: 10.5px;

            line-height: 1.55;

        }


        .success-amount {

            padding: 16px;

            border-radius: 17px;

            background: #f0f8f4;

            border:
                1px solid #dcebe4;

            margin-bottom: 12px;

        }


        .success-amount span {

            display: block;

            color: #7a8982;

            font-size: 9px;

            margin-bottom: 5px;

        }


        .success-amount strong {

            display: block;

            color: #0f6b4d;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 24px;

            font-weight: 800;

        }


        .success-message {

            display: flex;

            align-items: flex-start;

            gap: 9px;

            text-align: left;

            padding: 12px;

            border-radius: 13px;

            background: #fafcfb;

            border:
                1px solid #e5ece8;

            margin-bottom: 17px;

        }


        .success-message i {

            color: #15966a;

            font-size: 12px;

            margin-top: 2px;

            flex-shrink: 0;

        }


        .success-message p {

            margin: 0;

            color: #68766f;

            font-size: 9.5px;

            line-height: 1.5;

        }


        .success-done {

            width: 100%;

            height: 48px;

            border: 0;

            border-radius: 14px;

            background:
                linear-gradient(
                    135deg,
                    #073b2a,
                    #0f6b4d
                );

            color: #ffffff;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 11px;

            font-weight: 800;

            cursor: pointer;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 8px;

            box-shadow:
                0 9px 22px
                rgba(15,107,77,.20);

            transition: .2s;

        }


        .success-done:active {

            transform: scale(.98);

        }


        .success-secure {

            margin-top: 13px;

            color: #9aa6a1;

            font-size: 8px;

        }


        .success-secure i {

            color: #15966a;

            margin-right: 4px;

        }


        @keyframes successFade {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }


        @keyframes successScale {

            from {

                opacity: 0;

                transform:
                    scale(.92)
                    translateY(10px);

            }

            to {

                opacity: 1;

                transform:
                    scale(1)
                    translateY(0);

            }

        }


        @keyframes successIcon {

            from {

                opacity: 0;

                transform:
                    scale(.6);

            }

            to {

                opacity: 1;

                transform:
                    scale(1);

            }

        }


        @media(max-width:380px) {

            .success-popup {

                padding:
                    25px 19px 20px;

                border-radius: 24px;

            }

            .success-popup h2 {

                font-size: 17px;

            }

            .success-amount strong {

                font-size: 22px;

            }

        }

    `;


    document.head.appendChild(style);


    // ================= DONE =================

    document.getElementById("successDone").onclick =
        function () {

            popup.remove();

            style.remove();

            window.location.href =
                "dashboard.html";

        };

}


// ================= ERROR POPUP =================

function showWithdrawalError(message) {

    const popup = document.createElement("div");

    popup.id = "withdrawErrorPopup";


    popup.innerHTML = `

        <div class="error-overlay">

            <div class="error-popup">

                <div class="error-icon">

                    <i class="fa-solid fa-circle-exclamation"></i>

                </div>


                <span class="error-brand">
                    EVERGREEN
                </span>


                <h2>
                    Withdrawal Not Submitted
                </h2>


                <p>
                    ${escapePopupText(message)}
                </p>


                <button
                    type="button"
                    id="errorDone">

                    Close

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(popup);


    const style = document.createElement("style");

    style.id = "withdrawErrorStyle";


    style.textContent = `

        .error-overlay {

            position: fixed;

            inset: 0;

            z-index: 10001;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 18px;

            background:
                rgba(3,28,19,.68);

            backdrop-filter: blur(8px);

            -webkit-backdrop-filter: blur(8px);

        }


        .error-popup {

            width: 100%;

            max-width: 370px;

            background: #ffffff;

            border-radius: 25px;

            padding: 27px 22px;

            text-align: center;

            box-shadow:
                0 30px 80px
                rgba(0,0,0,.25);

            animation:
                errorScale .25s ease;

        }


        .error-icon {

            width: 62px;

            height: 62px;

            margin: 0 auto 14px;

            border-radius: 50%;

            background: #fff0ef;

            color: #c94b43;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 25px;

        }


        .error-brand {

            font-size: 8px;

            letter-spacing: 2px;

            font-weight: 800;

            color: #15966a;

        }


        .error-popup h2 {

            margin: 7px 0;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 17px;

            color: #10251d;

        }


        .error-popup p {

            margin: 0 auto 18px;

            max-width: 290px;

            color: #74827c;

            font-size: 10px;

            line-height: 1.55;

        }


        .error-popup button {

            width: 100%;

            height: 46px;

            border: 0;

            border-radius: 13px;

            background: #0f6b4d;

            color: white;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 11px;

            font-weight: 800;

            cursor: pointer;

        }


        @keyframes errorScale {

            from {

                opacity: 0;

                transform: scale(.94);

            }

            to {

                opacity: 1;

                transform: scale(1);

            }

        }

    `;


    document.head.appendChild(style);


    document.getElementById("errorDone").onclick =
        function () {

            popup.remove();

            style.remove();

        };

}
