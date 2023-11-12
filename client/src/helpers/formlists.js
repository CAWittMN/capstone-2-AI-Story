const inputNames = [
  { name: "charName", type: "text" },
  { name: "moods", type: "choices" },
  { name: "genre", type: "choices" },
  { name: "setting", type: "text" },
  { name: "maxChapters", type: "choices" },
  { name: "genImages", type: "checkbox" },
  { name: "genAudio", type: "checkbox" },
  { name: "additionalPrompt", type: "text" },
];

const moods = [
  "happy",
  "sad",
  "scary",
  "funny",
  "romantic",
  "mysterious",
  "adventurous",
  "action-packed",
  "dramatic",
  "suspenseful",
  "thrilling",
  "inspiring",
  "peaceful",
  "epic",
  "dark",
  "light-hearted",
  "whimsical",
  "magical",
  "fantastical",
];

const genres = [
  "fantasy",
  "sci-fi",
  "mystery",
  "thriller",
  "horror",
  "romance",
  "western",
  "dystopian",
  "post-apocalyptic",
  "alternate history",
  "paranormal",
  "comedy",
  "drama",
  "action",
];

const maxChapters = [5, 15, 30, 50];

export { inputNames, moods, genres, maxChapters };
