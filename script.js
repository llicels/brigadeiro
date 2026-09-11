(() => {
    const orangeSpray = document.getElementById('orangeSpray');
    const brigadeiroImg1 = document.querySelector('.brigadeiro-img');
    const page1 = document.querySelector('.page-1');
    const page2 = document.querySelector('.page-2');

    if (!orangeSpray || !page1 || !page2) return;

    let ticking = false;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function updateAnimation() {
        ticking = false;

        const scrollY = window.scrollY;
        const page1Height = page1.offsetHeight;
        const viewportHeight = window.innerHeight;

        // --- Orange spray zoom (fills viewport) ---
        const sprayStart = page1Height * 0.1;
        const sprayEnd = page1Height * 0.7;
        const rawSpray = (scrollY - sprayStart) / (sprayEnd - sprayStart);
        const sprayProgress = Math.min(Math.max(rawSpray, 0), 1);
        const sprayEased = easeInOutCubic(sprayProgress);

        const scale = 1 + sprayEased * 24;
        orangeSpray.style.transform = `translate(-50%, -50%) scale(${scale})`;
        orangeSpray.style.transformOrigin = 'center center';

        // --- Background: pink → orange (smooth) ---
        const bgStart = page1Height * 0.15;
        const bgEnd = page1Height * 0.75;
        const rawBg = (scrollY - bgStart) / (bgEnd - bgStart);
        const bgProgress = easeInOutCubic(Math.min(Math.max(rawBg, 0), 1));

        const r = Math.round(lerp(243, 240, bgProgress));
        const g = Math.round(lerp(224, 157, bgProgress));
        const b = Math.round(lerp(236, 81, bgProgress));
        page1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // --- Page 2 transition ---
        const page2Rect = page2.getBoundingClientRect();
        const page2Entry = 1 - (page2Rect.top / viewportHeight);
        const transStart = 0.5;
        const transEnd = 0.95;
        const rawTransition = (page2Entry - transStart) / (transEnd - transStart);
        const transitionProgress = Math.min(Math.max(rawTransition, 0), 1);
        const transEased = easeInOutCubic(transitionProgress);

        // Page 2 bg: pink → orange
        const r2 = Math.round(lerp(243, 240, transEased));
        const g2 = Math.round(lerp(224, 157, transEased));
        const b2 = Math.round(lerp(236, 81, transEased));
        page2.style.backgroundColor = `rgb(${r2}, ${g2}, ${b2})`;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateAnimation);
            ticking = true;
        }
    }, { passive: true });

    updateAnimation();
})();
