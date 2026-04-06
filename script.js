document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll Effect ──────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Numeric Counter Animation ─────────────────────────────
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : (target > 999 ? '' : '');
        const duration = 2000;
        const startTime = performance.now();

        const format = (n) => {
            if (target >= 10000) return prefix + n.toLocaleString('pt-BR');
            return prefix + n;
        };

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = format(current) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = format(target) + suffix;
        }
        requestAnimationFrame(step);
    }

    // ── Intersection Observer (counters + reveal) ─────────────
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // ── Scroll Reveal for Cards ───────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .testimonial-card, .dual-image, .dual-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
        el.style.transition = 'opacity 0.75s cubic-bezier(.25,.8,.25,1), transform 0.75s cubic-bezier(.25,.8,.25,1)';
        revealObserver.observe(el);
    });

    // ── Mobile Menu (simple toggle) ───────────────────────────
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        const links = document.querySelector('.nav-links');
        links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    });

});
