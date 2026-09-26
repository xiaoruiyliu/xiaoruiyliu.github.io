/** @type {import('tailwindcss').Config} */
module.exports = {
  dark: "class",
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        herringbone: "url('/assets/herringbone.svg')",
      },
      fontFamily: {
        LibreFranklin: ["LibreFranklin", "sans-serif"],
        LibreFranklinItalic: ["LibreFranklinItalic", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h5, h6": {
              color: theme("colors.emerald.700"),
              fontWeight: "bold",
              fontFamily: theme("fontFamily.serif").join(", "),
            },
          },
        },
      }),
      colors: {
        "accent-1": "#739EFA",
        navy: "#22407A",
        link: "#22341F",
        "side-bg": "#2B4128",
        "center-bg": "#E6E7DE",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        darkGrey: "#1b2024",
      },
      keyframes: {
        "cycle-in": {
          from: { opacity: "0", transform: "translateY(0.25em)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "cycle-in": "cycle-in 200ms ease-out",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
