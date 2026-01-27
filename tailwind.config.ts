import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--color-primary)",
                    dark: "var(--color-primary-dark)",
                    light: "var(--color-primary-light)",
                },
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                text: {
                    DEFAULT: "var(--color-text)",
                    muted: "var(--color-text-muted)",
                },
                accent: "var(--color-accent)",
            },
            backgroundImage: {
                "premium-gradient": "linear-gradient(135deg, var(--color-primary) 0%, #bb33ff 100%)",
            },
        },
    },
    plugins: [],
};
export default config;
