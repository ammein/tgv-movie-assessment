import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [
            react(),
            tailwindcss(),
            svgr()
        ],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL + "/" + env.VITE_API_VERSION,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                cors: false
            },
        }
    }
})
