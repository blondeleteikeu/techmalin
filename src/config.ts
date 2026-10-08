// Réglages du site : à adapter avant la mise en ligne.
export const SITE = {
  name: 'TechMalin',
  tagline: "L'essentiel informatique, au juste prix.",
  // Adresse qui reçoit les demandes (formulaire via FormSubmit).
  email: 'blondele.teikeu@metacares.be',
  phone: '+32 485 52 34 10',
  whatsapp: '32485523410', // même numéro, format international sans « + » ni espaces
  city: 'Charleroi, Belgique',
  // Identité légale (affichée sur le site et dans les CGV).
  legalName: 'Metacares',
  address: 'Av. des Alliés 41/3, 6000 Charleroi, Belgique',
  bce: '0800.804.284',
  // Identifiant Amazon Partenaires (ex. « techmalin-21 ») : ajouté automatiquement à tous les liens Amazon.
  amazonTag: 'techmalin09-21',
}

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`
