```javascript
/* =========================================================
   NEWSFORGE
   Frontend Interactions
   ========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const navItems = document.querySelectorAll(".nav-item");
const searchInput = document.querySelector(".search-box input");

const refreshButton = document.querySelector(".secondary-button");
const addSourceButton = document.querySelector(".primary-button");

const storyRows = document.querySelectorAll(
    ".story-row:not(.story-header)"
);


/* =========================================================
   SIDEBAR NAVIGATION
   ========================================================= */

navItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const pageName = item.querySelector(
            "span:not(.nav-icon)"
        )?.textContent;

        if (pageName) {
            console.log(`Navigation: ${pageName}`);
        }

    });

});


/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const query = searchInput.value
            .trim()
            .toLowerCase();

        storyRows.forEach((row) => {

            const storyText = row
                .textContent
                .toLowerCase();

            if (!query || storyText.includes(query)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}


/* =========================================================
   KEYBOARD SEARCH SHORTCUT
   Press "/" to focus search
   ========================================================= */

document.addEventListener("keydown", (event) => {

    const activeElement = document.activeElement;

    const isTyping =
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA"
        );

    if (
        event.key === "/" &&
        !isTyping
    ) {

        event.preventDefault();

        searchInput?.focus();

    }

    if (
        event.key === "Escape" &&
        activeElement === searchInput
    ) {

        searchInput.blur();

    }

});


/* =========================================================
   REFRESH DASHBOARD
   ========================================================= */

if (refreshButton) {

    refreshButton.addEventListener("click", () => {

        const originalText = refreshButton.textContent;

        refreshButton.textContent = "Refreshing...";
        refreshButton.disabled = true;

        refreshButton.style.opacity = "0.6";

        setTimeout(() => {

            refreshButton.textContent = originalText;
            refreshButton.disabled = false;

            refreshButton.style.opacity = "1";

            updateDashboardTimestamp();

            console.log("Dashboard refreshed.");

        }, 1000);

    });

}


/* =========================================================
   DASHBOARD TIMESTAMP
   ========================================================= */

function updateDashboardTimestamp() {

    const dashboardDescription =
        document.querySelector(".dashboard-heading p");

    if (!dashboardDescription) {
        return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    dashboardDescription.textContent =
        `Last updated at ${time}`;

}


/* =========================================================
   ADD SOURCE BUTTON
   ========================================================= */

if (addSourceButton) {

    addSourceButton.addEventListener("click", () => {

        console.log("Add Source clicked.");

        showNotification(
            "Source management will be available here."
        );

    });

}


/* =========================================================
   STORY ACTIONS
   ========================================================= */

const storyActionButtons =
    document.querySelectorAll(".row-action");

storyActionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const row = button.closest(".story-row");

        if (!row) {
            return;
        }

        const title =
            row.querySelector(".story-title strong")
                ?.textContent
                .trim();

        if (title) {

            console.log(
                `Opening story: ${title}`
            );

            showNotification(
                `Opening story: ${title}`
            );

        }

    });

});


/* =========================================================
   TEXT BUTTONS
   ========================================================= */

const textButtons =
    document.querySelectorAll(".text-button");

textButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        console.log(
            `${button.textContent.trim()} clicked`
        );

    });

});


/* =========================================================
   NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(message) {

    const existing =
        document.querySelector(".toast");

    if (existing) {
        existing.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;


    Object.assign(toast.style, {

        position: "fixed",

        right: "24px",
        bottom: "24px",

        zIndex: "9999",

        padding: "12px 16px",

        background: "#151a21",

        color: "#f1f3f5",

        border: "1px solid #292f38",

        borderRadius: "8px",

        fontSize: "12px",

        boxShadow:
            "0 12px 30px rgba(0, 0, 0, 0.35)",

        opacity: "0",

        transform:
            "translateY(8px)",

        transition:
            "opacity 0.2s ease, transform 0.2s ease"

    });


    document.body.appendChild(toast);


    requestAnimationFrame(() => {

        toast.style.opacity = "1";
        toast.style.transform =
            "translateY(0)";

    });


    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
            "translateY(8px)";

        setTimeout(() => {
            toast.remove();
        }, 200);

    }, 2500);

}


/* =========================================================
   LIVE PIPELINE SIMULATION
   ========================================================= */

const processingStep =
    document.querySelector(
        ".pipeline-step.processing"
    );


function simulatePipeline() {

    if (!processingStep) {
        return;
    }

    const processingText =
        processingStep.querySelector(
            ".pipeline-info small"
        );

    if (!processingText) {
        return;
    }

    let count = 52;


    setInterval(() => {

        if (count <= 0) {
            count = 52;
        }

        count--;

        processingText.textContent =
            `${count} stories processing`;

    }, 5000);

}


/* Start simulation */

simulatePipeline();


/* =========================================================
   LIVE TIME
   ========================================================= */

function updateLiveTime() {

    const timeElements =
        document.querySelectorAll(
            "[data-live-time]"
        );

    if (!timeElements.length) {
        return;
    }

    const now = new Date();

    const formattedTime =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    timeElements.forEach((element) => {
        element.textContent = formattedTime;
    });

}


setInterval(updateLiveTime, 1000);


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
    "%cNewsForge",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "AI News Intelligence Platform initialized."
);
```
