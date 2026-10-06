// Réglages du site : à adapter avant la mise en ligne.
export const SITE = {
  name: 'TechMalin',
  tagline: "L'essentiel informatique, au juste prix.",
  // Adresse qui reçoit les demandes (formulaire via FormSubmit).
  email: 'blondele.teikeu@metacares.be',
  phone: '+32 4 000 00 00',
  whatsapp: '32400000000', // format international sans « + » ni espaces
  city: 'Liège, Belgique',
  bce: 'BE 0000.000.000', // numéro d'entreprise BCE à compléter
}

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`
