const phoneField = document.querySelector("#phone");

if (phoneField instanceof HTMLInputElement) {
    const formatPhoneNumber = (value) => {
        let digits = value.replace(/\D/g, "");
        if (digits.length > 10 && digits.startsWith("1")) {
            digits = digits.slice(1);
        }
        digits = digits.slice(0, 10);

        if (digits.length <= 3) {
            return `(${digits}`;
        }
        if (digits.length <= 6) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        }
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    };

    phoneField.addEventListener("input", () => {
        const value = phoneField.value;
        const selection = phoneField.selectionStart || 0;
        const digitsBeforeSelection = value.slice(0, selection).replace(/\D/g, "").length;
        const allDigits = value.replace(/\D/g, "");
        const hasCountryCode = allDigits.length > 10 && allDigits.startsWith("1");
        const targetDigitCount = Math.max(0, digitsBeforeSelection - (hasCountryCode && digitsBeforeSelection > 0 ? 1 : 0));

        phoneField.value = formatPhoneNumber(value);

        let cursor = 0;
        let digitCount = 0;
        while (cursor < phoneField.value.length && digitCount < targetDigitCount) {
            if (/\d/.test(phoneField.value[cursor])) {
                digitCount += 1;
            }
            cursor += 1;
        }
        phoneField.setSelectionRange(cursor, cursor);
    });
}

const dashboardTabs = document.querySelectorAll(".dashboard-tab");
const dashboardCurrentView = document.querySelector(".dashboard-current-view");
const dashboardDetailTitle = document.querySelector(".dashboard-detail-title");
const dashboardDetailCopy = document.querySelector(".dashboard-detail-copy");

if (
    dashboardTabs.length > 0
    && dashboardCurrentView instanceof HTMLElement
    && dashboardDetailTitle instanceof HTMLElement
    && dashboardDetailCopy instanceof HTMLElement
) {
    dashboardTabs.forEach((step) => {
        if (!(step instanceof HTMLButtonElement)) {
            return;
        }

        step.addEventListener("click", () => {
            const stepName = step.dataset.step;
            const detailTitle = step.dataset.detailTitle;
            const detailCopy = step.dataset.detailCopy;

            if (!stepName || !detailTitle || !detailCopy) {
                console.error("A dashboard tab is missing its description.");
                return;
            }

            dashboardTabs.forEach((candidate) => {
                if (candidate instanceof HTMLButtonElement) {
                    candidate.setAttribute("aria-pressed", String(candidate === step));
                }
            });

            dashboardCurrentView.textContent = `${stepName[0].toUpperCase()}${stepName.slice(1)}`;
            dashboardDetailTitle.textContent = detailTitle;
            dashboardDetailCopy.textContent = detailCopy;
        });
    });
}

const aboutTabs = document.querySelectorAll(".about-tab");

if (aboutTabs.length > 0) {
    const activateAboutTab = (selectedIndex, moveFocus) => {
        aboutTabs.forEach((tab, index) => {
            if (!(tab instanceof HTMLButtonElement)) {
                return;
            }

            const isSelected = index === selectedIndex;
            const panelId = tab.getAttribute("aria-controls");
            const panel = panelId ? document.getElementById(panelId) : null;

            if (!(panel instanceof HTMLElement)) {
                console.error(`The About tab "${tab.textContent.trim()}" has no matching panel.`);
                return;
            }

            tab.setAttribute("aria-selected", String(isSelected));
            tab.tabIndex = isSelected ? 0 : -1;
            panel.hidden = !isSelected;

            if (isSelected && moveFocus) {
                tab.focus();
            }
        });
    };

    aboutTabs.forEach((tab, index) => {
        if (!(tab instanceof HTMLButtonElement)) {
            return;
        }

        tab.addEventListener("click", () => activateAboutTab(index, false));
        tab.addEventListener("keydown", (event) => {
            let nextIndex = index;

            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % aboutTabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + aboutTabs.length) % aboutTabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = aboutTabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            activateAboutTab(nextIndex, true);
        });
    });
}

const revealTargets = document.querySelectorAll("main > section, main > div > section");

if (
    revealTargets.length > 0
    && "IntersectionObserver" in window
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    document.documentElement.classList.add("has-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    revealTargets.forEach((target) => {
        target.classList.add("reveal");
        target.querySelectorAll("h1, h2, h3, p, .button, .text-link").forEach((textTarget, index) => {
            textTarget.classList.add("reveal-text");
            textTarget.style.setProperty("--reveal-delay", `${Math.min(index * 65, 260)}ms`);
        });
        revealObserver.observe(target);
    });
}
