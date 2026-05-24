/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#0a0a14",
        surface:   "#11111d",
        surface2:  "#161628",
        border:    "#23233a",
        text:      "#f5f5fa",
        muted:     "#9494b0",
        primary:   "#7c5cff",
        primary2:  "#22d3ee",
        accent:    "#ff5c8a",
        success:   "#22c55e",
        warning:   "#f59e0b",
        danger:    "#ef4444",
      },
      fontFamily: {
        sans:    ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #7c5cff 0%, #22d3ee 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #ff5c8a 0%, #7c5cff 100%)",
        "grid-glow":
          "radial-gradient(ellipse at top, rgba(124,92,255,0.18), transparent 60%)",
      },
      boxShadow: {
        glow:    "0 0 40px -10px rgba(124,92,255,0.55)",
        soft:    "0 10px 30px -10px rgba(0,0,0,0.5)",
        ring:    "0 0 0 1px rgba(124,92,255,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float:        "float 6s ease-in-out infinite",
        shimmer:      "shimmer 2.2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
    },
  },
  plugins: [],
};
