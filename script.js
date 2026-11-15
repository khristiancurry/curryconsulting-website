const carousel = document.querySelector(".platform-track");
const toggle = document.querySelector(".carousel-toggle");

if (carousel && toggle) {
    toggle.addEventListener("click", () => {
        const isPaused = toggle.getAttribute("aria-pressed") === "true";
        const shouldPause = !isPaused;

        carousel.style.animationPlayState = shouldPause ? "paused" : "running";
        toggle.setAttribute("aria-pressed", String(shouldPause));
        toggle.setAttribute("aria-label", shouldPause ? "Play platform carousel" : "Pause platform carousel");
        toggle.textContent = shouldPause ? "Play" : "Pause";
    });
}
