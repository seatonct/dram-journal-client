/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "gin-clear": "#FFFFFF",
        "white-wine": "#FFFEDC",
        "pale-straw": "#FEEE98",
        "pale-gold": "#FAEA77",
        "jonquil-ripe-corn": "#FBE166",
        "yellow-gold": "#F8DC55",
        "old-gold": "#F8D948",
        "amber-whiskey": "#F7CF49",
        "deep-gold": "#F5C94D",
        "amontillado-sherry": "#F7C23B",
        "deep-copper": "#F4BD33",
        "burnished-whiskey": "#ECAD06",
        "chestnut-oloroso-sherry": "#E79E12",
        "russet-muscat": "#E69500",
        "tawny-whiskey": "#DD7315",
        "auburn-polished-mahogany": "#E26529",
        "mahogany-henna-notes": "#CC502E",
        "burnt-umber": "#AE3029",
        "old-oak": "#9F221D",
        "brown-sherry": "#732D1D",
        "treacle-whiskey": "#421D0B",
      },
    },
  },
  plugins: [],
};
