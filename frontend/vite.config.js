import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import os from 'os'


const getApiUrl = (env) => {
  if (env.mode === 'development') {
    const networkInterfaces = os.networkInterfaces()
    for (const interfaceName in networkInterfaces) {
      const addresses = networkInterfaces[interfaceName]
      if (interfaceName === "WLAN 4") {
        for (const address of addresses) {
          if (address.family === 'IPv4' && address.address.startsWith('192.168.')) {
            const completeAddress = `${address.address}:${env.VITE_API_PORT}`
            console.log(completeAddress)
            return `http://${completeAddress}`
          }
        }
      }
    }
  }
  return env.VITE_API_URL
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  env.mode = mode
  return {
    plugins: [vue()],
    base: '/',
    build: {
      outDir: 'dist',
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(getApiUrl(env)),
    }
  }
})
