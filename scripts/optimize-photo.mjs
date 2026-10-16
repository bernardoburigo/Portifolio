// Gera avatares otimizados a partir da foto original.
// sharp descarta todos os metadados (EXIF/GPS) por padrão.
import sharp from 'sharp'
import { readdirSync } from 'node:fs'

const source = process.argv[2] ?? readdirSync('.').find((f) => /^IMG_.*\.jpe?g$/i.test(f))
if (!source) throw new Error('Foto original não encontrada (IMG_*.jpg na raiz).')

const out = 'src/assets'
for (const size of [320, 640]) {
  const img = sharp(source).rotate().resize(size, size, { fit: 'cover', position: 'attention' })
  await img.clone().webp({ quality: 82 }).toFile(`${out}/avatar-${size}.webp`)
  await img.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/avatar-${size}.jpg`)
}
// Imagem de compartilhamento (Open Graph): card com foto redonda, nome e cargo
const size = 360
const circle = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`)
const photo = await sharp(source).rotate().resize(size, size, { fit: 'cover', position: 'attention' })
  .composite([{ input: circle, blend: 'dest-in' }]).png().toBuffer()
const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <circle cx="270" cy="315" r="192" fill="none" stroke="#2DD4BF" stroke-opacity="0.35" stroke-width="10"/>
  <text x="520" y="285" font-family="Geist, Inter, DejaVu Sans, sans-serif" font-size="58" font-weight="700" fill="#E6EEF2">Bernardo Goulart</text>
  <text x="520" y="355" font-family="Geist, Inter, DejaVu Sans, sans-serif" font-size="58" font-weight="700" fill="#E6EEF2">Búrigo</text>
  <text x="520" y="425" font-family="Geist, Inter, DejaVu Sans, sans-serif" font-size="34" font-weight="500" fill="#2DD4BF">Desenvolvedor Full Stack</text>
  <text x="520" y="480" font-family="DejaVu Sans Mono, monospace" font-size="24" fill="#8DA2AE">Angular · TypeScript · Node.js · React</text>
</svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0F1A21' } })
  .composite([{ input: photo, left: 270 - size / 2, top: 315 - size / 2 }, { input: text }])
  .jpeg({ quality: 85, mozjpeg: true }).toFile('public/og.jpg')

console.log(`Avatares gerados a partir de ${source}`)
