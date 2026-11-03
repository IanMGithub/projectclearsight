import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Keep Vite's default denials, and also block the labeled originals plus the
// review mapping. The dev server can otherwise read any file in the project.
// Production output is dist/, which does not include those files.
const privateDevFiles = [
  '.env',
  '.env.*',
  '*.{crt,pem,key,p12,pfx,cer,der}',
  '.npmrc',
  '.yarnrc.yml',
  '**/.git/**',
  '**/challenge-images-originals/**',
  '**/challenge-image-mapping.json',
]

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      deny: privateDevFiles,
    },
  },
})
