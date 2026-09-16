// ================= EVERGREEN INVESTMENTS =================
// ================= INVESTMENT.JS ==========================

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // =====================================================
    // CHECK LOGIN
    // =====================================================

    if (!user || !user._id) {

        window.location.href =
            "login.html";

        return;
    }


    // =====================================================
    // INVEST BUTTONS
    // =====================================================

    const investButtons =
        document.querySelectorAll(".invest-btn");


    investButtons.forEach(button => {

        button.addEventListener("click", () => {

            const plan =
                button.dataset.plan;


            const amount =
                Number(
                    button.dataset.amount
                );


            // =================================================
            // CHECK PLAN
            // =================================================

            if (!plan || !amount) {

                showError(
                    "Invalid Investment",
                    "This investment plan is not available."
                );

                return;
            }


            // =================================================
            // CONFIRM INVESTMENT
            // =================================================

            showConfirm(
                `Start ${plan}?`,
                `₦${amount.toLocaleString()} will be deducted from your wallet balance to start this investment.`,
                () => {

                    startInvestment(
                        button,
                        plan,
                        amount
                    );

                }
            );

        });

    });


    // =====================================================
    // START INVESTMENT
    // =====================================================

    async function startInvestment(
        button,
        plan,
        amount
    ) {


        // =================================================
        // DISABLE BUTTON
        // =================================================

        const originalText =
            button.innerHTML;


        button.disabled =
            true;


        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';


        try {


            // =================================================
            // SEND TO BACKEND
            // =================================================

            const response =
                await fetch(
                    "https://young-invest-backend.onrender.com/api/investment/start",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            userId:
                                user._id,

                            plan:
                                plan

                        })
                    }
                );


            // =================================================
            // READ RESPONSE
            // =================================================

            const data =
                await response.json();


            // =================================================
            // CHECK RESPONSE
            // =================================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Investment failed."
                );

            }


            // =================================================
            // UPDATE WALLET
            // =================================================

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


            // =================================================
            // SUCCESS POPUP
            // =================================================

            showSuccess(
                "Investment Started",
                `Your ${plan} investment of ₦${amount.toLocaleString()} has been started successfully.`,
                () => {

                    window.location.href =
                        "my-investments.html";

                }
            );


        } catch (error) {


            // =================================================
            // ERROR
            // =================================================

            console.error(
                "Investment Error:",
                error
            );


            showError(
                "Investment Failed",
                error.message ||
                "Something went wrong while starting your investment."
            );


        } finally {


            // =================================================
            // RESTORE BUTTON
            // =================================================

            button.disabled =
                false;


            button.innerHTML =
                originalText;

        }

    }

});
