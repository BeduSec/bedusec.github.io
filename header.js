(function() {

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        
        :root {
            --ici-nav-bg: rgba(0, 0, 0, 0.4);
            --ici-border: rgba(255, 255, 255, 0.06);
        }

        #globalNav {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--ici-border);
            background: var(--ici-nav-bg);
            transition: all 0.3s ease;
            height: 80px;
            display: flex;
            align-items: center;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .ici-container {
            max-width: 80rem;
            margin: 0 auto;
            padding: 0 1.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ici-logo-wrap {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .ici-inf-logo {
            height: 2rem;
            width: 2rem;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
            background: none;
        }

        .ici-divider {
            height: 1.5rem;
            width: 1px;
            background: rgba(255, 255, 255, 0.2);
        }

        .ici-partner-tag {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.2em;
            color: #ffffff;
            text-transform: uppercase;
        }

        .ici-nav-title {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #ffffff;
        }

        @media (max-width: 768px) {
            .ici-nav-title { display: none; }
        }

        .ici-menu-btn {
            width: 40px;
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            gap: 6px;
            z-index: 1100;
            background: transparent;
            border: none;
            cursor: pointer;
            outline: none;
            padding: 0;
        }

        .ici-menu-btn div {
            height: 2px;
            background-color: #ffffff;
            border-radius: 99px;
            transition: all 0.3s ease;
        }

        .ici-bar-1 { width: 32px; }
        .ici-bar-2 { width: 20px; }
        .ici-bar-3 { width: 12px; }

        #iciMenuOverlay {
            position: fixed;
            inset: 0;
            z-index: 950;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2.5rem;
            clip-path: circle(0% at 100% 0%);
            transition: clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        #iciMenuOverlay.active {
            clip-path: circle(150% at 100% 0%);
        }

        .ici-menu-link {
            font-size: 2.25rem;
            font-weight: 800;
            color: #ffffff;
            text-decoration: none;
            letter-spacing: -0.05em;
            transition: color 0.3s ease;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .ici-menu-link:hover { color: #aaaaaa; }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. CREATE HTML STRUCTURE
    const navHTML = `
        <nav id="globalNav">
            <div class="ici-container">
                <div class="ici-logo-wrap">
                    <img src="logo.svg" style="width:3em;">
                    <div class="ici-divider"></div>
                    <span class="ici-partner-tag">BEDUSEC</span>
                </div>
                <h1 class="ici-nav-title">Cyber Security<span style="opacity:0.4; margin-left:4px;">//</span> Enthusiastic s</h1>
                <button class="ici-menu-btn" id="iciMenuBtn">
                    <div class="ici-bar-1"></div>
                    <div class="ici-bar-2"></div>
                    <div class="ici-bar-3"></div>
                </button>
            </div>
        </nav>
        <div id="iciMenuOverlay">
            <a href="index.html" class="ici-menu-link">Overview</a>
            <a href="index.html#projects" class="ici-menu-link">Projects</a>
            <a href="#" class="ici-menu-link">Engineering</a>
            <a href="#" class="ici-menu-link">Contact</a>
        </div>
    `;

    // Inject HTML into Body
    const navContainer = document.createElement('div');
    navContainer.innerHTML = navHTML;
    document.body.prepend(navContainer);

    // 3. LOGIC
    const btn = document.getElementById('iciMenuBtn');
    const overlay = document.getElementById('iciMenuOverlay');
    const bars = btn.querySelectorAll('div');
    const links = overlay.querySelectorAll('.ici-menu-link');
    const nav = document.getElementById('globalNav');

    function toggleMenu() {
        const isActive = overlay.classList.toggle('active');
        if(isActive) {
            bars[0].style.transform = 'rotate(-45deg) translate(-7px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-6px, -5px)';
            bars[2].style.width = '32px';
            document.body.style.overflow = 'hidden';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            bars[2].style.width = '12px';
            document.body.style.overflow = 'auto';
        }
    }

    btn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            if(overlay.classList.contains('active')) toggleMenu();
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.height = '64px';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.4)';
            nav.style.height = '80px';
        }
    });
})();



