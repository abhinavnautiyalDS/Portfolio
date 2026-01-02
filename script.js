// Wrap EVERYTHING inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MODAL
    ========================= */
    const modal = document.getElementById("cert-modal");

    // Expose to HTML onclick
    window.openModal = function () {
        if (modal) modal.style.display = "block";
    };

    window.closeModal = function () {
        if (modal) modal.style.display = "none";
    };

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    /* =========================
       INTRO TABS
    ========================= */
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t =>
                t.classList.remove("active")
            );
            document.querySelectorAll(".intro-content").forEach(c =>
                c.classList.remove("active")
            );

            tab.classList.add("active");
            const target = document.getElementById(
                tab.dataset.tab + "-content"
            );
            if (target) target.classList.add("active");
        });
    });

    /* =========================
       PROJECT FILTERS
    ========================= */
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
