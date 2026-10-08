import { SITE } from '../config'

// Marchands partenaires. Sur ce site, l'achat se fait chez le marchand :
// c'est lui le vendeur (paiement, livraison, retours, garantie).
// « Sur demande » : produit introuvable dans le catalogue, TechMalin le source
// auprès d'un fournisseur — TechMalin est alors le vendeur (voir CGV).

export interface Supplier {
  id: string
  name: string
  kind: 'affiliation' | 'demande'
  role: string
  delivery: string
  returns: string
  support: string
  supportUrl?: string
  productUrl?: (ref: string) => string
  compareUrl?: (q: string) => string
}

const enc = encodeURIComponent
const tag = SITE.amazonTag ? `?tag=${enc(SITE.amazonTag)}` : ''

export const SUPPLIERS: Supplier[] = [
  {
    id: 'amazon', name: 'Amazon.com.be', kind: 'affiliation',
    role: 'Notre source principale : les prix les plus bas relevés sur l’essentiel informatique.',
    delivery: 'Livraison en Belgique, souvent en 1 à 3 jours (selon le vendeur).',
    returns: 'Retour sous 30 jours via « Vos commandes » ; garantie légale 2 ans.',
    support: 'Aide Amazon.com.be', supportUrl: 'https://www.amazon.com.be/gp/help/customer/display.html',
    productUrl: asin => `https://www.amazon.com.be/dp/${asin}${tag}`,
  },
  {
    id: 'coolblue', name: 'Coolblue', kind: 'affiliation',
    role: 'Alternative belge avec magasins et livraison le lendemain, souvent un peu plus chère.',
    delivery: 'Commandé avant 23 h 59, livré le lendemain en Belgique.',
    returns: '30 jours pour changer d’avis, service après-vente Coolblue.',
    support: 'Service client Coolblue', supportUrl: 'https://www.coolblue.be/fr/service-client',
    compareUrl: q => `https://www.coolblue.be/fr/rechercher?query=${enc(q)}`,
  },
  {
    id: 'backmarket', name: 'Back Market', kind: 'affiliation',
    role: 'Spécialiste du reconditionné : PC portables et fixes testés, garantis 1 an minimum.',
    delivery: 'Livraison en Belgique par le reconditionneur.',
    returns: '30 jours pour changer d’avis, garantie 12 mois minimum.',
    support: 'Aide Back Market', supportUrl: 'https://www.backmarket.be/fr-be/help',
    compareUrl: q => `https://www.backmarket.be/fr-be/search?q=${enc(q)}`,
  },
  {
    id: 'metacares', name: 'Meta Cares', kind: 'affiliation',
    role: 'Boutique partenaire belge pour la santé et les soins à domicile : plus de 2 600 produits.',
    delivery: 'Livraison suivie en Belgique, offerte dès 99 €.',
    returns: 'Retours sous 30 jours, paiement Bancontact et cartes via Stripe.',
    support: 'Contact Meta Cares', supportUrl: 'https://www.metacares.shop/contact',
  },
  {
    id: 'demande', name: `${SITE.name} – sur demande`, kind: 'demande',
    role: 'Un produit absent du catalogue ? Nous le cherchons au meilleur prix auprès de nos fournisseurs.',
    delivery: 'Délai communiqué avec le devis, livraison en Belgique.',
    returns: '14 jours pour changer d’avis ; nous gérons le retour avec le fournisseur.',
    support: 'Formulaire « Question / retour » ou WhatsApp',
  },
]

export const supplierById = (id: string) => SUPPLIERS.find(s => s.id === id)!
