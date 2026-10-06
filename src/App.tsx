import { useEffect, useMemo, useState } from 'react'
import Icon from './components/Icon'
import { CATEGORIES, PRODUCTS, type CategoryId, type Product } from './data/catalog'
import { SUPPLIERS, supplierById } from './data/suppliers'
import { FORM_ENDPOINT, SITE } from './config'

const euro = (n: number) => n.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })

type FormKind = 'demande' | 'sav' | 'contact'
interface FormState { kind: FormKind; product?: Product }

const STEPS = [
  { icon: 'search', title: 'Vous choisissez', text: 'Parcourez le catalogue : chaque fiche indique le prix, le fournisseur et le délai de livraison.' },
  { icon: 'store', title: 'Vous commandez au bon endroit', text: 'Achat direct chez le marchand partenaire, ou demande envoyée ici et transmise au fournisseur.' },
  { icon: 'truck', title: 'Le fournisseur expédie', text: 'Pas de stock intermédiaire : le produit part directement de l’entrepôt du fournisseur chez vous.' },
  { icon: 'chat', title: 'On reste joignables', text: 'Une question, un retour ? Nous vous mettons en relation avec le bon interlocuteur.' },
] as const

const FAQ = [
  ['Qui me vend le produit ?', 'Le vendeur est indiqué sur chaque fiche. Pour les offres « Achat chez le partenaire », c’est le marchand (Coolblue, Amazon, Back Market) qui vous vend et vous facture. Pour les offres « Sur demande », c’est ' + SITE.name + ' qui vous vend, et le fournisseur expédie.'],
  ['Pourquoi les prix sont-ils bas ?', 'Nous n’avons ni stock ni magasin : nous sélectionnons des produits essentiels au meilleur rapport qualité-prix et vous dirigeons vers les fournisseurs les moins chers.'],
  ['Comment faire un retour ?', 'Vous avez 14 jours pour changer d’avis. Achat chez un partenaire : passez par son service client (lien sur la fiche). Achat sur demande : utilisez le formulaire « Question / retour », nous organisons le retour avec le fournisseur.'],
  ['Quelle garantie ?', 'Les produits neufs bénéficient de la garantie légale de 2 ans. Les reconditionnés sont garantis au moins 12 mois, selon le reconditionneur.'],
  ['Les claviers sont-ils en AZERTY belge ?', 'Oui, sauf mention contraire sur la fiche. Vérifiez la disposition avant de commander.'],
  ['Livrez-vous partout en Belgique ?', 'Oui. Le délai dépend du fournisseur ; il est affiché sur chaque fiche.'],
] as const

