// Active le lien du menu correspondant à la page
document.addEventListener("DOMContentLoaded", () => {
    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
});
