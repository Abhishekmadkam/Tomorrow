
document.addEventListener("DOMContentLoaded", () => {
    const artwork = document.querySelector("#hero-artwork");

    if (!artwork) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    artwork.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;

        const rect = artwork.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        artwork.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    artwork.addEventListener("pointerleave", () => {
        artwork.style.transform = "";
    });
});
