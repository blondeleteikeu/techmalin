import { SITE } from '../config'

// Modèles généraux rédigés pour un site belge de mise en relation / vente à distance.
// À faire relire par un juriste ou votre guichet d'entreprise avant la mise en ligne,
// et à compléter avec vos données réelles (config.ts).

const Id = () => (
  <p className="legal-id">
    <strong>{SITE.legalName}</strong>, exploitant le site « {SITE.name} »<br />
    Adresse : {SITE.address}<br />
    N° d’entreprise (BCE) / TVA : {SITE.bce}<br />
    E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · Téléphone / WhatsApp : {SITE.phone}
  </p>
)

export function CGV() {
  return (
    <article className="legal">
      <h1>Conditions générales de vente</h1>
      <p className="legal-date">Version en vigueur au 6 octobre 2026</p>

      <h2>Article 1 – Identification</h2>
      <Id />

      <h2>Article 2 – Objet et champ d’application</h2>
      <p>Le site {SITE.name} présente une sélection de matériel informatique au meilleur prix et met en relation ses visiteurs avec des marchands et fournisseurs partenaires. Il propose deux types d’offres, clairement indiqués sur chaque fiche :</p>
      <ul>
        <li><strong>Offres « Achat chez le partenaire »</strong> : le bouton renvoie vers le site du marchand (par exemple Amazon.com.be, Coolblue, Back Market ou la boutique santé Meta Cares). Le contrat de vente est conclu directement entre vous et ce marchand, selon ses propres conditions générales. {SITE.name} n’est pas le vendeur : il n’encaisse aucun paiement et n’intervient ni dans la livraison, ni dans les retours, ni dans la garantie, qui relèvent du marchand. {SITE.name} peut percevoir une commission d’affiliation, sans surcoût pour vous.</li>
        <li><strong>Commandes « Sur demande »</strong> : vous demandez à {SITE.name} de vous fournir un produit, que nous commandons auprès d’un fournisseur qui l’expédie directement chez vous. Pour ces commandes, {SITE.name} est le vendeur et les présentes conditions générales s’appliquent.</li>
      </ul>
      <p>Toute commande « Sur demande » implique l’acceptation des présentes conditions, que vous reconnaissez avoir lues avant de commander. Elles prévalent sur tout autre document, sauf accord écrit contraire.</p>

      <h2>Article 3 – Produits et prix</h2>
      <p>Les produits sont décrits avec la plus grande exactitude possible. Les photos sont fournies à titre illustratif. Les prix affichés sur le site sont des prix relevés chez les marchands à la date indiquée, toutes taxes comprises (TVA belge incluse). Ils peuvent évoluer : <strong>le prix qui fait foi est celui affiché par le marchand</strong> au moment de l’achat (offres partenaires) ou celui figurant dans notre confirmation écrite (commandes sur demande). Les frais de livraison éventuels sont indiqués avant la validation de la commande.</p>

      <h2>Article 4 – Commande « Sur demande »</h2>
      <ol>
        <li>Vous envoyez une demande via le formulaire, par e-mail ou par WhatsApp (produit, quantité, adresse de livraison).</li>
        <li>Nous vous adressons une offre écrite précisant le produit, le prix total TTC, les frais de livraison, le délai et les modalités de paiement.</li>
        <li>La vente est conclue lorsque vous acceptez cette offre par écrit (e-mail ou message) et que nous recevons votre paiement. Nous vous envoyons alors une confirmation sur support durable (e-mail).</li>
      </ol>
      <p>Nous nous réservons le droit de refuser une commande en cas de motif légitime (indisponibilité chez le fournisseur, demande anormale, litige de paiement antérieur).</p>

      <h2>Article 5 – Paiement</h2>
      <p>Le paiement des commandes « Sur demande » s’effectue par virement bancaire ou par lien de paiement sécurisé (Bancontact, carte), comme indiqué dans l’offre. Le produit est commandé auprès du fournisseur après réception du paiement. Aucune donnée de carte bancaire n’est collectée sur le site {SITE.name}.</p>

      <h2>Article 6 – Livraison</h2>
      <p>Nous livrons en Belgique. Le produit est expédié directement par le fournisseur à l’adresse indiquée. Le délai annoncé dans l’offre est indicatif ; à défaut de délai convenu, la livraison intervient au plus tard 30 jours après la conclusion du contrat. En cas de retard important, vous pouvez nous mettre en demeure de livrer dans un délai supplémentaire raisonnable, puis résoudre le contrat et être remboursé. Le risque de perte ou d’endommagement vous est transféré lorsque vous (ou un tiers désigné par vous) prenez physiquement possession du produit. Merci de vérifier l’état du colis à la livraison et de nous signaler tout dommage dans les meilleurs délais.</p>

      <h2>Article 7 – Droit de rétractation</h2>
      <p>Conformément au Code de droit économique (livre VI), si vous êtes un consommateur, vous disposez d’un délai de <strong>14 jours</strong> pour vous rétracter d’une commande « Sur demande », sans avoir à vous justifier. Ce délai court à compter du jour où vous, ou un tiers désigné par vous, prenez physiquement possession du produit (ou du dernier produit en cas de commande multiple).</p>
      <p>Pour exercer ce droit, informez-nous de votre décision par une déclaration dénuée d’ambiguïté (e-mail à {SITE.email}, courrier ou WhatsApp), en utilisant si vous le souhaitez le <a href="#/retractation">formulaire de rétractation</a>. Vous devez renvoyer le produit sans retard excessif et au plus tard 14 jours après nous avoir informé de votre décision, à l’adresse de retour que nous vous communiquons. <strong>Les frais directs de renvoi sont à votre charge</strong>, sauf produit défectueux ou erreur de notre part.</p>
      <p>Nous vous remboursons la totalité des sommes versées, y compris les frais de livraison standard, au plus tard 14 jours après avoir été informés de votre rétractation, par le même moyen de paiement que celui utilisé, sauf accord contraire. Nous pouvons différer le remboursement jusqu’à réception du produit ou d’une preuve d’expédition. Votre responsabilité peut être engagée en cas de dépréciation du produit résultant de manipulations autres que celles nécessaires pour en établir la nature, les caractéristiques et le bon fonctionnement.</p>
      <p><strong>Exceptions</strong> : le droit de rétractation ne s’applique pas, notamment, aux produits confectionnés selon vos spécifications ou nettement personnalisés, ni aux logiciels ou enregistrements scellés que vous avez descellés après la livraison.</p>
      <p>Pour les offres « Achat chez le partenaire », le droit de rétractation s’exerce auprès du marchand, selon ses conditions (souvent 30 jours).</p>

      <h2>Article 8 – Garantie légale de conformité</h2>
      <p>Les produits vendus « Sur demande » bénéficient de la garantie légale de conformité prévue par le Code civil belge : <strong>2 ans</strong> à compter de la livraison pour les produits neufs. Pour les produits d’occasion ou reconditionnés, ce délai peut être limité à 1 an minimum s’il est clairement indiqué dans l’offre. Tout défaut de conformité qui apparaît dans les 2 ans (1 an pour les biens d’occasion) suivant la livraison est présumé exister au moment de la livraison, sauf preuve contraire. En cas de défaut, vous avez droit à la réparation ou au remplacement du produit, ou, à défaut, à une réduction du prix ou à la résolution de la vente. Signalez-nous le défaut le plus rapidement possible, en principe dans les 2 mois de sa constatation. Cette garantie légale s’ajoute à une éventuelle garantie commerciale du fabricant.</p>

      <h2>Article 9 – Service client, réclamations et médiation</h2>
      <p>Pour toute question ou réclamation : {SITE.email} ou {SITE.phone} (WhatsApp). Nous répondons en principe sous 2 jours ouvrables. À défaut de solution amiable, vous pouvez vous adresser gratuitement au <strong>Service de Médiation pour le Consommateur</strong>, North Gate II, boulevard du Roi Albert II 8 bte 1, 1000 Bruxelles – <a href="https://mediationconsommateur.be" target="_blank" rel="noopener">mediationconsommateur.be</a>.</p>

      <h2>Article 10 – Responsabilité</h2>
      <p>Pour les offres partenaires, {SITE.name} agit comme intermédiaire d’information : il ne peut être tenu responsable de l’exécution du contrat conclu avec le marchand, ni des changements de prix ou de disponibilité. Pour les commandes sur demande, notre responsabilité est limitée aux dommages directs et prévisibles, sauf faute lourde ou intentionnelle, et sans préjudice des droits impératifs du consommateur.</p>

      <h2>Article 11 – Données personnelles</h2>
      <p>Le traitement de vos données est décrit dans notre <a href="#/confidentialite">politique de confidentialité</a>.</p>

      <h2>Article 12 – Droit applicable et litiges</h2>
      <p>Les présentes conditions sont soumises au droit belge. En cas de litige, et à défaut d’accord amiable, les tribunaux de l’arrondissement judiciaire de Liège sont compétents, sans préjudice du droit du consommateur de saisir le tribunal de son domicile ni des dispositions impératives qui le protègent.</p>
    </article>
  )
}

