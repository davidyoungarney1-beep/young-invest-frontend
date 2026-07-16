<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | NairaWealth Investments</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        :root {
            --primary: #00875A; /* Nigerian Green */
            --primary-hover: #006644;
            --secondary: #0A2540; /* Deep Blue */
            --bg-light: #F8FAFC;
            --text-dark: #1E293B;
            --text-muted: #64748B;
            --border-color: #E2E8F0;
            --white: #FFFFFF;
            --success: #22C55E;
            --danger: #EF4444;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            background-color: var(--bg-light);
            color: var(--text-dark);
            min-height: 100vh;
            display: flex;
        }

        /* Dashboard Layout */
        .dashboard-container {
            display: flex;
            width: 100%;
        }

        /* Sidebar Navigation */
        .sidebar {
            width: 260px;
            background-color: var(--secondary);
            color: var(--white);
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 100vh;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 20px;
            font-weight: 700;
            color: var(--white);
            text-decoration: none;
            margin-bottom: 40px;
        }

        .logo span {
            color: var(--primary);
        }

        .nav-links {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .nav-item a {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #94A3B8;
            text-decoration: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.2s;
        }

        .nav-item.active a, .nav-item a:hover {
            color: var(--white);
            background-color: rgba(255, 255, 255, 0.08);
        }

        .nav-item.active a {
            background-color: var(--primary);
        }

        .logout-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #FDA4AF;
            text-decoration: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
        }

        .logout-btn:hover {
            background-color: rgba(239, 68, 68, 0.1);
        }

        /* Main Content Panel */
        .main-content {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
        }

        .user-greeting h1 {
            font-size: 26px;
            font-weight: 700;
            color: var(--secondary);
        }

        .user-greeting p {
            color: var(--text-muted);
            font-size: 14px;
            margin-top: 4px;
        }

        /* Balance Cards Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .card {
            background-color: var(--white);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 24px;
            position: relative;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-muted);
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
        }

        .card-icon {
            background-color: rgba(0, 135, 90, 0.1);
            color: var(--primary);
            padding: 8px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .balance {
            font-size: 28px;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 8px;
        }

        .card-footer {
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .trend-up {
            color: var(--success);
            font-weight: 600;
        }

        /* Actions Bar */
        .actions-section {
            display: flex;
            gap: 16px;
            margin-bottom: 40px;
        }

        .btn {
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: none;
            transition: all 0.2s;
        }

        .btn-primary {
            background-color: var(--primary);
            color: var(--white);
        }

        .btn-primary:hover {
            background-color: var(--primary-hover);
        }

        .btn-secondary {
            background-color: var(--white);
            color: var(--secondary);
            border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
            background-color: var(--bg-light);
        }

        /* Transactions Section */
        .transactions-card {
            background-color: var(--white);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 20px;
        }

        .transaction-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .transaction-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
        }

        .transaction-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .tx-details {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .tx-icon {
            padding: 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tx-icon.deposit {
            background-color: rgba(34, 197, 94, 0.1);
            color: var(--success);
        }

        .tx-icon.referral {
            background-color: rgba(0, 135, 90, 0.1);
            color: var(--primary);
        }

        .tx-name {
            font-weight: 600;
            font-size: 15px;
            color: var(--secondary);
        }

        .tx-date {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        .tx-amount {
            font-weight: 700;
            font-size: 15px;
        }

        .tx-amount.positive {
            color: var(--success);
        }

        @media (max-width: 1024px) {
            .dashboard-container {
                flex-direction: column;
            }
            .sidebar {
                width: 100%;
                min-height: auto;
                padding: 20px;
            }
            .logo {
                margin-bottom: 20px;
            }
            .nav-links {
                flex-direction: row;
                flex-wrap: wrap;
            }
            .main-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>

    <div class="dashboard-container">
        
        <aside class="sidebar">
            <div>
                <a href="#" class="logo">
                    <i data-lucide="trending-up"></i> Naira<span>Wealth</span>
                </a>
                <ul class="nav-links">
                    <li class="nav-item active">
                        <a href="#"><i data-lucide="layout-dashboard"></i> Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a href="#"><i data-lucide="wallet"></i> My Wallet</a>
                    </li>
                    <li class="nav-item">
                        <a href="#"><i data-lucide="bar-chart-3"></i> Investments</a>
                    </li>
                    <li class="nav-item">
                        <a href="#"><i data-lucide="gift"></i> Referrals</a>
                    </li>
                </ul>
            </div>
            <div>
                <button class="logout-btn" onclick="logout()"><i data-lucide="log-out"></i> Log Out</button>
            </div>
        </aside>

        <main class="main-content">
            <header>
                <div class="user-greeting">
                    <h1>Welcome, <span id="userName">Investor</span>!</h1>
                    <p>Track, manage, and grow your Naira assets daily.</p>
                </div>
            </header>

            <section class="stats-grid">
                <div class="card">
                    <div class="card-header">
                        <span>WALLET BALANCE</span>
                        <div class="card-icon"><i data-lucide="wallet"></i></div>
                    </div>
                    <div class="balance">₦25,000.00</div>
                    <div class="card-footer">
                        <span class="trend-up"><i data-lucide="trending-up" style="width:14px;height:14px;display:inline;"></i> +₦2,500</span> this month
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <span>ACTIVE INVESTMENTS</span>
                        <div class="card-icon"><i data-lucide="piggy-bank"></i></div>
                    </div>
                    <div class="balance">₦150,000.00</div>
                    <div class="card-footer">
                        <span>18% Fixed annual return</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <span>REFERRAL BONUS</span>
                        <div class="card-icon"><i data-lucide="gift"></i></div>
                    </div>
                    <div class="balance">₦2,000.00</div>
                    <div class="card-footer">
                        <span>1 registered referral</span>
                    </div>
                </div>
            </section>

            <section class="actions-section">
                <button class="btn btn-primary" onclick="alert('Deposit feature integration goes here!')">
                    <i data-lucide="plus"></i> Add Money (Deposit)
                </button>
                <button class="btn btn-secondary" onclick="alert('Withdraw feature integration goes here!')">
                    <i data-lucide="arrow-up-right"></i> Withdraw to Bank
                </button>
            </section>

            <section class="transactions-card">
                <h3 class="section-title">Recent Activity</h3>
                <div class="transaction-list">
                    
                    <div class="transaction-item">
                        <div class="tx-details">
                            <div class="tx-icon deposit"><i data-lucide="arrow-down-left"></i></div>
                            <div>
                                <div class="tx-name">Investment Created</div>
                                <div class="tx-date">July 15, 2026 • 10:14 AM</div>
                            </div>
                        </div>
                        <div class="tx-amount" style="color: var(--secondary);">-₦150,000.00</div>
                    </div>

                    <div class="transaction-item">
                        <div class="tx-details">
                            <div class="tx-icon referral"><i data-lucide="gift"></i></div>
                            <div>
                                <div class="tx-name">Referral Bonus (Code: 0e771687)</div>
                                <div class="tx-date">July 14, 2026 • 04:30 PM</div>
                            </div>
                        </div>
                        <div class="tx-amount positive">+₦2,000.00</div>
                    </div>

                    <div class="transaction-item">
                        <div class="tx-details">
                            <div class="tx-icon deposit"><i data-lucide="arrow-down-left"></i></div>
                            <div>
                                <div class="tx-name">Wallet Funded via Bank Transfer</div>
                                <div class="tx-date">July 14, 2026 • 02:11 PM</div>
                            </div>
                        </div>
                        <div class="tx-amount positive">+₦175,000.00</div>
                    </div>

                </div>
            </section>
        </main>
    </div>

    <script>
        lucide.createIcons();

        // Retrieve the name we captured at signup, or use the email logged in
        const storedName = localStorage.getItem('user_name');
        const loggedInUser = localStorage.getItem('logged_in_user');

        if (storedName) {
            document.getElementById('userName').textContent = storedName;
        } else if (loggedInUser) {
            // Cut email name before '@' as default greeting
            document.getElementById('userName').textContent = loggedInUser.split('@')[0];
        }

        // Simulate Logout
        function logout() {
            localStorage.clear();
            window.location.href = 'login.html';
        }
    </script>
</body>
</html>