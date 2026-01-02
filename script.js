document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("cert-modal");
    const openBtn = document.getElementById("open-cert-modal");
    const preview = document.getElementById("open-cert-preview");

    if (!modal) {
        console.error("Modal not found");
        return;
    }

    // Open modal
    openBtn?.addEventListener("click", () => {
        modal.style.display = "block";
    });

    preview?.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close modal
    document.querySelector(".close")?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Click outside modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    /* ---------- INTRO TABS ---------- */
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t =>
                t.classList.remove("active")
            );
            document.querySelectorAll(".intro-content").forEach(c =>
                c.classList.remove("active")
            );

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab + "-content")
                ?.classList.add("active");
        });
    });

    /* ---------- PROJECT FILTERS ---------- */
    document.querySelectorAll(".filter").forEach(filter => {
        filter.addEventListener("click", () => {
            document.querySelectorAll(".filter").forEach(f =>
                f.classList.remove("active")
            );
            filter.classList.add("active");

            const category = filter.dataset.category;
            document.querySelectorAll(".project").forEach(p => {
                p.style.display =
                    category === "all" || p.dataset.category === category
                        ? "block"
                        : "none";
            });
        });
    });

});
