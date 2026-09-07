// French translations of the case-study summaries, keyed by project id.
// Same shape as caseStudies.js. Shown when the locale is FR.

const caseStudiesFr = {
  1: {
    role: "Designer UX/UI",
    challenge:
      "Touristes et habitants n'avaient aucun moyen simple et convivial de découvrir les sentiers et lieux du coin — ni de vraiment les parcourir.",
    approach:
      "Enquête quantitative, extraction des fonctionnalités clés, puis itérations de la basse à la haute fidélité sur le design system de Google — chaque filtre de recherche ayant sa couleur pour guider l'œil.",
    results: [
      { stat: "En ligne", label: "Publié sur vaudsentiers.ch" },
      { stat: "4", label: "Fonctionnalités clés issues de vrais tests" },
      { stat: "UX→UI", label: "De l'enquête au high-fi, de bout en bout" },
    ],
  },
  5: {
    role: "Fondatrice & Designer",
    challenge:
      "Je voulais ma propre marque de vêtements — une marque qui célèbre le fait de se démarquer plutôt que de se fondre dans la masse.",
    approach:
      "Création d'une identité visuelle audacieuse autour d'un caméléon coloré, puis choix d'une méthode d'impression (DTF) qui résiste à la vie réelle et fonctionne sur tout tissu.",
    results: [
      { stat: "En ligne", label: "Marque & boutique en ligne" },
      { stat: "DTF", label: "Impressions durables sur tout matériau" },
      { stat: "1", label: "Marque créée en solo, de A à Z" },
    ],
  },
  8: {
    role: "Designer & Développeuse",
    challenge:
      "Un horloger genevois avait besoin d'une vitrine numérique digne de son savoir-faire — avec réservations en ligne et une audience internationale et multilingue.",
    approach:
      "Site Vue entièrement responsive codé à la main, avec service de réservation + paiement et une interface d'administration en autonomie pour qu'il gère tout lui-même.",
    results: [
      { stat: "500+", label: "Visites par mois" },
      { stat: "3", label: "Langues : FR / EN / IT" },
      { stat: "En ligne", label: "En production, toujours maintenu" },
    ],
  },
  11: {
    role: "Illustratrice & Responsable de la série",
    challenge:
      "L'UEFA et Amazon voulaient inspirer davantage de jeunes femmes à devenir entraîneuses de football.",
    approach:
      "En équipe de huit, nous avons créé la campagne « Tomorrow's Football » — un site, une campagne sociale et une série animée interactive que j'ai créée et dessinée à la main.",
    results: [
      { stat: "Équipe de 8", label: "Site + social + série" },
      { stat: "Dessinée main", label: "Épisodes guidés par le public" },
      { stat: "UEFA × Amazon", label: "Vrai brief de marque" },
    ],
  },
  35: {
    role: "Chercheuse (Master)",
    challenge:
      "Les gestionnaires de mots de passe sont si fluides que les utilisateurs ne vérifient plus où ils se connectent — les exposant aux arnaques par compromission d'e-mails professionnels (BEC).",
    approach:
      "Ajout d'une « friction positive » (des défis façon captcha) avant d'afficher un mot de passe, puis test lors d'une expérience A/B contrôlée.",
    results: [
      { stat: "24", label: "Participants, deux groupes" },
      { stat: "SUS 89 / 78", label: "Impact d'utilisabilité mesuré" },
      { stat: "10", label: "E-mails, dont 3 vraies attaques" },
    ],
  },
  36: {
    role: "Designer & Développeuse full-stack",
    challenge:
      "Les parents ont besoin d'un moyen simple d'apprendre l'argent à leurs enfants tout en gérant le foyer au quotidien.",
    approach:
      "Application full-stack — comptes enfants, allocation, tâches rémunérées, objectifs d'épargne, investissement ados et supervision parentale — web + mobile depuis une seule base de code TypeScript.",
    results: [
      { stat: "Web + Mobile", label: "Une base de code partagée" },
      { stat: "En ligne", label: "myhouzly.com, facturation réelle" },
      { stat: "6→16", label: "Une UI qui grandit avec l'enfant" },
    ],
  },
};

export function getFrCaseStudy(id) {
  if (id === undefined || id === null) return null;
  return (
    caseStudiesFr[id] ||
    caseStudiesFr[String(id)] ||
    caseStudiesFr[Number(id)] ||
    null
  );
}

export default caseStudiesFr;
