/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	// Active dark mode on class basis
	darkMode: "class",
	i18n: {
		locales: ["en-US"],
		defaultLocale: "en-US"
	},
	content: ["./src/routes/**/*.tsx", "./src/components/**/*.tsx"],
	// These options are passed through directly to PurgeCSS
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				check: "url('/icons/check.svg')",
				landscape: "url('/images/landscape/2.jpg')"
			})
		}
	},
	variants: {
		extend: {
			backgroundColor: ["checked"],
			borderColor: ["checked"],
			inset: ["checked"],
			zIndex: ["hover", "active"]
		}
	},
	plugins: [],
	future: {
		purgeLayersByDefault: true
	}
};
