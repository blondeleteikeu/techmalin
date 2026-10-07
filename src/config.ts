// Réglages du site : à adapter avant la mise en ligne.
export const SITE = {
  name: 'TechMalin',
  tagline: "L'essentiel informatique, au juste prix.",
  // Adresse qui reçoit les demandes (formulaire via FormSubmit).
  email: 'blondele.teikeu@metacares.be',
  phone: '+32 485 52 34 10',
  whatsapp: '32485523410', // même numéro, format international sans « + » ni espaces
  city: 'Liège, Belgique',
  // Identité légale (obligatoire sur le site et dans les CGV) : à compléter.
  legalName: '[Nom de l’entreprise ou de l’indépendant]',
  address: '[Rue et numéro], [code postal] Liège, Belgique',
  bce: '[BE 0XXX.XXX.XXX]',
  // Identifiant Amazon Partenaires (ex. « techmalin-21 ») : ajouté automatiquement à tous les liens Amazon.
  amazonTag: '',
}

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`
