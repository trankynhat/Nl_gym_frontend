import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Cho phép truy cập từ IP khác
    port: 5173,  // Bạn có thể thay đổi port nếu cần
  },
})
