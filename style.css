/* =============================
   RESET & VARIABLES
============================= */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
    --bg: #f4f6ff;
    --white: #ffffff;
    --text: #111827;
    --muted: #6b7280;
    --accent: #6366f1;
    --accent-soft: #c7d2fe;
    --radius: 24px;
}

body {
    font-family: "Poppins", sans-serif;
    background: var(--bg);
    color: var(--text);
    height: 100vh;
    overflow: hidden;
}

/* =============================
   PAGE (full screen)
============================= */
.page {
    height: 100vh;
    width: 100%;
    padding: 120px 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: fade 0.8s ease forwards;
}

@keyframes fade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* =============================
   HEADER NAV
============================= */
header {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(200,200,255,0.5);
    border-radius: 999px;
    padding: 14px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 20;
}

nav a {
    margin: 0 14px;
    text-decoration: none;
    color: var(--muted);
    font-size: 0.9rem;
    position: relative;
}

nav a:hover {
    color: var(--text);
}

nav a.active {
    color: var(--accent);
}

nav a.active::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
    border-radius: 999px;
}

/* =============================
   TITRES & TEXTES
============================= */
h1 {
    font-size: 2.6rem;
    margin-bottom: 12px;
}
p {
    max-width: 650px;
    font-size: 1.05rem;
    color: var(--muted);
}

/* =============================
   BOUTONS
============================= */
.btn {
    margin-top: 22px;
    padding: 12px 22px;
    border-radius: 999px;
    text-decoration: none;
    font-size: 1rem;
    display: inline-block;
    background: linear-gradient(120deg, var(--white), var(--accent-soft));
    border: 1px solid var(--accent-soft);
    color: var(--text);
    transition: 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 22px rgba(99,102,241,0.25);
}
