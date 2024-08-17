import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: "/skorboard/",
	build: {
		rollupOptions: {
			input: {
				main: "./index.html",
			},
		},
	},
	plugins: [react()],
});
