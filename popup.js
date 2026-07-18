function showPopup(icon, iconClass, title, message, callback = null) {

    const oldPopup = document.getElementById("popupOverlay");
    if (oldPopup) oldPopup.remove();

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay show";
    overlay.id = "popupOverlay";

    overlay.innerHTML = `
        <div class="popup">
            <div class="popup-icon ${iconClass}">${icon}</div>
            <h2>${title}</h2>
            <p>${message}</p>
            <button id="popupBtn">OK</button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("popupBtn").onclick = function () {
        overlay.remove();

        if (callback) {
            callback();
        }
    };

}

function showSuccess(title, message, callback = null) {
    showPopup("✅", "success", title, message, callback);
}

function showError(title, message) {
    showPopup("❌", "error", title, message);
}
