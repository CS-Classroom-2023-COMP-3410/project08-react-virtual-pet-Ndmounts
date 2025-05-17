import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: 'https://cs-classroom-2023-comp-3410.github.io/project08-react-virtual-pet-Ndmounts/',
    plugins: [react()],
    server: {
        port: 5173,
        // You can change this if needed
    },
});
