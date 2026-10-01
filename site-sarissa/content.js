/*
  Modifier ici : contacts et contenus des galeries.
  Chaque ligne = une photo ou une video. Les fichiers vont dans assets/<categorie>/.
  ratio : forme de la vignette ("3 / 4" portrait, "9 / 16" video verticale, "1 / 1" carre, "4 / 5").
  Les fichiers en .mp4 / .webm sont lus comme des videos (poster : image de couverture optionnelle).
*/
window.SITE = {
  email: "hello@example.com",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
  galleries: {
    beauty: [
      { file: "beauty-01.jpg", ratio: "3 / 4", alt: "Beauty look" },
      { file: "beauty-02.mp4", ratio: "9 / 16", alt: "Beauty video", poster: "beauty-02.jpg" },
      { file: "beauty-03.jpg", ratio: "4 / 5", alt: "Beauty look" },
      { file: "beauty-04.jpg", ratio: "1 / 1", alt: "Beauty look" },
      { file: "beauty-05.jpg", ratio: "3 / 4", alt: "Beauty look" },
      { file: "beauty-06.mp4", ratio: "9 / 16", alt: "Beauty video", poster: "beauty-06.jpg" },
      { file: "beauty-07.jpg", ratio: "4 / 5", alt: "Beauty look" },
      { file: "beauty-08.jpg", ratio: "3 / 4", alt: "Beauty look" },
      { file: "beauty-09.jpg", ratio: "1 / 1", alt: "Beauty look" },
      { file: "beauty-10.jpg", ratio: "3 / 4", alt: "Beauty look" },
      { file: "beauty-11.jpg", ratio: "4 / 5", alt: "Beauty look" },
      { file: "beauty-12.jpg", ratio: "3 / 4", alt: "Beauty look" }
    ],
    fashion: [
      { file: "fashion-01.jpg", ratio: "3 / 4", alt: "Fashion look" },
      { file: "fashion-02.jpg", ratio: "4 / 5", alt: "Fashion look" },
      { file: "fashion-03.mp4", ratio: "9 / 16", alt: "Fashion video", poster: "fashion-03.jpg" },
      { file: "fashion-04.jpg", ratio: "3 / 4", alt: "Fashion look" },
      { file: "fashion-05.jpg", ratio: "1 / 1", alt: "Fashion look" },
      { file: "fashion-06.jpg", ratio: "4 / 5", alt: "Fashion look" },
      { file: "fashion-07.jpg", ratio: "3 / 4", alt: "Fashion look" },
      { file: "fashion-08.jpg", ratio: "3 / 4", alt: "Fashion look" }
    ],
    lifestyle: [
      { file: "lifestyle-01.jpg", ratio: "4 / 5", alt: "Lifestyle moment" },
      { file: "lifestyle-02.jpg", ratio: "3 / 4", alt: "Lifestyle moment" },
      { file: "lifestyle-03.jpg", ratio: "1 / 1", alt: "Lifestyle moment" },
      { file: "lifestyle-04.mp4", ratio: "9 / 16", alt: "Lifestyle video", poster: "lifestyle-04.jpg" },
      { file: "lifestyle-05.jpg", ratio: "3 / 4", alt: "Lifestyle moment" },
      { file: "lifestyle-06.jpg", ratio: "4 / 5", alt: "Lifestyle moment" },
      { file: "lifestyle-07.jpg", ratio: "1 / 1", alt: "Lifestyle moment" },
      { file: "lifestyle-08.jpg", ratio: "3 / 4", alt: "Lifestyle moment" },
      { file: "lifestyle-09.jpg", ratio: "4 / 5", alt: "Lifestyle moment" },
      { file: "lifestyle-10.jpg", ratio: "3 / 4", alt: "Lifestyle moment" }
    ]
  }
};
