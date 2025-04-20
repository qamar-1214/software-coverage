import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target:
					"https://software-coverage-backemd-m174k2pq0-shahzad-arifs-projects.vercel.app",
				changeOrigin: true, // Ensures the Host header matches the target
				rewrite: (path) => path.replace(/^\/api/, "/api"), // Adjust if necessary, this is for prefix handling
			},
		},
	},
});
