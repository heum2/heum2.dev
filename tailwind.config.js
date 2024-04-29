/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "code::before": false,
            "code::after": false,
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            "h2,h3,h4": {
              "scroll-margin-top": "3.75rem",
            },
            "hr, thead, tbody tr": { borderColor: theme("colors.neutral.300") },
          },
        },
        invert: {
          css: {
            blockquote: {},
            "--tw-prose-hr": theme("colors.white[500]"),
            "--tw-prose-quote-borders": theme("colors.white[500]"),
            "--tw-prose-bullets": theme("colors.white[500]"),
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addComponents, addUtilities }) => {
      addUtilities(
        {
          ".no-scrollbar": {
            /* IE and Edge */
            "-ms-overflow-style": "none",
            /* Firefox */
            "scrollbar-width": "none",
            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
        ["responsive"]
      );
    },
  ],
};
