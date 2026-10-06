// Catalogue du site vitrine. Prix TTC INDICATIFS : à remplacer par les prix
// réels du fournisseur (prix d'achat + votre marge) avant la mise en ligne.

export type CategoryId =
  | 'peripheriques' | 'stockage' | 'cables' | 'reseau' | 'audio-video' | 'ordinateurs' | 'bureau'

export type IconName =
  | 'mouse' | 'keyboard' | 'usb' | 'sd' | 'ssd' | 'hdd' | 'cable' | 'charger' | 'hub' | 'adapter'
  | 'webcam' | 'headset' | 'router' | 'wifi' | 'switch' | 'ethernet' | 'power' | 'monitor'
  | 'laptop' | 'desktop' | 'printer' | 'stand' | 'clean'

export interface Category { id: CategoryId; label: string; icon: IconName; blurb: string }

export interface Product {
  id: string
  name: string
  category: CategoryId
  icon: IconName
  price: number            // € TTC, prix « à partir de »
  condition: 'Neuf' | 'Reconditionné'
  specs: string[]
  supplierId: string
  deliveryDays: string
  featured?: boolean
}

export const CATEGORIES: Category[] = [
  { id: 'peripheriques', label: 'Souris & claviers', icon: 'keyboard', blurb: 'AZERTY belge, sans fil, ergonomie.' },
  { id: 'stockage', label: 'Stockage', icon: 'ssd', blurb: 'Clés USB, cartes, SSD, disques.' },
  { id: 'cables', label: 'Câbles & chargeurs', icon: 'charger', blurb: 'USB-C, HDMI, hubs, chargeurs GaN.' },
  { id: 'reseau', label: 'Réseau & Wi-Fi', icon: 'router', blurb: 'Routeurs, répéteurs, switchs.' },
  { id: 'audio-video', label: 'Visio & audio', icon: 'webcam', blurb: 'Webcams, casques, écrans.' },
  { id: 'ordinateurs', label: 'PC reconditionnés', icon: 'laptop', blurb: 'Portables et fixes testés, garantis.' },
  { id: 'bureau', label: 'Bureau & protection', icon: 'power', blurb: 'Imprimantes, multiprises, supports.' },
]

