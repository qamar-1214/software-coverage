/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				shimmer: {
					"0%": {
						backgroundColor: "rgb(229 231 235)",
					},
					"50%": {
						backgroundColor: "rgb(209 213 219)",
					},
					"100%": {
						backgroundColor: "rgb(229 231 235)",
					},
				},
			},
			animation: {
				shimmer: "shimmer 1.5s infinite",
			},
			fontFamily: {
				sans: ["Urbanist", "sans-serif"], // Include Urbanist as the primary font
			},
			backgroundImage: {
				"gradient-blue-purple": "linear-gradient(to right, #2662B1, #4437AD)",
			},
		},
	},
	plugins: [],
};
