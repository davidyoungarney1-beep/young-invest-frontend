// ================= SUCCESS / ERROR POPUP =================
alert("Popup.js loaded");
function showPopup(type, title, message, callback = null) {

    const old = document.getElementById("popupOverlay");

    if (old) old.remove();

    const icon = type === "success" ? "✓" : "!";

    const overlay = document.createElement("div");

    overlay.className = "popup-overlay show";

    overlay.id = "popupOverlay";

    overlay.innerHTML = `
    <div class="popup">

        <div class="popup-icon ${type}">
            ${icon}
        </div>

        <h2>${title}</h2>

        <p>${message}</p>

        <button id="popupBtn">
            Continue
        </button>

    </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("popupBtn").onclick = () => {

        overlay.remove();

        if (callback) callback();

    };

}

// ================= SUCCESS =================

function showSuccess(title, message, callback = null) {

    showPopup("success", title, message, callback);

}

// ================= ERROR =================

function showError(title, message) {

    showPopup("error", title, message);

}

// ================= CONFIRM =================

function showConfirm(title, message, callback) {

    const old = document.getElementById("popupOverlay");

    if (old) old.remove();

    const overlay = document.createElement("div");

    overlay.className = "popup-overlay show";

    overlay.id = "popupOverlay";

    overlay.innerHTML = `
    <div class="popup">

        <div class="popup-icon success">
            ?
        </div>

        <h2>${title}</h2>

        <p>${message}</p>

        <div class="popup-actions">

            <button class="cancel-btn" id="cancelBtn">
                Cancel
            </button>

            <button class="confirm-btn" id="confirmBtn">
                Yes
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

        callback();

    };

}

// ================= PASSWORD PROMPT =================

function showPasswordPrompt(title, callback) {

    const old = document.getElementById("popupOverlay");

    if (old) old.remove();

    const overlay = document.createElement("div");

    overlay.className = "popup-overlay show";

    overlay.id = "popupOverlay";

    overlay.innerHTML = `
    <div class="popup">

        <div class="popup-icon success">
            🔑
        </div>

        <h2>${title}</h2>

        <p>Enter the new password below.</p>

        <input
        type="password"
        id="popupPassword"
        placeholder="New Password">

        <div class="popup-actions">

            <button class="cancel-btn" id="cancelBtn">
                Cancel
            </button>

            <button class="confirm-btn" id="confirmBtn">
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

        const password = document.getElementById("popupPassword").value.trim();

        if (password.length < 6) {

            showError(
                "Invalid Password",
                "Password must be at least 6 characters."
            );

            return;

        }

        overlay.remove();

        callback(password);

    };

      }
