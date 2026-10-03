/*
  Modifier ici : contacts et contenus des galeries.
  Chaque ligne = une photo ou une video. Les fichiers vont dans assets/<categorie>/.
  ratio : forme de la vignette ("3 / 4" portrait, "9 / 16" video verticale, "1 / 1" carre, "4 / 5").
  Les fichiers en .mp4 / .webm sont lus comme des videos (poster : image de couverture optionnelle).
*/
window.SITE = {
  email: "hello@sarissa-ugc.com",
  instagram: "https://www.instagram.com/sarissaball/",
  tiktok: "https://www.tiktok.com/@youcancallmesarissa",
  galleries: {
    beauty: [
      { file: "beauty-01.jpg", ratio: "4 / 5", alt: "Beauty look" },
      { file: "beauty-02.mp4", ratio: "9 / 16", alt: "Beauty video", poster: "beauty-02.jpg" },
      { file: "beauty-03.jpg", ratio: "1 / 1", alt: "Beauty look" },
      { file: "beauty-04.jpg", ratio: "2 / 3", alt: "Beauty look" },
      { file: "beauty-05.mp4", ratio: "3 / 4", alt: "Beauty video", poster: "beauty-05.jpg" },
      { file: "beauty-06.jpg", ratio: "9 / 16", alt: "Beauty look" },
      { file: "beauty-07.mp4", ratio: "4 / 5", alt: "Beauty video", poster: "beauty-07.jpg" },
      { file: "beauty-08.jpg", ratio: "9 / 16", alt: "Beauty look" },
      { file: "beauty-09.mp4", ratio: "1 / 1", alt: "Beauty video", poster: "beauty-09.jpg" },
      { file: "beauty-10.mp4", ratio: "2 / 3", alt: "Beauty video", poster: "beauty-10.jpg" },
      { file: "beauty-11.jpg", ratio: "3 / 4", alt: "Beauty look" },
      { file: "beauty-12.mp4", ratio: "9 / 16", alt: "Beauty video", poster: "beauty-12.jpg" },
      { file: "beauty-13.mp4", ratio: "4 / 5", alt: "Beauty video", poster: "beauty-13.jpg" },
      { file: "beauty-14.mp4", ratio: "9 / 16", alt: "Beauty video", poster: "beauty-14.jpg" },
      { file: "beauty-15.jpg", ratio: "1 / 1", alt: "Beauty products" },
      { file: "beauty-16.mp4", ratio: "2 / 3", alt: "Beauty video", poster: "beauty-16.jpg" },
      { file: "beauty-17.mp4", ratio: "3 / 4", alt: "Beauty video", poster: "beauty-17.jpg" }
    ],
    fashion: [
      { file: "fashion-01.jpg", ratio: "9 / 16", alt: "Fashion look" },
      { file: "fashion-02.mp4", ratio: "9 / 16", alt: "Fashion video", poster: "fashion-02.jpg" },
      { file: "fashion-03.jpg", ratio: "4 / 3", alt: "Fashion details" },
      { file: "fashion-04.jpg", ratio: "3 / 4", alt: "Silver heels and disco balls" }
    ],
    lifestyle: [
      { file: "lifestyle-01.jpg", ratio: "4 / 3", alt: "Lifestyle moment" },
      { file: "lifestyle-02.mp4", ratio: "4 / 5", alt: "Lifestyle video", poster: "lifestyle-02.jpg" },
      { file: "lifestyle-03.jpg", ratio: "4 / 3", alt: "Lifestyle moment" },
      { file: "lifestyle-04.mp4", ratio: "9 / 16", alt: "Lifestyle video", poster: "lifestyle-04.jpg" },
      { file: "lifestyle-05.jpg", ratio: "4 / 3", alt: "Lifestyle moment" },
      { file: "lifestyle-06.jpg", ratio: "1 / 1", alt: "Lifestyle moment" },
      { file: "lifestyle-07.jpg", ratio: "2 / 3", alt: "Lifestyle moment" },
      { file: "lifestyle-08.mp4", ratio: "3 / 4", alt: "Lifestyle video", poster: "lifestyle-08.jpg" },
      { file: "lifestyle-09.jpg", ratio: "9 / 16", alt: "Lifestyle moment" },
      { file: "lifestyle-10.jpg", ratio: "4 / 5", alt: "Lifestyle moment" },
      { file: "lifestyle-11.jpg", ratio: "9 / 16", alt: "Lifestyle moment" },
      { file: "lifestyle-12.jpg", ratio: "1 / 1", alt: "Lifestyle moment" }
    ]
  }
};
