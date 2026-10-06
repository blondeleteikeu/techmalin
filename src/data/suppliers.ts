// Fournisseurs partenaires. Deux modèles :
//  - 'affiliation' : le client achète chez le marchand (vendeur = marchand, il gère retours & SAV).
//    Remplacez `searchUrl` par vos liens affiliés une fois inscrit au programme.
//  - 'demande'     : le client envoie une demande au site, transmise au fournisseur qui expédie.
//    Attention : dans ce modèle, c'est VOUS le vendeur légal (rétractation 14 j, garantie 2 ans).

export type SupplierModel = 'affiliation' | 'demande'

export interface Supplier {
  id: string
  name: string
  model: SupplierModel
  role: string
  delivery: string
  returns: string
  support: string           // où le client s'adresse pour une question / un retour
  supportUrl?: string
  searchUrl?: (q: string) => string
}

const enc = encodeURIComponent

export const SUPPLIERS: Supplier[] = [
  {
    id: 'coolblue', name: 'Coolblue', model: 'affiliation',
    role: 'Stockage, réseau, écrans, imprimantes et chargeurs de marque.',
    delivery: 'Livraison en Belgique, souvent le lendemain.',
    returns: 'Retours et garantie gérés directement par Coolblue.',
    support: 'Service client Coolblue', supportUrl: 'https://www.coolblue.be/fr/service-client',
    searchUrl: q => `https://www.coolblue.be/fr/rechercher?query=${enc(q)}`,
  },
  {
    id: 'amazon', name: 'Amazon.com.be', model: 'affiliation',
    role: 'Claviers AZERTY belges, câbles, cartes mémoire : large choix à petit prix.',
    delivery: 'Livraison en Belgique selon le vendeur Amazon.',
    returns: 'Retours via « Vos commandes » sur Amazon, selon la politique du vendeur.',
    support: 'Aide Amazon.com.be', supportUrl: 'https://www.amazon.com.be/gp/help/customer/display.html',
    searchUrl: q => `https://www.amazon.com.be/s?k=${enc(q)}`,
  },
  {
    id: 'backmarket', name: 'Back Market', model: 'affiliation',
    role: 'PC portables et fixes reconditionnés, testés et garantis.',
    delivery: 'Livraison en Belgique par le reconditionneur.',
    returns: '30 jours pour changer d’avis, garantie 12 mois minimum.',
    support: 'Aide Back Market', supportUrl: 'https://www.backmarket.be/fr-be/help',
    searchUrl: q => `https://www.backmarket.be/fr-be/search?q=${enc(q)}`,
  },
  {
    id: 'dropship', name: 'Fournisseur partenaire UE', model: 'demande',
    role: 'Petits accessoires à prix réduit (souris, câbles, hubs, webcams…), expédiés depuis un entrepôt européen.',
    delivery: 'Expédition depuis l’UE, 2 à 7 jours ouvrables.',
    returns: '14 jours pour changer d’avis. Nous organisons le retour avec le fournisseur.',
    support: 'Formulaire « Question / retour » de ce site',
  },
]

export const supplierById = (id: string) => SUPPLIERS.find(s => s.id === id)!