export const PRODUCTS: Product[] = [
  { id: 'souris-sans-fil', name: 'Souris sans fil silencieuse', category: 'peripheriques', icon: 'mouse', price: 7.9, condition: 'Neuf',
    specs: ['Récepteur USB 2,4 GHz', 'Clics silencieux, 1600 DPI', 'Pile AA incluse, autonomie ~12 mois'], supplierId: 'dropship', deliveryDays: '3 à 7 jours', featured: true },
  { id: 'kit-clavier-souris', name: 'Kit clavier + souris sans fil AZERTY belge', category: 'peripheriques', icon: 'keyboard', price: 19.9, condition: 'Neuf',
    specs: ['Disposition AZERTY BE', 'Un seul récepteur USB', 'Touches multimédia'], supplierId: 'amazon', deliveryDays: '2 à 4 jours', featured: true },
  { id: 'clavier-filaire', name: 'Clavier USB filaire AZERTY belge', category: 'peripheriques', icon: 'keyboard', price: 11.9, condition: 'Neuf',
    specs: ['Plug & play USB', 'Résistant aux éclaboussures', 'Câble 1,5 m'], supplierId: 'amazon', deliveryDays: '2 à 4 jours' },

  { id: 'cle-usb-64', name: 'Clé USB 3.2 – 64 Go', category: 'stockage', icon: 'usb', price: 6.9, condition: 'Neuf',
    specs: ['Lecture jusqu’à 100 Mo/s', 'Boîtier métal avec anneau', 'Compatible Windows, macOS, TV'], supplierId: 'dropship', deliveryDays: '3 à 7 jours', featured: true },
  { id: 'microsd-128', name: 'Carte microSD 128 Go + adaptateur', category: 'stockage', icon: 'sd', price: 11.9, condition: 'Neuf',
    specs: ['Classe A1 / U3 / V30', 'Idéale smartphone, tablette, caméra', 'Adaptateur SD fourni'], supplierId: 'amazon', deliveryDays: '2 à 4 jours' },
  { id: 'ssd-externe-1to', name: 'SSD externe portable 1 To USB-C', category: 'stockage', icon: 'ssd', price: 59.9, condition: 'Neuf',
    specs: ['Jusqu’à 1000 Mo/s', 'Câbles USB-C et USB-A fournis', 'Format de poche, antichoc'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours', featured: true },
  { id: 'ssd-interne-500', name: 'SSD interne SATA 2,5" – 500 Go', category: 'stockage', icon: 'ssd', price: 32.9, condition: 'Neuf',
    specs: ['Redonne vie à un vieux PC', 'Lecture ~550 Mo/s', 'Garantie fabricant 3 ans'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours' },
  { id: 'hdd-externe-2to', name: 'Disque dur externe 2 To', category: 'stockage', icon: 'hdd', price: 69.9, condition: 'Neuf',
    specs: ['USB 3.0, alimenté par le port', 'Pour sauvegardes et photos', 'Logiciel de sauvegarde inclus'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours' },

  { id: 'cable-usbc-2m', name: 'Câble USB-C vers USB-C 2 m (60 W)', category: 'cables', icon: 'cable', price: 5.9, condition: 'Neuf',
    specs: ['Charge rapide 60 W', 'Données 480 Mb/s', 'Gaine tressée renforcée'], supplierId: 'dropship', deliveryDays: '3 à 7 jours', featured: true },
  { id: 'chargeur-gan-65', name: 'Chargeur GaN 65 W – 2 USB-C + 1 USB-A', category: 'cables', icon: 'charger', price: 24.9, condition: 'Neuf',
    specs: ['Charge un portable USB-C + un smartphone', 'Compact, technologie GaN', 'Protections surchauffe / surtension, marquage CE'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours', featured: true },
  { id: 'hub-usbc-7en1', name: 'Hub USB-C 7-en-1 (HDMI 4K, USB, SD, 100 W)', category: 'cables', icon: 'hub', price: 22.9, condition: 'Neuf',
    specs: ['HDMI 4K 30 Hz', '3 × USB-A 3.0, lecteur SD/microSD', 'Charge traversante 100 W'], supplierId: 'dropship', deliveryDays: '3 à 7 jours' },
  { id: 'adaptateur-hdmi-vga', name: 'Adaptateur HDMI vers VGA', category: 'cables', icon: 'adapter', price: 7.9, condition: 'Neuf',
    specs: ['Pour vieux écrans et projecteurs', '1080p', 'Sortie audio jack'], supplierId: 'dropship', deliveryDays: '3 à 7 jours' },

  { id: 'routeur-wifi6', name: 'Routeur Wi-Fi 6 AX1800', category: 'reseau', icon: 'router', price: 49.9, condition: 'Neuf',
    specs: ['Wi-Fi 6 double bande', '4 ports Gigabit', 'Configuration via application'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours', featured: true },
  { id: 'repeteur-wifi', name: 'Répéteur Wi-Fi double bande', category: 'reseau', icon: 'wifi', price: 19.9, condition: 'Neuf',
    specs: ['Supprime les zones blanches', 'Bouton WPS', 'Port Ethernet'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours' },
  { id: 'switch-5p', name: 'Switch 5 ports Gigabit', category: 'reseau', icon: 'switch', price: 14.9, condition: 'Neuf',
    specs: ['Plug & play, sans configuration', 'Boîtier métal', 'Économie d’énergie'], supplierId: 'coolblue', deliveryDays: '1 à 3 jours' },
  { id: 'cable-rj45-5m', name: 'Câble Ethernet Cat6 – 5 m', category: 'reseau', icon: 'ethernet', price: 4.9, condition: 'Neuf',
    specs: ['Jusqu’à 1 Gb/s', 'Connecteurs RJ45 blindés', 'Existe en 1, 2, 10 et 20 m'], supplierId: 'amazon', deliveryDays: '2 à 4 jours' },

  { id: 'webcam-1080p', name: 'Webcam Full HD 1080p avec micro', category: 'audio-video', icon: 'webcam', price: 19.9, condition: 'Neuf',
    specs: ['Teams, Zoom, Meet', 'Micro antibruit intégré', 'Clip universel + cache'], supplierId: 'dropship', deliveryDays: '3 à 7 jours', featured: true },
  { id: 'casque-usb', name: 'Casque micro USB pour visio', category: 'audio-video', icon: 'headset', price: 16.9, condition: 'Neuf',
    specs: ['Micro orientable', 'Télécommande sur le câble', 'Léger, coussinets confort'], supplierId: 'dropship', deliveryDays: '3 à 7 jours' },
  { id: 'ecran-24', name: 'Écran 24" Full HD IPS 100 Hz', category: 'audio-video', icon: 'monitor', price: 89, condition: 'Neuf',
    specs: ['Dalle IPS, bords fins', 'HDMI + VGA', 'Fixation VESA'], supplierId: 'coolblue', deliveryDays: '2 à 5 jours' },

  { id: 'portable-reco-14', name: 'PC portable 14" reconditionné – i5, 8 Go, SSD 256 Go', category: 'ordinateurs', icon: 'laptop', price: 229, condition: 'Reconditionné',
    specs: ['Grade A, testé et nettoyé', 'Windows 11 installé', 'Clavier AZERTY, garantie 12 mois minimum'], supplierId: 'backmarket', deliveryDays: '2 à 5 jours', featured: true },
  { id: 'mini-pc-reco', name: 'Mini PC fixe reconditionné – i5, 16 Go, SSD 512 Go', category: 'ordinateurs', icon: 'desktop', price: 199, condition: 'Reconditionné',
    specs: ['Format compact, silencieux', 'Windows 11 installé', 'Idéal bureautique, garantie 12 mois minimum'], supplierId: 'backmarket', deliveryDays: '2 à 5 jours' },

  { id: 'imprimante-mfp', name: 'Imprimante multifonction jet d’encre Wi-Fi', category: 'bureau', icon: 'printer', price: 59, condition: 'Neuf',
    specs: ['Impression, copie, scan', 'Impression depuis smartphone', 'Cartouches standard faciles à trouver'], supplierId: 'coolblue', deliveryDays: '2 à 5 jours' },
  { id: 'multiprise-parafoudre', name: 'Multiprise parafoudre 6 prises + 2 USB', category: 'bureau', icon: 'power', price: 19.9, condition: 'Neuf',
    specs: ['Protège PC et box des surtensions', 'Interrupteur, câble 1,5 m', 'Prises type E (Belgique)'], supplierId: 'dropship', deliveryDays: '3 à 7 jours' },
  { id: 'support-portable', name: 'Support ordinateur portable en aluminium', category: 'bureau', icon: 'stand', price: 15.9, condition: 'Neuf',
    specs: ['Réglable en hauteur', 'Pliable, de 10" à 17"', 'Améliore la posture'], supplierId: 'dropship', deliveryDays: '3 à 7 jours' },
  { id: 'kit-nettoyage', name: 'Kit de nettoyage écran & clavier', category: 'bureau', icon: 'clean', price: 6.9, condition: 'Neuf',
    specs: ['Spray 200 ml + microfibre', 'Brosse pour clavier', 'Sans alcool, sûr pour les écrans'], supplierId: 'dropship', deliveryDays: '3 à 7 jours' },
]
