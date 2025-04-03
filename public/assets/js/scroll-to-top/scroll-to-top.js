const main = document.querySelector("main");
const scrollToTopButton = document.querySelector("#up-arrow");
const root = document.documentElement;

function posX() {
  if (window.matchMedia("(max-width: 576px)").matches) {
    const reseauMobile = document.querySelector("#reseaux-mobile");
    scrollToTopButton.classList.add("mobile");
    reseauMobile.appendChild(scrollToTopButton);
  } else {
    const pos = (root.clientWidth - main.clientWidth) / 2;
    scrollToTopButton.style.right = `${pos}px`;
    scrollToTopButton.classList.remove("mobile");
    document.body.appendChild(scrollToTopButton);
  }
}

function scrollToTop() {
  const scrollToTopButton = document.querySelector("#up-arrow");
  const heroHeader = document.querySelector("#hero-header");
  //   console.log(heroHeader);
  //   console.log(heroHeader.offsetHeight);

  window.addEventListener("scroll", () => {
    const height = heroHeader ? heroHeader.offsetHeight : 200;
    if (scrollY >= height) {
      scrollToTopButton.style.display = "block";
    } else if (scrollY == 0) {
      scrollToTopButton.style.display = "none";
    }
  });

  scrollToTopButton.addEventListener("click", () => window.scrollTo(0, 0));
}

window.addEventListener("DOMContentLoaded", () => {
  scrollToTop();
  window.addEventListener("resize", posX);
});
posX();
