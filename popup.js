// =========================================================
// EVERGREEN INVESTMENTS
// POPUP SYSTEM
// =========================================================

function showPopup(type, title, message, callback = null) {

    const old = document.getElementById("popupOverlay");

    if (old) old.remove();

    const icon = type === "success"
        ? '<i class="fa-solid fa-check"></i>'
        : '<i class="fa-solid fa-xmark"></i>';

    const overlay = document.createElement("div");

    overlay.className = "popup-overlay show";
    overlay.id = "popupOverlay";

    overlay.innerHTML = `
        <div class="popup">

            <div class="popup-top-line"></div>

            <div class="popup-icon ${type}">
                ${icon}
            </div>

            <h2>${title}</h2>

            <p>${message}</p>

            <button class="popup-main-btn" id="popupBtn">
                Continue
                <i class="fa-solid fa-arrow-right"></i>
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("popupBtn").onclick = () => {

        overlay.classList.remove("show");

        setTimeout(() => {

            overlay.remove();

            if (callback) callback();

        }, 180);

    };

}


// =========================================================
// SUCCESS
// =========================================================

function showSuccess(title, message, callback = null) {

    showPopup(
        "success",
        title,
        message,
        callback
    );

}


// =========================================================
// ERROR
// =========================================================

function showError(title, message) {

    showPopup(
        "error",
        title,
        message
    );

}


// =========================================================
// CONFIRM
// =========================================================

function showConfirm(title, message, callback) {

    const old = document.getElementById("popupOverlay");

    if (old) old.remove();

    const overlay = document.createElement("div");

    overlay.className = "popup-overlay show";
    overlay.id = "popupOverlay";

    overlay.innerHTML = `
        <div class="popup">

            <div class="popup-top-line"></div>

            <div class="popup-icon question">
                <i class="fa-solid fa-question"></i>
            </div>

            <h2>${title}</h2>

            <p>${message}</p>

            <div class="popup-actions">

                <button
                class="cancel-btn"
                id="cancelBtn">

                    Cancel

                </button>

                <button
                class="confirm-btn"
                id="confirmBtn">

                    Continue

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("cancelBtn").onclick = () => {

        overlay.remove();

    };

    document.getElementById("confirmBtn").onclick = () => {

        overlay.remove();

        if (callback) callback();

    };

}


// =========================================================
// PASSWORD PROMPT
// =========================================================

function showPasswordPrompt(title, callback) {

    const old = document.getElementById("popupOverlay");

    if (old) old.remove();

    const overlay = document.createElement("div");

    overlay.className = "popup-overlay show";
    overlay.id = "popupOverlay";

    overlay.innerHTML = `
        <div class="popup">

            <div class="popup-top-line"></div>

            <div class="popup-icon password">
                <i class="fa-solid fa-lock"></i>
            </div>

            <h2>${title}</h2>

            <p>
                Enter the new password below.
            </p>

            <div class="popup-input">

                <i class="fa-solid fa-key"></i>

                <input
                type="password"
                id="popupPassword"
                placeholder="New password">

            </div>

            <div class="popup-actions">

                <button
                class="cancel-btn"
                id="cancelBtn">

                    Cancel

                </button>

                <button
                class="confirm-btn"
                id="confirmBtn">

                    Reset

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("cancelBtn").onclick = () => {

        overlay.remove();

    };

    document.getElementById("confirmBtn").onclick = () => {

        const password =
        document.getElementById("popupPassword")
        .value
        .trim();

        if (password.length < 6) {

            showError(
                "Invalid Password",
                "Password must be at least 6 characters."
            );

            return;

        }

        overlay.remove();

        if (callback) callback(password);

    };

}
