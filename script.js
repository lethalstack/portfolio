tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        slate: { 950: '#0F172A', 900: '#141C2E', 850: '#1E293B', 800: '#253348' },
                        royal: '#3B82F6',
                        sky: { 400: '#60A5FA' }
                    },
                    fontFamily: {
                        heading: ['Sora', 'sans-serif'],
                        body: ['Inter', 'sans-serif'],
                    }
                }
            }
        }

lucide.createIcons();

        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('portfolio-theme');

        function setTheme(theme) {
            const isLight = theme === 'light';
            document.documentElement.classList.toggle('light-theme', isLight);
            themeToggle.innerHTML = `<i data-lucide="${isLight ? 'moon' : 'sun'}" class="w-[18px] h-[18px]"></i>`;
            themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
            themeToggle.setAttribute('title', `Switch to ${isLight ? 'dark' : 'light'} mode`);
            lucide.createIcons();
        }

        setTheme(savedTheme || 'dark');
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.documentElement.classList.contains('light-theme') ? 'dark' : 'light';
            localStorage.setItem('portfolio-theme', nextTheme);
            setTheme(nextTheme);
        });

        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        mobileMenuBtn.addEventListener('click', () => { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; });
        function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }
        mobileMenuClose.addEventListener('click', closeMenu);
        mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el));

        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        function updateActiveNav() {
            const scrollPos = window.scrollY + 100;
            sections.forEach(section => {
                const top = section.offsetTop; const height = section.offsetHeight; const id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => { link.classList.remove('text-white'); link.classList.add('text-slate-400'); if (link.getAttribute('href') === `#${id}`) { link.classList.add('text-white'); link.classList.remove('text-slate-400'); } });
                }
            });
        }
        window.addEventListener('scroll', updateActiveNav, { passive: true }); updateActiveNav();

        const mainNav = document.getElementById('mainNav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) { mainNav.classList.remove('glass'); mainNav.classList.add('glass-scrolled'); }
            else { mainNav.classList.remove('glass-scrolled'); mainNav.classList.add('glass'); }
        }, { passive: true });
