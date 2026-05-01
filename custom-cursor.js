(() => {
    const useCustomCursor = window.matchMedia("(pointer: fine)").matches && window.innerWidth > 780;
    if (!useCustomCursor) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");

    dot.className = "cursor-dot";
    ring.className = "cursor-ring";

    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isPointer = false;

    const pointerTargets = "a, button, .btn, .nav-cta, input, textarea, select, label";

    const setPointerState = (target) => {
        isPointer = !!target.closest(pointerTargets);
        ring.classList.toggle("active", isPointer);
        dot.classList.toggle("active", isPointer);
    };

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        setPointerState(event.target);
    });

    document.addEventListener("mouseover", (event) => {
        setPointerState(event.target);
    });

    window.addEventListener("scroll", () => {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        const hoveredEl = document.elementFromPoint(mouseX, mouseY);
        if (hoveredEl) {
            setPointerState(hoveredEl);
        }
    }, { passive: true });

    const animateRing = () => {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
    };

    animateRing();
})();
