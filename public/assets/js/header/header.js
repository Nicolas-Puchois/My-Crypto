const toggleNavMobile = () => {
  let navMobile = document.querySelector("nav > #nav");
  let iconMenu = document.querySelector("nav > #toggle-nav");
  navMobile.classList.toggle("mobile");
  // console.log(iconMenu);
  iconMenu.setAttribute(
    "class",
    navMobile.classList.contains("mobile")
      ? "fas fa-plane-slash"
      : "fas fa-plane"
  );
};

const closeMenu = () => {
  let navMobile = document.querySelector("nav > #nav");
  let iconMenu = document.querySelector("nav > #toggle-nav");
  navMobile.classList.remove("mobile");
  iconMenu.setAttribute(
    "class",
    navMobile.classList.contains("mobile")
      ? "fas fa-plane-slash"
      : "fas fa-plane"
  );
};

function initMobileMenu() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    window.addEventListener("resize", initMobileMenu);
    let toggleNav = document.querySelector("#toggle-nav");
    toggleNav.style.cursor = "pointer";
    toggleNav.addEventListener("click", toggleNavMobile);
    let main = document.querySelector("main");
    main.addEventListener("click", closeMenu);
    let navLinks = document.querySelectorAll("nav > #nav > ul > li > a");
    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", closeMenu);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#nav a");
  const currentPage = window.location.pathname.split("/").pop();
  links.forEach((link) => {
    const href = link.getAttribute("href").replace(/^\/+/, "");
    if (href === currentPage) {
      link.classList.add("active"); // Ajouter la classe active
    }
  });
  initMobileMenu();
  window.addEventListener("resize", initMobileMenu);
  window.addEventListener("resize", closeMenu);
  // window.addEventListener("scroll", closeMenu);
});
