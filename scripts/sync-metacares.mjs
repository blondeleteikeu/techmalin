// Synchronise le catalogue Meta Cares (metacares.shop) vers public/metacares.json.
// Lancé avant chaque build (et chaque jour par GitHub Actions) : prix, photos et
// nouveaux produits restent à jour. En cas d'échec réseau, le fichier existant est conservé.
// Clé « anon » publique : c'est celle que metacares.shop utilise côté navigateur (lecture seule).
import { writeFileSync } from 'node:fs'

const BASE = 'https://browbfrncjochqjslysa.supabase.co'
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb3diZnJuY2pvY2hxanNseXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTExNDMsImV4cCI6MjA4NjUyNzE0M30.cmRbdQ3cdRmG-wEKJIM7Bq8JAW_-ZbmZmXoTupRdvIo'
const OUT = new URL('../public/metacares.json', import.meta.url)
const SELECT = 'name,slug,price,image_url,stock,is_featured,fr:meta->i18n->name->>fr,brand:meta->>brand,path:meta->category_path,variants:product_variants(price_override,stock,is_active)'

async function get(path) {
  const r = await fetch(`${BASE}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  return r.json()
}

const thumb = url => url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')

try {
  const rows = []
  for (let off = 0; ; off += 500) {
    const page = await get(`products?select=${encodeURIComponent(SELECT)}&is_active=eq.true&order=id&offset=${off}&limit=500`)
    rows.push(...page)
    if (page.length < 500) break
  }
  const products = rows.filter(p => p.slug && p.image_url && p.price > 0).map(p => {
    const vs = (p.variants ?? []).filter(v => v.is_active)
    const prices = vs.map(v => v.price_override ?? p.price).filter(x => x > 0)
    const stock = vs.length ? vs.reduce((a, v) => a + (v.stock ?? 0), 0) : p.stock ?? 0
    const path = Array.isArray(p.path) ? p.path : []
    return {
      n: (p.fr || p.name).trim(),
      s: p.slug,
      p: Math.round(Math.min(p.price, ...prices) * 100) / 100,
      v: prices.length > 1 && new Set(prices).size > 1 ? 1 : 0, // plusieurs prix → « à partir de »
      i: thumb(p.image_url),
      c: path[0] || 'Autres',
      sc: path[1] || '',
      b: p.brand || '',
      st: stock > 0 ? 1 : 0,
      f: p.is_featured ? 1 : 0,
    }
  })
  writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString(), products }))
  console.log(`metacares.json : ${products.length} produits`)
} catch (e) {
  console.warn('Synchronisation Meta Cares impossible, fichier existant conservé :', e.message)
}