export default function App() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CategoryId | 'all'>('all')
  const [sort, setSort] = useState<'pop' | 'asc' | 'desc'>('pop')
  const [open, setOpen] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>({ kind: 'contact' })
  const [menu, setMenu] = useState(false)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const r = PRODUCTS.filter(p => (cat === 'all' || p.category === cat) &&
      (!q || (p.name + ' ' + p.specs.join(' ')).toLowerCase().includes(q)))
    if (sort === 'asc') r.sort((a, b) => a.price - b.price)
    if (sort === 'desc') r.sort((a, b) => b.price - a.price)
    if (sort === 'pop') r.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return r
  }, [query, cat, sort])

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
  const pickCat = (c: CategoryId) => {
    setCat(c); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="header">
        <div className="wrap header-in">
          <a href="#top" className="logo"><span className="logo-mark"><Icon name="laptop" size={20} /></span>{SITE.name}</a>
          <nav className={menu ? 'nav open' : 'nav'} onClick={() => setMenu(false)}>
            <a href="#catalogue">Catalogue</a>
            <a href="#fonctionnement">Comment ça marche</a>
            <a href="#fournisseurs">Fournisseurs</a>
            <a href="#retours">Retours & SAV</a>
            <a href="#faq">FAQ</a>
            <a href="#contact" className="btn btn-sm">Contact</a>
          </nav>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><span /><span /><span /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-in">
            <div>
              <p className="eyebrow">Matériel informatique essentiel · Belgique</p>
              <h1>L’essentiel informatique,<br /><span>au juste prix.</span></h1>
              <p className="lead">Souris, câbles, stockage, Wi-Fi, PC reconditionnés… Nous sélectionnons les offres les moins chères chez des fournisseurs fiables et vous mettons en relation, sans intermédiaire inutile.</p>
              <form className="search" onSubmit={e => { e.preventDefault(); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <Icon name="search" size={20} />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher : clé USB, hub USB-C, routeur…" aria-label="Rechercher un produit" />
                <button className="btn">Chercher</button>
              </form>
              <ul className="trust">
                <li><Icon name="euro" size={18} />Prix bas sélectionnés</li>
                <li><Icon name="truck" size={18} />Livraison en Belgique</li>
                <li><Icon name="shield" size={18} />Garantie légale 2 ans</li>
              </ul>
            </div>
            <div className="hero-art" aria-hidden="true">
              {(['laptop', 'mouse', 'router', 'ssd', 'headset', 'charger'] as const).map((n, i) => (
                <div key={n} className={`tile t${i}`}><Icon name={n} size={i === 0 ? 72 : 40} /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section">
          <h2 className="h2">Nos rayons</h2>
          <div className="cats">
            {CATEGORIES.map(c => (
              <button key={c.id} className="cat" onClick={() => pickCat(c.id)}>
                <span className="cat-ic"><Icon name={c.icon} size={26} /></span>
                <strong>{c.label}</strong><small>{c.blurb}</small>
              </button>
            ))}
          </div>
        </section>

        <section id="catalogue" className="wrap section">
          <div className="cat-head">
            <h2 className="h2">Catalogue <small>{list.length} produit{list.length > 1 ? 's' : ''}</small></h2>
            <div className="filters">
              <input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher…" aria-label="Filtrer" />
              <select className="input" value={sort} onChange={e => setSort(e.target.value as typeof sort)} aria-label="Trier">
                <option value="pop">Populaires d’abord</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
          </div>
          <div className="chips">
            <button className={cat === 'all' ? 'chip on' : 'chip'} onClick={() => setCat('all')}>Tout</button>
            {CATEGORIES.map(c => <button key={c.id} className={cat === c.id ? 'chip on' : 'chip'} onClick={() => setCat(c.id)}>{c.label}</button>)}
          </div>
          {list.length === 0 && <p className="empty">Aucun produit ne correspond. <button className="link" onClick={() => goForm('demande')}>Demandez-le nous</button>, nous le cherchons pour vous.</p>}
          <div className="grid">
            {list.map(p => {
              const s = supplierById(p.supplierId)
              return (
                <article key={p.id} className="card" onClick={() => setOpen(p)}>
                  <div className="card-img"><Icon name={p.icon} size={64} />
                    {p.condition === 'Reconditionné' && <span className="tag tag-green">Reconditionné</span>}
                    {p.featured && p.condition === 'Neuf' && <span className="tag">Populaire</span>}
                  </div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <p className="muted">{p.specs[0]}</p>
                    <div className="card-foot">
                      <div><span className="from">à partir de</span><strong className="price">{euro(p.price)}</strong></div>
                      <span className={s.model === 'affiliation' ? 'badge' : 'badge badge-alt'}>{s.model === 'affiliation' ? s.name : 'Sur demande'}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="note">Prix TTC indicatifs, susceptibles d’évoluer : le prix final est celui affiché par le vendeur au moment de la commande.</p>
        </section>

        <section id="fonctionnement" className="band">
          <div className="wrap section">
            <h2 className="h2">Comment ça marche ?</h2>
            <p className="sub">Pas de stock, pas de surcoût : nous faisons le lien entre vous et le fournisseur le moins cher.</p>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title}><span className="step-n">{i + 1}</span><Icon name={s.icon} size={30} /><h3>{s.title}</h3><p>{s.text}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="fournisseurs" className="wrap section">
          <h2 className="h2">Nos fournisseurs partenaires</h2>
          <p className="sub">Chaque produit indique clairement qui le vend, qui l’expédie et qui contacter en cas de besoin.</p>
          <div className="suppliers">
            {SUPPLIERS.map(s => (
              <div key={s.id} className="supplier">
                <div className="sup-head"><h3>{s.name}</h3><span className={s.model === 'affiliation' ? 'badge' : 'badge badge-alt'}>{s.model === 'affiliation' ? 'Achat chez le partenaire' : 'Sur demande'}</span></div>
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
                <div><h3><Icon name="store" size={22} />Acheté chez un partenaire</h3><p>Le marchand est votre vendeur : contactez son service client (lien sur la fiche produit et dans « Fournisseurs »). Il gère le retour, le remboursement et la garantie.</p></div>
                <div><h3><Icon name="mail" size={22} />Commandé sur demande</h3><p>Écrivez-nous via le formulaire « Question / retour » en précisant le produit et la date de livraison. Nous organisons le retour avec le fournisseur et vous tenons informé.</p></div>
              </div>
            </div>
            <ul className="facts">
              <li><strong>14 jours</strong><span>pour changer d’avis</span></li>
              <li><strong>2 ans</strong><span>de garantie légale sur le neuf</span></li>
              <li><strong>12 mois</strong><span>minimum sur le reconditionné</span></li>
            </ul>
          </div>
        </section>

        <section id="faq" className="wrap section narrow">
          <h2 className="h2">Questions fréquentes</h2>
          {FAQ.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>)}
        </section>

        <ContactSection form={form} setForm={setForm} />
      </main>

      <footer className="footer">
        <div className="wrap foot-in">
          <div><a href="#top" className="logo light"><span className="logo-mark"><Icon name="laptop" size={20} /></span>{SITE.name}</a><p>{SITE.tagline}</p></div>
          <div><h4>Contact</h4><p>{SITE.city}<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />{SITE.phone}</p></div>
          <div><h4>Informations</h4><p>N° d’entreprise : {SITE.bce}<br />Prix TTC indicatifs.<br />Certains liens sont des liens d’affiliation : nous percevons une commission, sans surcoût pour vous.</p></div>
        </div>
        <p className="copy">© {new Date().getFullYear()} {SITE.name} · Site vitrine et de mise en relation, sans stock.</p>
      </footer>

      {open && <ProductModal p={open} onClose={() => setOpen(null)} onForm={goForm} />}
    </>
  )
}

function ProductModal({ p, onClose, onForm }: { p: Product; onClose: () => void; onForm: (k: FormKind, p?: Product) => void }) {
  const s = supplierById(p.supplierId)
  const aff = s.model === 'affiliation'
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Fermer"><Icon name="close" /></button>
        <div className="modal-img"><Icon name={p.icon} size={110} /></div>
        <div className="modal-body">
          <span className={p.condition === 'Neuf' ? 'badge static' : 'tag tag-green static'}>{p.condition}</span>
          <h2>{p.name}</h2>
          <p className="price big"><span className="from">à partir de</span> {euro(p.price)} <small>TTC</small></p>
          <ul className="specs">{p.specs.map(x => <li key={x}><Icon name="check" size={18} />{x}</li>)}</ul>
          <dl className="meta">
            <div><dt>Vendu par</dt><dd>{aff ? s.name : `${SITE.name} — expédié par un fournisseur partenaire de l’UE`}</dd></div>
            <div><dt>Livraison</dt><dd>{p.deliveryDays} ouvrables</dd></div>
            <div><dt>Retours</dt><dd>{s.returns}</dd></div>
          </dl>
          <div className="actions">
            {aff && s.searchUrl
              ? <a className="btn" href={s.searchUrl(p.name)} target="_blank" rel="sponsored noopener">Voir l’offre chez {s.name}<Icon name="arrow" size={18} /></a>
              : <button className="btn" onClick={() => onForm('demande', p)}>Demander ce produit</button>}
            <a className="btn btn-ghost" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour, une question sur : ${p.name}`)}`} target="_blank" rel="noopener"><Icon name="whatsapp" size={18} />WhatsApp</a>
          </div>
          <button className="link small" onClick={() => aff && s.supportUrl ? window.open(s.supportUrl, '_blank', 'noopener') : onForm('sav', p)}>
            Question ou retour sur ce produit ? {aff ? `Service client ${s.name}` : 'Contactez-nous'}
          </button>
          {aff && <p className="note">Lien partenaire : le prix et la disponibilité affichés chez {s.name} font foi.</p>}
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
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    setStatus('sending')
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `${SITE.name} – ${titles[form.kind]}${form.product ? ' : ' + form.product.name : ''}`, _replyto: data.email, _template: 'table' }),
      })
      setStatus(r.ok ? 'ok' : 'err')
      if (r.ok) e.currentTarget?.reset()
    } catch { setStatus('err') }
  }

  return (
    <section id="contact" className="band">
      <div className="wrap section two">
        <div>
          <h2 className="h2">Contact</h2>
          <p className="sub left">Une demande de produit, une question, un retour ? Réponse sous 24 h ouvrables.</p>
          <ul className="contact-list">
            <li><Icon name="mail" size={20} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><Icon name="whatsapp" size={20} /><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener">WhatsApp {SITE.phone}</a></li>
            <li><Icon name="store" size={20} />{SITE.city} · sans magasin physique</li>
          </ul>
        </div>
        <form className="form" onSubmit={submit}>
          <div className="seg">
            {(Object.keys(titles) as FormKind[]).map(k => (
              <button type="button" key={k} className={form.kind === k ? 'on' : ''} onClick={() => setForm({ ...form, kind: k })}>{titles[k]}</button>
            ))}
          </div>
          <input type="hidden" name="type" value={titles[form.kind]} />
          <label>Produit concerné<input className="input" name="produit" key={form.product?.id ?? 'none'} defaultValue={form.product?.name ?? ''} placeholder="Ex. : Hub USB-C 7-en-1" /></label>
          <div className="row">
            <label>Nom *<input className="input" name="nom" required autoComplete="name" /></label>
            <label>E-mail *<input className="input" type="email" name="email" required autoComplete="email" /></label>
          </div>
          {form.kind === 'sav' && <label>N° de commande / date de livraison<input className="input" name="commande" /></label>}
          <label>Message *<textarea className="input" name="message" rows={4} required
            placeholder={form.kind === 'demande' ? 'Quantité, couleur, adresse de livraison (code postal)…' : form.kind === 'sav' ? 'Décrivez le problème ou le motif du retour…' : 'Votre message…'} /></label>
          <label className="check"><input type="checkbox" required /> J’accepte que mes données soient utilisées pour traiter ma demande (et transmises au fournisseur si nécessaire).</label>
          <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Envoi…' : 'Envoyer'}</button>
          {status === 'ok' && <p className="ok">Merci ! Votre message est bien envoyé, nous revenons vers vous rapidement.</p>}
          {status === 'err' && <p className="err">L’envoi a échoué. Écrivez-nous directement à {SITE.email}.</p>}
        </form>
      </div>
    </section>
  )
}
