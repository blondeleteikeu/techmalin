// Catalogue : vrais produits, prix TTC relevés sur Amazon.com.be le 6 octobre 2026.
// Les prix changent souvent : refaites un relevé avant chaque campagne. Le prix
// affiché chez le marchand au moment de l'achat fait toujours foi.

export const PRICE_DATE = '6 octobre 2026'

export type CategoryId =
  | 'peripheriques' | 'stockage' | 'cables' | 'reseau' | 'audio-video' | 'ordinateurs' | 'bureau'

export type IconName =
  | 'mouse' | 'keyboard' | 'usb' | 'sd' | 'ssd' | 'hdd' | 'cable' | 'charger' | 'hub' | 'adapter'
  | 'webcam' | 'headset' | 'router' | 'wifi' | 'switch' | 'ethernet' | 'power' | 'monitor'
  | 'laptop' | 'desktop' | 'printer' | 'stand' | 'clean'

export interface Category { id: CategoryId; label: string; icon: IconName; blurb: string; color: string }

export interface Product {
  id: string
  name: string
  brand: string
  category: CategoryId
  icon: IconName
  image: string
  price: number             // € TTC relevé le PRICE_DATE
  rating?: number           // note /5 chez le marchand
  condition: 'Neuf' | 'Reconditionné'
  specs: string[]
  merchant: 'amazon'
  asin: string
  featured?: boolean
}

// Une couleur par rayon, tirée des accents présents sur les photos produits
// (framboise SanDisk/Mercusys, cyan des écrans, indigo du ThinkPad).
export const CATEGORIES: Category[] = [
  { id: 'peripheriques', label: 'Souris & claviers', icon: 'keyboard', blurb: 'AZERTY belge, sans fil, silencieux.', color: '#6366f1' },
  { id: 'stockage', label: 'Stockage', icon: 'ssd', blurb: 'Clés USB, cartes, SSD, disques.', color: '#e11d48' },
  { id: 'cables', label: 'Câbles & chargeurs', icon: 'charger', blurb: 'USB-C, HDMI, hubs, chargeurs GaN.', color: '#0891b2' },
  { id: 'reseau', label: 'Réseau & Wi-Fi', icon: 'router', blurb: 'Routeurs Wi-Fi 6, répéteurs, switchs.', color: '#0d9488' },
  { id: 'audio-video', label: 'Visio & écrans', icon: 'webcam', blurb: 'Webcams, casques, écrans.', color: '#7c3aed' },
  { id: 'ordinateurs', label: 'PC reconditionnés', icon: 'laptop', blurb: 'Portables testés et garantis.', color: '#4f46e5' },
  { id: 'bureau', label: 'Bureau & protection', icon: 'power', blurb: 'Imprimantes, multiprises, supports.', color: '#db2777' },
]

const img = (id: string) => `https://m.media-amazon.com/images/I/${id}._AC_SL500_.jpg`

