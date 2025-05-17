import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/project08-react-virtual-pet-Ndmounts/',
    plugins: [react()],
    server: {
        port: 5173,
    },
});
