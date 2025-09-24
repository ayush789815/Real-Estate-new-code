import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    base: './', // important for relative paths when deployed
    server: {
        host: true,
        port: 5173
    },
    build: {
        outDir: 'dist', // default, Vercel uses this automatically
    }
})