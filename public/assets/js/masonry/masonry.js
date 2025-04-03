let lightboxIsOpen = false;

window.addEventListener("DOMContentLoaded", () => {
  const imageLightbox = document.querySelector(".masonry-items");

  const closeLightBox = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
    lightboxIsOpen = false;
  };

  const lightbox = document.querySelector("#lightbox");
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains("close")) {
      closeLightBox();
    }
  });

  function openLightBox(src, alt) {
    lightboxIsOpen = true;
    const lightbox = document.querySelector("#lightbox");
    const lightboxImg = document.querySelector("#lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }

  const masonryGrid = document.querySelector(".masonry-grid");
  masonryGrid.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".masonry-items"); // Vérifie si un <li> a été cliqué
    if (clickedItem) {
      const img = clickedItem.querySelector("img"); // Récupère l'image à l'intérieur du <li>
      if (img) {
        const imgSrc = img.src; // Récupère la source de l'image
        const imgAlt = img.alt; // Récupère l'attribut alt de l'image
        openLightBox(imgSrc, imgAlt); // Ouvre la lightbox avec les données de l'image
      }
    }
  });
});