export function Retractation() {
  return (
    <article className="legal">
      <h1>Formulaire de rétractation</h1>
      <p className="legal-date">Annexe 2 au livre VI du Code de droit économique</p>
      <p>Veuillez compléter et renvoyer le présent formulaire <strong>uniquement si vous souhaitez vous rétracter</strong> d’une commande « Sur demande » passée auprès de {SITE.name}. Pour un achat effectué chez un marchand partenaire (Amazon, Coolblue, Back Market, Meta Cares…), adressez-vous directement à ce marchand.</p>
      <div className="legal-form">
        <p>À l’attention de :<br /><strong>{SITE.legalName}</strong> ({SITE.name})<br />{SITE.address}<br />E-mail : {SITE.email}</p>
        <p>Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien (*) / pour la prestation de services (*) ci-dessous :</p>
        <p className="line">Désignation du produit : </p>
        <p className="line">Commandé le (*) / reçu le (*) : </p>
        <p className="line">Numéro de commande : </p>
        <p className="line">Nom du (des) consommateur(s) : </p>
        <p className="line">Adresse du (des) consommateur(s) : </p>
        <p className="line">IBAN pour le remboursement (si paiement par virement) : </p>
        <p className="line">Signature du (des) consommateur(s) (uniquement en cas de notification sur papier) : </p>
        <p className="line">Date : </p>
        <p className="small-print">(*) Biffez la mention inutile.</p>
      </div>
      <button className="btn" onClick={() => window.print()}>Imprimer le formulaire</button>
      <p className="note">Vous pouvez aussi nous envoyer ces informations par e-mail ou WhatsApp : une déclaration claire suffit.</p>
    </article>
  )
}

