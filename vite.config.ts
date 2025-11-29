import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const replaceGAId = () => {
  return {
    name: 'replace-ga-id',
    buildStart() {
      const gaId = process.env.VITE_GA_MEASUREMENT_ID || ''
      const indexPath = resolve(__dirname, 'index.html')
      let html = readFileSync(indexPath, 'utf-8')
      
      html = html.replace(
        /gtag\/js\?id=G-[A-Z0-9]+/g,
        `gtag/js?id=${gaId}`
      )
      
      html = html.replace(
        /gtag\('config', 'G-[A-Z0-9]+'\)/g,
        `gtag('config', '${gaId}')`
      )
      
      writeFileSync(indexPath, html, 'utf-8')
    },
  }
}

export default defineConfig({
  plugins: [react(), replaceGAId()],
})
