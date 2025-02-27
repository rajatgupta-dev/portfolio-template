/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,js,ts}",
	],
  	// add daisyUI plugin
	plugins: [require('daisyui')],
}
