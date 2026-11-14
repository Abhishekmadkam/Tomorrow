

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("#site-header");
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");
    const overlay = document.querySelector("#nav-overlay");

    const dropdowns = document.querySelectorAll(".dropdown");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (!header || !menuToggle || !navMenu || !overlay) {
        return;
    }

    // MOBILE MENU
    function openMenu() {
        navMenu.classList.add("open");
        overlay.classList.add("show");
        menuToggle.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    function closeMenu() {
        navMenu.classList.remove("open");
        overlay.classList.remove("show");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        closeDropdowns();
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("open");

        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // DROPDOWNS
    function closeDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("open");

            const button = dropdown.querySelector(".dropdown-toggle");

            button?.setAttribute("aria-expanded", "false");
        });
    }

    dropdowns.forEach(dropdown => {

        const button = dropdown.querySelector(".dropdown-toggle");

        if (!button) return;

        button.addEventListener("click", () => {

            const isOpen = dropdown.classList.contains("open");

            closeDropdowns();

            if (!isOpen) {
                dropdown.classList.add("open");
                button.setAttribute("aria-expanded", "true");
            }

        });

    });

    // CLOSE AFTER NAVIGATION
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // ESCAPE KEY
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // OUTSIDE CLICK FOR DESKTOP DROPDOWNS
    document.addEventListener("click", event => {
        if (!event.target.closest(".dropdown")) {
            closeDropdowns();
        }
    });

    // STICKY HEADER SCROLL EFFECT
    function updateHeader() {
        header.classList.toggle("scrolled", window.scrollY > 20);
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    // CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

});
