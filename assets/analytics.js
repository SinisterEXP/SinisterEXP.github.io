(function () {
    let lastTrackedPage = null;

    function getSiteVariant() {
        const bodyVariant = document.body && document.body.dataset
            ? document.body.dataset.siteVariant
            : "";

        if (bodyVariant) {
            return bodyVariant;
        }

        if (window.location.pathname.toLowerCase().endsWith("/demo.html")) {
            return "demo";
        }

        return "live";
    }

    function getPageName() {
        const hash = window.location.hash.replace("#", "").toLowerCase();
        return hash || "home";
    }

    function sendEvent(eventName, params) {
        if (typeof window.gtag !== "function") {
            return;
        }

        window.gtag("event", eventName, {
            site_variant: getSiteVariant(),
            ...params
        });
    }

    function trackPageView(force) {
        const pageName = getPageName();

        if (!force && pageName === lastTrackedPage) {
            return;
        }

        lastTrackedPage = pageName;

        sendEvent("page_view", {
            page_title: "SinisterEXP - " + pageName,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.hash,
            page_section: pageName
        });
    }

    function normaliseText(text) {
        return (text || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 120);
    }

    function getSocialPlatform(url) {
        if (!url) {
            return "unknown";
        }

        if (url.includes("facebook.com")) {
            return "facebook";
        }

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "youtube";
        }

        if (url.includes("tiktok.com")) {
            return "tiktok";
        }

        return "other";
    }

    function getDemoTitle(anchor) {
        const demoItem = anchor.closest(".demo-item");
        const title = demoItem ? demoItem.querySelector(".demo-title") : null;
        return normaliseText(title ? title.textContent : anchor.textContent);
    }

    function getCinematicTitle(element) {
        const card = element.closest(".cinematics-card");
        const title = card ? card.querySelector(".cinematics-description h3") : null;
        return normaliseText(title ? title.textContent : element.alt);
    }

    function bindGlobalTracking() {
        document.addEventListener("click", function (event) {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const menuButton = target.closest("#menu-btn");
            if (menuButton) {
                sendEvent("menu_open", {
                    page_section: getPageName()
                });
                return;
            }

            const navLink = target.closest(".nav-link");
            if (navLink) {
                sendEvent("navigation_click", {
                    nav_target: (navLink.getAttribute("href") || "").replace("#", "") || "home",
                    nav_label: normaliseText(navLink.textContent),
                    nav_context: navLink.closest("#nav-modal") ? "modal" : "header"
                });
                return;
            }

            const demoLink = target.closest(".demo-link");
            if (demoLink) {
                sendEvent("demo_reel_click", {
                    demo_title: getDemoTitle(demoLink),
                    destination_url: demoLink.href,
                    page_section: getPageName()
                });
                return;
            }

            const socialLink = target.closest(".social-item a");
            if (socialLink) {
                sendEvent("social_link_click", {
                    social_platform: getSocialPlatform(socialLink.href),
                    destination_url: socialLink.href,
                    page_section: getPageName()
                });
                return;
            }

            const emailLink = target.closest(".contact-email");
            if (emailLink) {
                sendEvent("contact_email_click", {
                    contact_method: "email",
                    page_section: getPageName()
                });
                return;
            }

            const fullscreenImage = target.closest(".cinematics-image[data-fullscreen]");
            if (fullscreenImage) {
                sendEvent("cinematic_image_open", {
                    asset_title: getCinematicTitle(fullscreenImage),
                    asset_url: fullscreenImage.getAttribute("data-fullscreen") || fullscreenImage.src,
                    page_section: getPageName()
                });
                return;
            }

            const siteByLink = target.closest(".site-by a");
            if (siteByLink) {
                sendEvent("partner_link_click", {
                    partner_name: normaliseText(siteByLink.textContent) || "Oakshift Software",
                    destination_url: siteByLink.href,
                    page_section: getPageName()
                });
            }
        });

        document.addEventListener("submit", function (event) {
            const form = event.target;

            if (!(form instanceof HTMLFormElement)) {
                return;
            }

            if (form.matches("#contact form, #page-contact form, form[action*='web3forms']")) {
                sendEvent("contact_form_submit", {
                    form_name: "contact",
                    form_destination: form.action,
                    page_section: getPageName()
                });
            }
        });
    }

    window.SinisterAnalytics = {
        sendEvent: sendEvent,
        trackPageView: trackPageView
    };

    window.addEventListener("hashchange", function () {
        trackPageView(false);
    });

    document.addEventListener("DOMContentLoaded", function () {
        bindGlobalTracking();
        trackPageView(true);
    });
})();