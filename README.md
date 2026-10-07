# TechMalin — site vitrine informatique (sans stock)

Site vitrine React + TypeScript + Vite : catalogue de matériel informatique essentiel à bas prix,
avec mise en relation clients ↔ fournisseurs. Aucun stock, aucun paiement sur le site.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # site statique dans dist/ (GitHub Pages, Netlify, Vercel…)
```

## Où modifier quoi

| Fichier | Contenu |
|---|---|
| `src/config.ts` | Nom, e-mail de réception des formulaires, téléphone, WhatsApp, n° BCE |
| `src/data/catalog.ts` | Rayons et produits (nom, prix TTC indicatif, caractéristiques, fournisseur, délai) |
| `src/data/suppliers.ts` | Fournisseurs, modèle (affiliation / sur demande), retours, SAV, liens |
| `src/index.css` | Couleurs (variables `--blue`, `--green`…) et mise en page |

## Catalogue réel

`src/data/catalog.ts` contient 27 vrais produits (photos marchand + prix TTC relevés sur Amazon.com.be
le 6 octobre 2026, comparés à Coolblue qui était plus cher sur tous les articles testés).
Mettez à jour `PRICE_DATE` et les prix à chaque relevé. Pages légales : `src/pages/Legal.tsx`
(CGV, formulaire de rétractation, confidentialité — à faire relire et compléter via `config.ts`).
Kit de contact fournisseurs (non publié) : `interne/CONTACTS-FOURNISSEURS.md`.

## Deux modèles de vente par produit

- **Affiliation** (Coolblue, Amazon.com.be, Back Market) : bouton « Voir l'offre chez… ».
  Le marchand est le vendeur et gère paiement, retours et garantie. Vous touchez une commission.
  → Après inscription au programme, remplacez `searchUrl` par vos liens affiliés.
- **Sur demande** (fournisseur dropshipping UE) : le client envoie une demande via le formulaire,
  vous la transmettez au fournisseur qui expédie. ⚠️ Dans ce cas **vous êtes le vendeur légal**.

## Fournisseurs recommandés pour démarrer

1. **Coolblue BE** (affiliation via Awin) et **Amazon.com.be Partenaires** : gratuit, pas de SAV à gérer.
2. **Back Market** (Awin, ~5 %) et **Refurbed** (Daisycon, 3 %) : PC reconditionnés, garantie gérée par eux.
3. **Syncee** (gratuit, puis à partir de 39,99 $/mois) : fournisseurs dropshipping filtrables « UE ».
4. **CJdropshipping** (entrepôts DE/NL/PL, sans abonnement) : petits accessoires. Commandez des échantillons d'abord.
5. Quand BCE + TVA sont actifs : **ALSO Belgium** (livraison directe au client possible), puis **Copaco**
   et **The Circular Company** (reconditionneur belge) pour un accord de livraison directe.

À éviter : bol.com en vendeur (dropshipping interdit) ; vidaXL/dropXL (peu d'informatique).

## Avant la mise en ligne (check-list légale BE)

- [ ] N° BCE, TVA, adresse, e-mail dans `config.ts` / pied de page
- [ ] Remplacer les prix indicatifs par les prix réels
- [ ] CGV + formulaire de rétractation (14 jours) si vous vendez « sur demande », alignés sur les conditions de retour du fournisseur
- [ ] Politique de confidentialité (RGPD) : les données du formulaire peuvent être transmises au fournisseur
- [ ] Signaler les liens d'affiliation (déjà mentionné dans le pied de page)
- [ ] Recupel / Bebat : à vérifier avec votre comptable si vous mettez vous-même des appareils sur le marché belge
- [ ] Activer FormSubmit pour le domaine final (e-mail de confirmation à la 1re soumission)