export const PRODUCTS: Product[] = [
  { id: 'logitech-m185', name: 'Logitech M185 – souris sans fil', brand: 'Logitech', category: 'peripheriques', icon: 'mouse',
    image: img('51WN5aXZWIL'), price: 9.02, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B00552K0GM', featured: true,
    specs: ['Sans fil 2,4 GHz', 'Mini récepteur USB', 'Compacte, ambidextre'] },
  { id: 'logitech-m220', name: 'Logitech M220 Silent – souris sans fil silencieuse', brand: 'Logitech', category: 'peripheriques', icon: 'mouse',
    image: img('51yfTfmb3BL'), price: 12.05, rating: 4.5, condition: 'Neuf', merchant: 'amazon', asin: 'B01K7GEG9W',
    specs: ['Clics silencieux', 'Sans fil avec récepteur USB', 'Idéale au bureau'] },
  { id: 'trust-taro-clavier', name: 'Trust Taro – clavier filaire AZERTY belge', brand: 'Trust', category: 'peripheriques', icon: 'keyboard',
    image: img('71FIBRHnFlL'), price: 9.99, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B0H4GVXJ75', featured: true,
    specs: ['Disposition AZERTY belge', 'Touches plates silencieuses', 'USB, plug & play'] },
  { id: 'trust-taro-pack', name: 'Trust Taro – pack clavier + souris filaires AZERTY belge', brand: 'Trust', category: 'peripheriques', icon: 'keyboard',
    image: img('71yKubMt6HL'), price: 13.99, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B0H4GVQTZ6',
    specs: ['AZERTY belge', 'Clavier et souris silencieux', 'Connexion USB'] },
  { id: 'trust-ymo2', name: 'Trust Ymo II – pack clavier + souris sans fil AZERTY belge', brand: 'Trust', category: 'peripheriques', icon: 'keyboard',
    image: img('71VdqspLBwL'), price: 24.99, rating: 4.1, condition: 'Neuf', merchant: 'amazon', asin: 'B0H4LPPB12',
    specs: ['AZERTY belge', 'Sans fil, un seul récepteur', 'Frappe silencieuse'] },

  { id: 'sandisk-flair-64', name: 'SanDisk Ultra Flair – clé USB 3.0 64 Go', brand: 'SanDisk', category: 'stockage', icon: 'usb',
    image: img('61DaP3ryRKL'), price: 12.4, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B015CH1NAQ', featured: true,
    specs: ['USB 3.0, jusqu’à 150 Mo/s', 'Boîtier métal', 'Protection par mot de passe'] },
  { id: 'sandisk-microsd-128', name: 'SanDisk Ultra – carte microSDXC 128 Go + adaptateur', brand: 'SanDisk', category: 'stockage', icon: 'sd',
    image: img('41T8v+s8ZzL'), price: 29.99, rating: 4.7, condition: 'Neuf', merchant: 'amazon', asin: 'B0BFH76ZCX',
    specs: ['Jusqu’à 140 Mo/s', 'UHS-I, adaptateur SD fourni', 'Smartphone, tablette, Chromebook'] },
  { id: 'netac-ssd-ext-1to', name: 'Netac – SSD portable 1 To USB-C', brand: 'Netac', category: 'stockage', icon: 'ssd',
    image: img('61qOd05FhfL'), price: 102.99, rating: 4.5, condition: 'Neuf', merchant: 'amazon', asin: 'B08BJ1S5CP',
    specs: ['USB 3.2 Gen 2 (10 Gbit/s), Type-C', 'Jusqu’à 550 Mo/s', 'Format de poche'] },
  { id: 'netac-ssd-480', name: 'Netac N530S – SSD interne SATA 2,5" 480 Go', brand: 'Netac', category: 'stockage', icon: 'ssd',
    image: img('61GkMaY7CuS'), price: 56.99, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B08BCQXV7H',
    specs: ['Lecture/écriture jusqu’à 530/500 Mo/s', 'SATA III 2,5 pouces', 'Redonne vie à un vieux PC'] },
  { id: 'intenso-hdd-2to', name: 'Intenso Memory Case – disque dur externe 2 To', brand: 'Intenso', category: 'stockage', icon: 'hdd',
    image: img('6183zTsMaAL'), price: 105.73, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B00BYNCTOW',
    specs: ['2,5 pouces, USB 3.0', 'Alimenté par le port USB', 'Pour sauvegardes et photos'] },

  { id: 'ugreen-cable-usbc', name: 'UGREEN – câble USB-C vers USB-C 60 W, 2 m', brand: 'UGREEN', category: 'cables', icon: 'cable',
    image: img('71U9WVoGotL'), price: 8.79, rating: 4.7, condition: 'Neuf', merchant: 'amazon', asin: 'B07PLP4K3R', featured: true,
    specs: ['Charge rapide PD 3.0, 60 W', 'Nylon tressé', 'Longueur 2 m'] },
  { id: 'ugreen-nexode-65', name: 'UGREEN Nexode – chargeur GaN 65 W, 3 ports', brand: 'UGREEN', category: 'cables', icon: 'charger',
    image: img('51WAZKzTuaL'), price: 21.99, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B091BRJSRN', featured: true,
    specs: ['Technologie GaN, 65 W', '3 ports USB', 'Charge un PC portable USB-C'] },
  { id: 'ugreen-hub-5en1', name: 'UGREEN Revodok 105 – hub USB-C 5 en 1 avec HDMI', brand: 'UGREEN', category: 'cables', icon: 'hub',
    image: img('61O1Qt6+zXL'), price: 11.74, rating: 4.5, condition: 'Neuf', merchant: 'amazon', asin: 'B0BR3M8XHK',
    specs: ['Sortie HDMI', 'Ports USB supplémentaires', 'Pour PC portables USB-C'] },
  { id: 'benfei-hdmi-vga', name: 'BENFEI – adaptateur HDMI vers VGA', brand: 'BENFEI', category: 'cables', icon: 'adapter',
    image: img('61KTPySWjFL'), price: 7.89, rating: 4.5, condition: 'Neuf', merchant: 'amazon', asin: 'B075GZ8DX7',
    specs: ['HDMI mâle vers VGA femelle', 'Pour anciens écrans et projecteurs', 'PC, portable, moniteur'] },

  { id: 'mercusys-mr1500x', name: 'Mercusys (TP-Link) MR1500X – routeur Wi-Fi 6 AX1500', brand: 'Mercusys', category: 'reseau', icon: 'router',
    image: img('713gWkWG00L'), price: 27.52, rating: 4.4, condition: 'Neuf', merchant: 'amazon', asin: 'B0CJ9SX156', featured: true,
    specs: ['Wi-Fi 6 double bande', 'Port Gigabit', 'Jusqu’à 1201 Mbps en 5 GHz'] },
  { id: 'tplink-wa850re', name: 'TP-Link TL-WA850RE – répéteur Wi-Fi N300', brand: 'TP-Link', category: 'reseau', icon: 'wifi',
    image: img('41MwiAFQtrL'), price: 15.95, rating: 4.0, condition: 'Neuf', merchant: 'amazon', asin: 'B00A0VCJPI',
    specs: ['Étend la couverture Wi-Fi', '1 port Ethernet', 'Se branche sur une prise'] },
  { id: 'tplink-ls1005g', name: 'TP-Link LS1005G – switch Gigabit 5 ports', brand: 'TP-Link', category: 'reseau', icon: 'switch',
    image: img('51eZrXpmDcL'), price: 12.99, rating: 4.7, condition: 'Neuf', merchant: 'amazon', asin: 'B07VC68RW1',
    specs: ['5 ports 10/100/1000 Mbps', 'Plug & play, sans configuration', 'Idéal pour étendre la box'] },
  { id: 'cable-cat6-5m', name: '1aTTack – câble Ethernet Cat 6, 5 m', brand: '1aTTack', category: 'reseau', icon: 'ethernet',
    image: img('81AExbHixQL'), price: 5.97, rating: 4.7, condition: 'Neuf', merchant: 'amazon', asin: 'B004WCS98W',
    specs: ['Cat 6, 1000 Mbit/s', 'Connecteurs RJ45', 'Longueur 5 m, blanc'] },

  { id: 'trust-oran', name: 'Trust Oran – webcam 1080p avec micro', brand: 'Trust', category: 'audio-video', icon: 'webcam',
    image: img('61Dtg2WMXYL'), price: 17.79, rating: 4.3, condition: 'Neuf', merchant: 'amazon', asin: 'B0FHQKPVY2', featured: true,
    specs: ['Full HD 1080p', 'Micro intégré', 'Filtre de confidentialité'] },
  { id: 'logitech-brio100', name: 'Logitech Brio 100 – webcam Full HD', brand: 'Logitech', category: 'audio-video', icon: 'webcam',
    image: img('61dTSa1TG3L'), price: 28.2, rating: 4.5, condition: 'Neuf', merchant: 'amazon', asin: 'B0CDGHRV61',
    specs: ['Full HD 1080p', 'Pour réunions et streaming', 'Teams, Zoom, Meet'] },
  { id: 'logitech-h390', name: 'Logitech H390 – casque micro USB', brand: 'Logitech', category: 'audio-video', icon: 'headset',
    image: img('61NuT5tXQML'), price: 18.9, rating: 4.3, condition: 'Neuf', merchant: 'amazon', asin: 'B005BFCNYU',
    specs: ['Connexion USB', 'Micro orientable', 'Pour visio et appels'] },
  { id: 'acer-ek241yg', name: 'Acer EK241YG – écran 24" Full HD IPS 120 Hz', brand: 'Acer', category: 'audio-video', icon: 'monitor',
    image: img('71zmTcZocoL'), price: 79.9, rating: 4.6, condition: 'Neuf', merchant: 'amazon', asin: 'B0DM679R7F', featured: true,
    specs: ['24 pouces, Full HD', 'Dalle IPS, 120 Hz', 'Idéal télétravail'] },

  { id: 'thinkpad-t14-g1', name: 'Lenovo ThinkPad T14 G1 reconditionné – Ryzen 5 Pro, 16 Go', brand: 'Lenovo', category: 'ordinateurs', icon: 'laptop',
    image: img('61R77fhF4bL'), price: 263.35, rating: 4.2, condition: 'Reconditionné', merchant: 'amazon', asin: 'B0GMCYX8ND', featured: true,
    specs: ['14" Full HD 1920 × 1080', 'AMD Ryzen 5 Pro 4650U, 16 Go DDR4', 'SSD 256 Go'] },

  { id: 'hp-envy-6120e', name: 'HP Envy 6120e – imprimante multifonction Wi-Fi', brand: 'HP', category: 'bureau', icon: 'printer',
    image: img('71Tp1AxAm-L'), price: 50.95, rating: 4.2, condition: 'Neuf', merchant: 'amazon', asin: 'B0DGLXK3B9',
    specs: ['Impression, copie, scan', 'Wi-Fi', 'Modèle « e » : activation HP+ requise'] },
  { id: 'brennenstuhl-ecolor', name: 'Brennenstuhl Ecolor – multiprise 4 prises + USB', brand: 'Brennenstuhl', category: 'bureau', icon: 'power',
    image: img('71huu1Hb9pL'), price: 13.44, rating: 4.7, condition: 'Neuf', merchant: 'amazon', asin: 'B0CXDJCMZL',
    specs: ['4 prises', 'Ports de charge USB-C', 'Avec interrupteur'] },
  { id: 'aitodos-support', name: 'AiTodos – support PC portable réglable', brand: 'AiTodos', category: 'bureau', icon: 'stand',
    image: img('71eaHhmAEBL'), price: 13.99, rating: 4.4, condition: 'Neuf', merchant: 'amazon', asin: 'B0F38F7YHH',
    specs: ['6 angles de réglage', 'Améliore la posture', 'Pliable'] },
  { id: 'kit-nettoyage', name: 'Kit de nettoyage d’écran 250 ml + microfibre XXL', brand: 'Générique', category: 'bureau', icon: 'clean',
    image: img('71CCv0kRXTL'), price: 9.26, rating: 4.7, condition: 'Neuf', merchant: 'amazon', asin: 'B0D2LPKPXY',
    specs: ['Spray 250 ml', 'Chiffon microfibre XXL + pinceau', 'Écrans, claviers, smartphones'] },
]
