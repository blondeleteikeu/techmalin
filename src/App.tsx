import { useEffect, useMemo, useState } from 'react'
import Icon from './components/Icon'
import { CATEGORIES, PRICE_DATE, PRODUCTS, type CategoryId, type Product } from './data/catalog'
import { SUPPLIERS, supplierById } from './data/suppliers'
import { FORM_ENDPOINT, SITE } from './config'
import { CGV, Confidentialite, Retractation } from './pages/Legal'
import Sante, { McCard, useMetaCares } from './pages/Sante'

const euro = (n: number) => n.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
const catOf = (id: CategoryId) => CATEGORIES.find(c => c.id === id)!
const wa = (text?: string) => `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

type FormKind = 'demande' | 'sav' | 'contact'
interface FormState { kind: FormKind; product?: Product }

const STEPS = [
  { icon: 'search', title: 'Vous comparez', text: 'Nous relevons les prix les plus bas sur l’essentiel informatique et les affichons avec la date du relevé.' },
  { icon: 'store', title: 'Vous achetez chez le marchand', text: 'Un clic vous mène à l’offre chez notre partenaire. Paiement sécurisé chez lui, sans intermédiaire.' },
  { icon: 'truck', title: 'Le marchand livre', text: 'Pas de stock chez nous : le produit part directement de l’entrepôt du marchand, chez vous.' },
  { icon: 'chat', title: 'On reste joignables', text: 'Question, retour, produit introuvable ? Écrivez-nous ou passez par WhatsApp.' },
] as const

const FAQ = [
  ['Qui me vend le produit ?', `Pour les offres du catalogue, c’est le marchand indiqué sur la fiche (par exemple Amazon.com.be) qui vous vend, vous facture et vous livre. ${SITE.name} vous aide à trouver le meilleur prix. Pour une commande « Sur demande », c’est ${SITE.name} qui vous vend.`],
  ['Pourquoi les prix sont-ils si bas ?', 'Nous n’avons ni stock ni magasin : nous comparons les offres et retenons les produits essentiels au meilleur rapport qualité-prix.'],
  ['Le prix affiché est-il garanti ?', `Les prix sont relevés à la date indiquée (${PRICE_DATE}). Ils évoluent chez les marchands : le prix affiché chez eux au moment de l’achat fait foi.`],
  ['Comment faire un retour ?', 'Achat chez un partenaire : passez par son service client (lien sur la fiche), généralement 30 jours pour changer d’avis. Commande sur demande : 14 jours, via notre formulaire « Question / retour » ou WhatsApp.'],
  ['Quelle garantie ?', 'Les produits neufs bénéficient de la garantie légale de 2 ans. Les reconditionnés sont garantis au moins 1 an.'],
  ['Les claviers sont-ils en AZERTY belge ?', 'Oui pour les claviers Trust de notre sélection. Vérifiez toujours la disposition indiquée chez le marchand avant de commander.'],
] as const

function useRoute() {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    const on = () => { setHash(location.hash); if (location.hash.startsWith('#/')) window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

export default function App() {
  const hash = useRoute()
  const [menu, setMenu] = useState(false)
  const sante = hash === '#/sante'
  const page = hash === '#/cgv' ? <CGV /> : hash === '#/confidentialite' ? <Confidentialite /> : hash === '#/retractation' ? <Retractation /> : null

  return (
    <>
      <header className="header">
        <div className="wrap header-in">
          <a href="#top" className="logo"><span className="logo-mark"><Icon name="laptop" size={20} /></span>{SITE.name}</a>
          <nav className={menu ? 'nav open' : 'nav'} onClick={() => setMenu(false)}>
            <a href="#catalogue">Catalogue</a>
            <a href="#/sante" className="nav-mc">Santé & soins</a>
            <a href="#fonctionnement">Comment ça marche</a>
            <a href="#fournisseurs">Partenaires</a>
            <a href="#retours">Retours & SAV</a>
            <a href="#faq">FAQ</a>
            <a href={wa('Bonjour TechMalin !')} target="_blank" rel="noopener" className="btn btn-sm btn-wa"><Icon name="whatsapp" size={18} />WhatsApp</a>
          </nav>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><span /><span /><span /></button>
        </div>
      </header>

      {sante ? <Sante /> : page ? <main className="wrap legal-wrap"><a href="#top" className="back">← Retour au site</a>{page}</main> : <Home />}

      <footer className="footer">
        <div className="wrap foot-in">
          <div><a href="#top" className="logo light"><span className="logo-mark"><Icon name="laptop" size={20} /></span>{SITE.name}</a><p>{SITE.tagline}</p></div>
          <div><h4>Contact</h4><p>{SITE.city}<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={wa()} target="_blank" rel="noopener">{SITE.phone}</a> (tél. & WhatsApp)</p></div>
          <div><h4>Informations légales</h4><p><a href="#/cgv">Conditions générales de vente</a><br /><a href="#/retractation">Formulaire de rétractation</a><br /><a href="#/confidentialite">Politique de confidentialité</a><br />BCE : {SITE.bce}</p></div>
        </div>
        <p className="copy">© {new Date().getFullYear()} {SITE.name} · Prix TTC relevés le {PRICE_DATE}. En tant que partenaire Amazon, {SITE.name} réalise un bénéfice sur les achats remplissant les conditions requises. Les liens marchands sont des liens d’affiliation, sans surcoût pour vous.</p>
      </footer>
    </>
  )
}

function Home() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CategoryId | 'all'>('all')
  const [sort, setSort] = useState<'pop' | 'asc' | 'desc'>('pop')
  const [open, setOpen] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>({ kind: 'contact' })

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const r = PRODUCTS.filter(p => (cat === 'all' || p.category === cat) &&
      (!q || (p.name + ' ' + p.brand + ' ' + p.specs.join(' ')).toLowerCase().includes(q)))
    if (sort === 'asc') r.sort((a, b) => a.price - b.price)
    if (sort === 'desc') r.sort((a, b) => b.price - a.price)
    if (sort === 'pop') r.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return r
  }, [query, cat, sort])

  useEffect(() => {
    const id = location.hash.slice(1)
    if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goForm = (kind: FormKind, product?: Product) => {
    setForm({ kind, product }); setOpen(null)
    requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))
  }
  const pickCat = (c: CategoryId) => { setCat(c); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }) }
  const heroPics = ['thinkpad-t14-g1', 'acer-ek241yg', 'sandisk-flair-64', 'mercusys-mr1500x', 'logitech-m185'].map(id => PRODUCTS.find(p => p.id === id)!)
  const cheapest = Math.min(...PRODUCTS.map(p => p.price))
  const mc = useMetaCares()
  const mcPicks = useMemo(() => {
    if (!mc) return []
    const seen = new Set<string>()
    return mc.products.filter(p => p.st && !seen.has(p.c) && seen.add(p.c)).slice(0, 8)
  }, [mc])

  return (
    <main id="top">
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <p className="eyebrow">Matériel informatique essentiel · Belgique</p>
            <h1>L’essentiel informatique,<br /><span>au juste prix.</span></h1>
            <p className="lead">Souris, clés USB, câbles, Wi-Fi, écrans, PC reconditionnés… Nous comparons les offres et vous orientons vers le prix le plus bas chez des marchands fiables, dès {euro(cheapest)}.</p>
            <form className="search" onSubmit={e => { e.preventDefault(); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <Icon name="search" size={20} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher : clé USB, hub USB-C, routeur…" aria-label="Rechercher un produit" />
              <button className="btn">Chercher</button>
            </form>
            <ul className="trust">
              <li><Icon name="euro" size={18} />Prix bas relevés</li>
              <li><Icon name="truck" size={18} />Livraison en Belgique</li>
              <li><Icon name="shield" size={18} />Garantie légale 2 ans</li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true">
            {heroPics.map((p, i) => (
              <div key={p.id} className={`tile t${i}`}><img src={p.image} alt="" referrerPolicy="no-referrer" /><span>{euro(p.price)}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="h2">Nos rayons</h2>
        <div className="cats">
          {CATEGORIES.map(c => (
            <button key={c.id} className="cat" style={{ '--c': c.color } as React.CSSProperties} onClick={() => pickCat(c.id)}>
              <span className="cat-ic"><Icon name={c.icon} size={26} /></span>
              <strong>{c.label}</strong><small>{c.blurb}</small>
              <em>{PRODUCTS.filter(p => p.category === c.id).length} produits · dès {euro(Math.min(...PRODUCTS.filter(p => p.category === c.id).map(p => p.price)))}</em>
            </button>
          ))}
          <a href="#/sante" className="cat cat-mc" style={{ '--c': '#059669' } as React.CSSProperties}>
            <span className="cat-ic"><Icon name="shield" size={26} /></span>
            <strong>Santé & soins</strong><small>Matériel médical et aide à domicile, par Meta Cares.</small>
            <em>{mc ? mc.products.length.toLocaleString('fr-BE') : '2 600+'} produits →</em>
          </a>
        </div>
      </section>

      <section id="catalogue" className="wrap section">
        <div className="cat-head">
          <h2 className="h2">Catalogue <small>{list.length} produit{list.length > 1 ? 's' : ''}</small></h2>
          <div className="filters">
            <input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher…" aria-label="Filtrer" />
            <select className="input" value={sort} onChange={e => setSort(e.target.value as typeof sort)} aria-label="Trier">
              <option value="pop">Sélection d’abord</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>
        <div className="chips">
          <button className={cat === 'all' ? 'chip on' : 'chip'} onClick={() => setCat('all')}>Tout</button>
          {CATEGORIES.map(c => <button key={c.id} style={{ '--c': c.color } as React.CSSProperties} className={cat === c.id ? 'chip on' : 'chip'} onClick={() => setCat(c.id)}>{c.label}</button>)}
        </div>
        {list.length === 0 && <p className="empty">Aucun produit ne correspond. <button className="link" onClick={() => goForm('demande')}>Demandez-le nous</button> : nous le cherchons au meilleur prix.</p>}
        <div className="grid">
          {list.map(p => (
            <article key={p.id} className="card" style={{ '--c': catOf(p.category).color } as React.CSSProperties} onClick={() => setOpen(p)}>
              <div className="card-img">
                <img src={p.image} alt={p.name} loading="lazy" referrerPolicy="no-referrer" />
                {p.condition === 'Reconditionné' ? <span className="tag tag-green">Reconditionné</span> : p.featured && <span className="tag">Sélection</span>}
              </div>
              <div className="card-body">
                <span className="brand">{p.brand}</span>
                <h3>{p.name}</h3>
                {p.rating && <span className="stars" aria-label={`Note ${p.rating} sur 5`}>{'★'.repeat(Math.round(p.rating))}<i>{'★'.repeat(5 - Math.round(p.rating))}</i> {p.rating.toLocaleString('fr-BE')}</span>}
                <div className="card-foot">
                  <strong className="price">{euro(p.price)}</strong>
                  <span className="badge">Amazon.com.be</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="note">Prix TTC relevés le {PRICE_DATE} sur Amazon.com.be, susceptibles d’évoluer : le prix affiché chez le marchand au moment de l’achat fait foi. Photos : marchand.</p>
        <div className="ask">
          <div><h3>Vous ne trouvez pas votre produit ?</h3><p>Cartouches, câble spécifique, PC sur mesure… Envoyez-nous votre demande, nous cherchons le meilleur prix pour vous.</p></div>
          <div className="actions"><button className="btn" onClick={() => goForm('demande')}>Faire une demande</button><a className="btn btn-wa" href={wa('Bonjour, je cherche le produit suivant : ')} target="_blank" rel="noopener"><Icon name="whatsapp" size={18} />WhatsApp</a></div>
        </div>
      </section>

      <section className="mc-teaser">
        <div className="wrap section">
          <div className="cat-head">
            <div>
              <p className="eyebrow eyebrow-mc">Boutique partenaire · Meta Cares</p>
              <h2 className="h2">Santé & soins à domicile</h2>
              <p className="sub left">{mc ? mc.products.length.toLocaleString('fr-BE') : '2 600+'} produits : incontinence, hygiène, mobilité, soins, nutrition… livrés en Belgique, livraison offerte dès 99 €.</p>
            </div>
            <a href="#/sante" className="btn btn-mc">Voir tout le catalogue santé<Icon name="arrow" size={18} /></a>
          </div>
          <div className="grid">{mcPicks.map(p => <McCard key={p.s} p={p} />)}</div>
        </div>
      </section>

      <section id="fonctionnement" className="band band-grad">
        <div className="wrap section">
          <h2 className="h2">Comment ça marche ?</h2>
          <p className="sub">Pas de stock, pas de surcoût : nous faisons le lien entre vous et le marchand le moins cher.</p>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}><span className="step-n">{i + 1}</span><span className="step-ic"><Icon name={s.icon} size={26} /></span><h3>{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="fournisseurs" className="wrap section">
        <h2 className="h2">Nos marchands partenaires</h2>
        <p className="sub">Chaque fiche indique qui vend, qui livre et qui contacter en cas de besoin.</p>
        <div className="suppliers">
          {SUPPLIERS.map(s => (
            <div key={s.id} className={`supplier sup-${s.id}`}>
              <div className="sup-head"><h3>{s.name}</h3><span className={s.kind === 'affiliation' ? 'badge' : 'badge badge-alt'}>{s.kind === 'affiliation' ? 'Achat chez le partenaire' : 'Vendu par nous'}</span></div>
              <p>{s.role}</p>
              <ul>
                <li><Icon name="truck" size={18} />{s.delivery}</li>
                <li><Icon name="return" size={18} />{s.returns}</li>
                <li><Icon name="chat" size={18} />{s.supportUrl ? <a href={s.supportUrl} target="_blank" rel="noopener">{s.support}</a> : s.support}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="retours" className="band">
        <div className="wrap section two">
          <div>
            <h2 className="h2">Retours & service après-vente</h2>
            <p className="sub left">Un souci avec un produit ? Voici à qui vous adresser.</p>
            <div className="sav">
              <div><h3><Icon name="store" size={22} />Acheté chez un partenaire</h3><p>Le marchand est votre vendeur : passez par son service client (lien sur la fiche et dans « Partenaires »). Il gère le retour, le remboursement et la garantie. Besoin d’aide pour la démarche ? Écrivez-nous.</p></div>
              <div><h3><Icon name="mail" size={22} />Commandé sur demande</h3><p>Utilisez le formulaire « Question / retour » ou WhatsApp, avec le produit et la date de livraison. Vous pouvez aussi utiliser le <a href="#/retractation">formulaire de rétractation</a>. Nous organisons le retour avec le fournisseur.</p></div>
            </div>
          </div>
          <ul className="facts">
            <li><strong>14 jours</strong><span>pour changer d’avis (30 j. chez la plupart des partenaires)</span></li>
            <li><strong>2 ans</strong><span>de garantie légale sur le neuf</span></li>
            <li><strong>1 an</strong><span>minimum sur le reconditionné</span></li>
          </ul>
        </div>
      </section>

      <section id="faq" className="wrap section narrow">
        <h2 className="h2">Questions fréquentes</h2>
        {FAQ.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>)}
      </section>

      <ContactSection form={form} setForm={setForm} />
      {open && <ProductModal p={open} onClose={() => setOpen(null)} onForm={goForm} />}
    </main>
  )
}

function ProductModal({ p, onClose, onForm }: { p: Product; onClose: () => void; onForm: (k: FormKind, p?: Product) => void }) {
  const s = supplierById(p.merchant)
  const cb = supplierById('coolblue'), bm = supplierById('backmarket')
  const short = p.name.split(' – ')[0]
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={e => e.stopPropagation()} style={{ '--c': catOf(p.category).color } as React.CSSProperties}>
        <button className="close" onClick={onClose} aria-label="Fermer"><Icon name="close" /></button>
        <div className="modal-img"><img src={p.image} alt={p.name} referrerPolicy="no-referrer" /></div>
        <div className="modal-body">
          <span className={p.condition === 'Neuf' ? 'badge static' : 'tag tag-green static'}>{p.condition}</span>
          <span className="brand">{p.brand}</span>
          <h2>{p.name}</h2>
          <p className="price big">{euro(p.price)} <small>TTC · relevé le {PRICE_DATE}</small></p>
          <ul className="specs">{p.specs.map(x => <li key={x}><Icon name="check" size={18} />{x}</li>)}</ul>
          <dl className="meta">
            <div><dt>Vendu par</dt><dd>{s.name} (vendeur indiqué sur sa page)</dd></div>
            <div><dt>Livraison</dt><dd>{s.delivery}</dd></div>
            <div><dt>Retours</dt><dd>{s.returns}</dd></div>
          </dl>
          <div className="actions">
            <a className="btn btn-buy" href={s.productUrl!(p.asin)} target="_blank" rel="sponsored noopener">Voir l’offre sur {s.name}<Icon name="arrow" size={18} /></a>
            <a className="btn btn-wa" href={wa(`Bonjour, une question sur : ${p.name}`)} target="_blank" rel="noopener"><Icon name="whatsapp" size={18} />Question</a>
          </div>
          <p className="compare">Comparer : <a href={cb.compareUrl!(short)} target="_blank" rel="noopener">Coolblue</a>{p.category === 'ordinateurs' && <> · <a href={bm.compareUrl!(short)} target="_blank" rel="noopener">Back Market</a></>} · <button className="link" onClick={() => onForm('demande', p)}>nous le demander</button></p>
          <p className="note">Lien partenaire : le prix et la disponibilité affichés chez {s.name} font foi. Retour ou souci : <a href={s.supportUrl} target="_blank" rel="noopener">{s.support}</a>.</p>
        </div>
      </div>
    </div>
  )
}

function ContactSection({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const titles: Record<FormKind, string> = { demande: 'Demande de produit', sav: 'Question / retour', contact: 'Message' }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const el = e.currentTarget
    const data = Object.fromEntries(new FormData(el).entries())
    setStatus('sending')
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `${SITE.name} – ${titles[form.kind]}${form.product ? ' : ' + form.product.name : ''}`, _replyto: data.email, _template: 'table' }),
      })
      setStatus(r.ok ? 'ok' : 'err')
      if (r.ok) el.reset()
    } catch { setStatus('err') }
  }

  return (
    <section id="contact" className="band">
      <div className="wrap section two">
        <div>
          <h2 className="h2">Contact</h2>
          <p className="sub left">Une demande de produit, une question, un retour ? Réponse sous 24 h ouvrables, souvent bien plus vite sur WhatsApp.</p>
          <ul className="contact-list">
            <li><Icon name="whatsapp" size={20} /><a href={wa('Bonjour TechMalin !')} target="_blank" rel="noopener">{SITE.phone}</a> · appel & WhatsApp</li>
            <li><Icon name="mail" size={20} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><Icon name="store" size={20} />{SITE.city} · sans magasin physique</li>
          </ul>
          <a className="btn btn-wa big-wa" href={wa('Bonjour TechMalin !')} target="_blank" rel="noopener"><Icon name="whatsapp" size={22} />Écrire sur WhatsApp</a>
        </div>
        <form className="form" onSubmit={submit}>
          <div className="seg">
            {(Object.keys(titles) as FormKind[]).map(k => (
              <button type="button" key={k} className={form.kind === k ? 'on' : ''} onClick={() => setForm({ ...form, kind: k })}>{titles[k]}</button>
            ))}
          </div>
          <input type="hidden" name="type" value={titles[form.kind]} />
          <label>Produit concerné<input className="input" name="produit" key={form.product?.id ?? 'none'} defaultValue={form.product?.name ?? ''} placeholder="Ex. : hub USB-C 5 en 1" /></label>
          <div className="row">
            <label>Nom *<input className="input" name="nom" required autoComplete="name" /></label>
            <label>E-mail *<input className="input" type="email" name="email" required autoComplete="email" /></label>
          </div>
          {form.kind === 'sav' && <label>N° de commande / date de livraison<input className="input" name="commande" /></label>}
          <label>Message *<textarea className="input" name="message" rows={4} required
            placeholder={form.kind === 'demande' ? 'Produit recherché, quantité, budget, code postal de livraison…' : form.kind === 'sav' ? 'Décrivez le problème ou le motif du retour…' : 'Votre message…'} /></label>
          <label className="check"><input type="checkbox" required /> <span>J’accepte que mes données soient utilisées pour traiter ma demande, selon la <a href="#/confidentialite">politique de confidentialité</a>.</span></label>
          <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Envoi…' : 'Envoyer'}</button>
          {status === 'ok' && <p className="ok">Merci ! Votre message est bien envoyé, nous revenons vers vous rapidement.</p>}
          {status === 'err' && <p className="err">L’envoi a échoué. Écrivez-nous sur WhatsApp ou à {SITE.email}.</p>}
        </form>
      </div>
    </section>
  )
}