export function Confidentialite() {
  return (
    <article className="legal">
      <h1>Politique de confidentialité</h1>
      <p className="legal-date">Version en vigueur au 6 octobre 2026</p>
      <p>Nous attachons une grande importance à la protection de vos données personnelles. Cette politique explique quelles données nous traitons, pourquoi, et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD, UE 2016/679) et à la loi belge du 30 juillet 2018.</p>

      <h2>1. Responsable du traitement</h2>
      <Id />

      <h2>2. Données que nous traitons</h2>
      <ul>
        <li><strong>Formulaire de contact, demandes et retours</strong> : nom, adresse e-mail, produit concerné, message, et le cas échéant numéro de commande, téléphone et adresse de livraison que vous nous communiquez.</li>
        <li><strong>Échanges WhatsApp ou e-mail</strong> : votre numéro ou adresse et le contenu des messages.</li>
        <li><strong>Commandes « Sur demande »</strong> : identité, coordonnées, adresse de livraison, produits commandés, montant et historique des échanges. Nous ne collectons aucune donnée de carte bancaire.</li>
      </ul>
      <p>Le site ne vous demande pas de créer de compte et n’utilise <strong>ni cookie publicitaire, ni outil de mesure d’audience</strong>.</p>

      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>Répondre à vos questions et demandes de produits : mesures précontractuelles prises à votre demande et intérêt légitime (art. 6.1.b et 6.1.f RGPD).</li>
        <li>Exécuter les commandes « Sur demande », organiser la livraison, les retours et la garantie : exécution du contrat (art. 6.1.b).</li>
        <li>Respecter nos obligations comptables et fiscales : obligation légale (art. 6.1.c).</li>
        <li>Prévenir la fraude et défendre nos droits : intérêt légitime (art. 6.1.f).</li>
      </ul>

      <h2>4. Destinataires</h2>
      <p>Vos données ne sont jamais vendues. Elles sont communiquées uniquement lorsque c’est nécessaire :</p>
      <ul>
        <li>au <strong>fournisseur</strong> qui expédie votre commande « Sur demande » ou traite un retour (nom, adresse de livraison, produit) ;</li>
        <li>à nos <strong>sous-traitants techniques</strong> : l’hébergeur du site, le service d’envoi du formulaire (FormSubmit) et notre messagerie e-mail ;</li>
        <li>à notre comptable et aux autorités, lorsque la loi l’impose.</li>
      </ul>
      <p>Certains de ces prestataires peuvent être établis hors de l’Union européenne (notamment aux États-Unis). Dans ce cas, le transfert est encadré par une décision d’adéquation (EU-US Data Privacy Framework) ou par les clauses contractuelles types de la Commission européenne.</p>

      <h2>5. Liens vers les marchands partenaires et contenus externes</h2>
      <p>Lorsque vous cliquez sur « Voir l’offre », vous quittez notre site pour celui du marchand (Amazon, Coolblue, Back Market, Meta Cares…). Ce marchand traite alors vos données et dépose ses propres cookies, y compris d’affiliation, selon sa politique de confidentialité. Les photos des produits sont affichées depuis les serveurs des marchands : votre navigateur leur transmet donc votre adresse IP lors de l’affichage, comme pour toute image externe.</p>

      <h2>6. Durées de conservation</h2>
      <ul>
        <li>Demandes et messages sans suite : 3 ans après le dernier contact.</li>
        <li>Données de commande et factures : pendant la durée imposée par la législation comptable et fiscale belge.</li>
        <li>Données liées à un litige : jusqu’à sa clôture définitive et l’expiration des délais de recours.</li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>Vous pouvez à tout moment demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement, vous opposer au traitement fondé sur notre intérêt légitime et demander la portabilité de vos données. Écrivez-nous à <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ; nous répondons dans un délai d’un mois. Nous pouvons vous demander de justifier votre identité.</p>
      <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une plainte auprès de l’<strong>Autorité de protection des données</strong>, rue de la Presse 35, 1000 Bruxelles – <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener">autoriteprotectiondonnees.be</a>.</p>

      <h2>8. Sécurité</h2>
      <p>Le site est servi en HTTPS et nous limitons l’accès à vos données aux seules personnes qui en ont besoin. Aucun système n’étant totalement infaillible, nous vous informerons, ainsi que l’autorité compétente, en cas de violation de données susceptible de vous exposer à un risque.</p>

      <h2>9. Modifications</h2>
      <p>Nous pouvons adapter cette politique, par exemple en cas d’évolution légale ou de nouveau service. La date de mise à jour figure en haut de la page.</p>
    </article>
  )
}
