(() => {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.prepend(progressBar);

    const loader = document.createElement("div");
    loader.className = "preloader";
    loader.innerHTML = `
        <div class="loader-box" aria-live="polite">
            <h2 class="loader-title">Mustafa<span>.</span></h2>
            <p class="loader-subtitle">Crafting an immersive portfolio experience...</p>
            <div class="loader-track" aria-hidden="true">
                <div class="loader-fill"></div>
            </div>
            <p class="loader-percent">0%</p>
        </div>
    `;
    document.body.prepend(loader);

    const fill = loader.querySelector(".loader-fill");
    const percent = loader.querySelector(".loader-percent");
    let progress = 0;

    const progressTimer = setInterval(() => {
        progress = Math.min(progress + Math.floor(Math.random() * 14) + 5, 95);
        if (fill) fill.style.width = `${progress}%`;
        if (percent) percent.textContent = `${progress}%`;
    }, 90);

    window.addEventListener("load", () => {
        clearInterval(progressTimer);
        if (fill) fill.style.width = "100%";
        if (percent) percent.textContent = "100%";
        loader.classList.add("hide");
        setTimeout(() => loader.remove(), 500);
    });

    document.querySelectorAll('a[href]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            const isInternal = href && !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto:");
            if (!isInternal) return;
            event.preventDefault();
            document.body.classList.add("is-transitioning");
            setTimeout(() => {
                window.location.href = href;
            }, 260);
        });
    });

    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el, index) => {
        const revealDirections = ["left", "zoom", "right"];
        if (!el.dataset.reveal) {
            el.dataset.reveal = revealDirections[index % revealDirections.length];
        }
        el.style.transitionDelay = `${Math.min(index * 45, 320)}ms`;
        observer.observe(el);
    });

    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    const topNav = document.querySelector(".top-nav");
    const cards = document.querySelectorAll(".card, .hero-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            const rotateX = ((y / rect.height) - 0.5) * -6;
            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    const parallaxEls = document.querySelectorAll(".hero-image, .eyebrow, .section-title, .hero h1");
    parallaxEls.forEach((el, index) => {
        const speed = 0.025 + (index % 3) * 0.012;
        el.dataset.parallaxSpeed = speed.toFixed(3);
    });

    let ticking = false;
    const updateScrollFx = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.max(0, Math.min(progress, 100))}%`;

        if (topNav) {
            topNav.classList.toggle("scrolled", scrollTop > 12);
        }

        parallaxEls.forEach((el) => {
            const speed = Number(el.dataset.parallaxSpeed || 0);
            const y = -scrollTop * speed;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
        });

        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollFx);
            ticking = true;
        }
    }, { passive: true });

    updateScrollFx();
})();
