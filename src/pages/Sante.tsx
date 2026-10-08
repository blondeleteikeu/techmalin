import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon'

// Catalogue santé & soins à domicile de notre boutique partenaire Meta Cares,
// synchronisé depuis metacares.shop (scripts/sync-metacares.mjs → public/metacares.json).

export interface McProduct { n: string; s: string; p: number; v: number; i: string; c: string; sc: string; b: string; st: number; f: number }
interface McData { updated: string; products: McProduct[] }

const euro = (n: number) => n.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
export const mcUrl = (slug: string) => `https://www.metacares.shop/product/${slug}?utm_source=techmalin&utm_medium=referral`
export const mcImg = (url: string, w = 400) => `${url}?width=${w}&quality=75&format=webp`

let cache: Promise<McData> | null = null
export function loadMetaCares() {
  cache ??= fetch(`${import.meta.env.BASE_URL}metacares.json`).then(r => r.json())
  return cache
}

export function useMetaCares() {
  const [data, setData] = useState<McData | null>(null)
  useEffect(() => { loadMetaCares().then(setData).catch(() => setData({ updated: '', products: [] })) }, [])
  return data
}

export function McCard({ p }: { p: McProduct }) {
  return (
    <a className="card mc-card" href={mcUrl(p.s)} target="_blank" rel="noopener">
      <div className="card-img">
        <img src={mcImg(p.i)} alt={p.n} loading="lazy" />
        {!p.st && <span className="tag tag-grey">Sur commande</span>}
      </div>
      <div className="card-body">
        <span className="brand">{p.sc || p.c}</span>
        <h3>{p.n}</h3>
        <div className="card-foot">
          <strong className="price">{p.v ? <small>dès </small> : null}{euro(p.p)}</strong>
          <span className="badge badge-mc">Meta Cares</span>
        </div>
      </div>
    </a>
  )
}

const PAGE = 48

export default function Sante() {
  const data = useMetaCares()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState<'pop' | 'asc' | 'desc'>('pop')
  const [stockOnly, setStockOnly] = useState(false)
  const [n, setN] = useState(PAGE)

  const cats = useMemo(() => {
    const m = new Map<string, number>()
    data?.products.forEach(p => m.set(p.c, (m.get(p.c) ?? 0) + 1))
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [data])

  const list = useMemo(() => {
    if (!data) return []
    const words = norm(q).split(/\s+/).filter(Boolean)
    const r = data.products.filter(p => (cat === 'all' || p.c === cat) && (!stockOnly || p.st) &&
      words.every(w => norm(`${p.n} ${p.c} ${p.sc} ${p.b}`).includes(w)))
    if (sort === 'asc') r.sort((a, b) => a.p - b.p)
    else if (sort === 'desc') r.sort((a, b) => b.p - a.p)
    else r.sort((a, b) => b.f - a.f || b.st - a.st)
    return r
  }, [data, q, cat, sort, stockOnly])

  useEffect(() => setN(PAGE), [q, cat, sort, stockOnly])

  return (
    <main className="sante">
      <section className="mc-hero">
        <div className="wrap">
          <a href="#top" className="back light">← Retour à l’informatique</a>
          <p className="eyebrow">Boutique partenaire · Meta Cares</p>
          <h1>Santé & soins à domicile</h1>
          <p className="lead">{data ? data.products.length.toLocaleString('fr-BE') : '2 600+'} produits de matériel médical et d’aide au quotidien : incontinence, hygiène, mobilité, soins, nutrition… vendus et livrés en Belgique par Meta Cares.</p>
          <ul className="trust">
            <li><Icon name="truck" size={18} />Livraison offerte dès 99 €</li>
            <li><Icon name="shield" size={18} />Paiement Bancontact & cartes</li>
            <li><Icon name="return" size={18} />Retours 30 jours</li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="cat-head">
          <h2 className="h2">Catalogue santé <small>{list.length.toLocaleString('fr-BE')} produit{list.length > 1 ? 's' : ''}</small></h2>
          <div className="filters">
            <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher : alèse, gants, déambulateur…" aria-label="Rechercher" />
            <select className="input" value={sort} onChange={e => setSort(e.target.value as typeof sort)} aria-label="Trier">
              <option value="pop">Sélection d’abord</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
            <label className="toggle"><input type="checkbox" checked={stockOnly} onChange={e => setStockOnly(e.target.checked)} /> En stock</label>
          </div>
        </div>
        <div className="chips">
          <button className={cat === 'all' ? 'chip on' : 'chip'} onClick={() => setCat('all')}>Tout</button>
          {cats.map(([c, k]) => <button key={c} className={cat === c ? 'chip on' : 'chip'} onClick={() => setCat(c)}>{c} <i>{k}</i></button>)}
        </div>
        {!data && <p className="empty">Chargement du catalogue…</p>}
        {data && list.length === 0 && <p className="empty">Aucun produit ne correspond à votre recherche.</p>}
        <div className="grid">{list.slice(0, n).map(p => <McCard key={p.s} p={p} />)}</div>
        {n < list.length && <div className="more"><button className="btn" onClick={() => setN(n + PAGE * 2)}>Afficher plus ({(list.length - n).toLocaleString('fr-BE')} restants)</button></div>}
        <p className="note">Prix TTC de la boutique Meta Cares{data?.updated ? `, synchronisés le ${new Date(data.updated).toLocaleDateString('fr-BE')}` : ''}. L’achat, le paiement, la livraison, les retours et la garantie sont assurés par Meta Cares sur metacares.shop.</p>
      </section>
    </main>
  )
}
