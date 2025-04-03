window.addEventListener("DOMContentLoaded", () => {
  let lightboxIsOpen = false;

  // fonction qui ferme la lightbox
  const closeLightBox = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
    lightboxIsOpen = false;
  };

  // récupération de la div #lightbox
  const lightbox = document.querySelector("#lightbox");

  // écouteur d'évènement qui ferme la lightbox lors du clique sur la croix ou en dehors de l'image
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains("close")) {
      closeLightBox();
    }
  });

  // déclencheur d'évènement quand une touche est pressé
  window.addEventListener("keydown", (e) => {
    whichKey(e);
  });

  // fonction qui vérifie quelle touche est pressé
  function whichKey(e) {
    if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      closeLightBox();
    }
  }
  /**
   *
   * @param {string} src
   * @param {string} alt
   *
   */
  // fonction qui ouvre l'image dans la lightbox
  function openLightBox(src, alt) {
    lightboxIsOpen = true;
    const lightbox = document.querySelector("#lightbox");
    const lightboxImg = document.querySelector("#lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }

  // récupération de la balise ul avec la class "masonry-grid"
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
