/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-dark": "var(--color-primary-hover)",
        "nav-bg": "var(--color-nav-background)",
        "theme-bg": "var(--color-background)",
        gray: {
          50: "#F8F9FA",
          100: "#EEEEEE",
          200: "#DADADA",
          300: "#5F5F5F",
          900: "#121212",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        base: ["16px", "19px"],
        lg: ["18px", "21.09px"],
        xl: ["24px", "28px"],
      },
      letterSpacing: {
        base: "0.5px",
        wide: "0.75px",
      },
      maxHeight: {
        "basket-mobile": "calc(100vh - 280px)",
        "basket-desktop": "calc(100vh - 300px)",
      },
    },
  },
  safelist: ["btn-primary"],
  corePlugins: {
    preflight: true,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn-primary": {
          "@apply w-full bg-primary text-white py-3 px-6 rounded-3xl": {},
        },
        ".text-strong": {
          "@apply font-medium text-[18px] leading-[21px] tracking-[0.75px] text-white":
            {},
        },
        ".text-item-name": {
          "@apply text-[24px] font-bold leading-[28.13px] text-[#121212]": {},
        },
        ".text-item-description": {
          "@apply text-base font-normal leading-[18.75px] tracking-[0.5px] text-gray-600":
            {},
        },
        ".text-section-title": {
          "@apply text-base font-bold leading-[18.75px] tracking-[0.5px]": {},
        },
        ".text-section-subtitle": {
          "@apply text-base font-normal leading-[18.75px] tracking-[0.5px] text-gray-500":
            {},
        },
        '[type="radio"]': {
          "@apply relative appearance-none w-6 h-6 border-2 border-gray-300 rounded-full checked:border-primary":
            {},
          "&:checked::after": {
            content: '""',
            "@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full":
              {},
          },
        },
      });
    },
  ],
};
