// ================= INVESTMENT.JS =================

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // ================= CHECK LOGIN =================

    if (!user || !user._id) {
        window.location.href = "login.html";
        return;
    }

    // ================= INVEST BUTTONS =================

    const investButtons =
        document.querySelectorAll(".invest-btn");

    investButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const plan =
                button.dataset.plan;

            const amount =
                Number(button.dataset.amount);

            // ================= CHECK PLAN =================

            if (!plan || !amount) {

                showMessage(
                    "Invalid investment plan.",
                    "error"
                );

                return;
            }

            // ================= CONFIRM INVESTMENT =================

            const confirmed = confirm(
                `Start the ${plan} investment with ₦${amount.toLocaleString()}?`
            );

            if (!confirmed) {
                return;
            }

            // ================= DISABLE BUTTON =================

            const originalText =
                button.innerHTML;

            button.disabled = true;

            button.innerHTML =
                "Processing...";

            try {

                // ================= SEND TO BACKEND =================

                const response = await fetch(
                    "https://young-invest-backend.onrender.com/api/investment/start",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            userId: user._id,

                            plan: plan

                        })
                    }
                );

                const data =
                    await response.json();

                // ================= CHECK RESPONSE =================

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Investment failed."
                    );

                }

                // ================= UPDATE WALLET =================

                if (
                    data.walletBalance !==
                    undefined
                ) {

                    user.walletBalance =
                        data.walletBalance;

                    localStorage.setItem(
                        "user",
                        JSON.stringify(user)
                    );
                }

                // ================= SUCCESS =================

                showMessage(
                    `${plan} investment started successfully.`,
                    "success"
                );

                // ================= OPEN MY INVESTMENTS =================

                setTimeout(() => {

                    window.location.href =
                        "my-investments.html";

                }, 1200);

            } catch (error) {

                console.error(
                    "Investment Error:",
                    error
                );

                showMessage(
                    error.message ||
                    "Something went wrong.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.innerHTML =
                    originalText;
            }

        });

    });


    // ================= MESSAGE FUNCTION =================

    function showMessage(message, type) {

        const existing =
            document.querySelector(
                ".investment-message"
            );

        if (existing) {
            existing.remove();
        }

        const box =
            document.createElement("div");

        box.className =
            "investment-message";

        box.textContent = message;

        // ================= MESSAGE COLOR =================

        if (type === "success") {

            box.style.background =
                "#087f5b";

        } else {

            box.style.background =
                "#b42318";
        }

        // ================= MESSAGE STYLE =================

        box.style.position =
            "fixed";

        box.style.top =
            "20px";

        box.style.left =
            "50%";

        box.style.transform =
            "translateX(-50%)";

        box.style.width =
            "calc(100% - 32px)";

        box.style.maxWidth =
            "420px";

        box.style.padding =
            "15px 18px";

        box.style.borderRadius =
            "12px";

        box.style.color =
            "#ffffff";

        box.style.fontSize =
            "14px";

        box.style.fontWeight =
            "600";

        box.style.textAlign =
            "center";

        box.style.zIndex =
            "99999";

        box.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.2)";

        document.body.appendChild(box);

        // ================= REMOVE MESSAGE =================

        setTimeout(() => {

            box.remove();

        }, 3000);

    }

});
