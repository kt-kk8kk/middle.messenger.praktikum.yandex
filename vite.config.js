import { defineConfig } from "vite"

export default defineConfig({
    root: ".",
    build: {
        outDir: "dist",
        cssCodeSplit: true
    },
    server: {
        port: 3000
    }
})
