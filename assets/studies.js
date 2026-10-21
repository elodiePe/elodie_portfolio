/* The case-study structure of each project, by project id (the same structure as the Pinday page).
   Every field is optional: a section that has no content is simply not shown.
   role, tools, status : the three small facts under the title
   resume    : {probleme, reponse, resultat}   the "En bref" block
   contexte  : a paragraph
   probleme  : [[title, text], …]
   decisions : [{t, alt, choix, pourquoi}, …]  alt is optional
   resultats, retient : a paragraph */
window.STUDIES = {
  39: {
    slider: true,
    legendes: ["La collection : recherche, filtres, tri, et la fiche d'une pièce avec une grande image.", "La recherche par IA (une description ou une photo) et les statistiques : les 10 objets les plus précieux."],
    role: "Recherche, conception et développement",
    duree: "Juillet 2026",
    tools: "Next.js, React, TypeScript, Google Sheets et Drive, Claude Haiku 5.5, Vercel",
    status: "En ligne, accès privé",
    resume: {
      probleme: "Bruno n'a pas d'ordinateur, seulement un téléphone : son Google Sheet y était difficile à lire, et il n'était pas à l'aise avec cet outil.",
      reponse: "Une application privée, pensée pour le téléphone, où il retrouve, trie et analyse sa collection, et où l'IA l'aide à repérer un produit similaire.",
      resultat: "Un inventaire en ligne et sécurisé, que Bruno utilise depuis deux mois sur son téléphone."
    },
    pour: "Bruno Pesenti, horloger indépendant à Genève, qui gère une collection de montres anciennes. Il n'est pas très à l'aise avec l'informatique et n'a pas d'ordinateur : il travaille uniquement sur son téléphone. Je collabore avec lui depuis plusieurs années (site, catalogue, logo).",
    probleme: [
      ["Une simple liste", "Le Google Sheet donne une liste : recherche lente, tri compliqué, aucune vue d'ensemble de la collection."],
      ["Illisible sur un téléphone", "Bruno n'a pas d'ordinateur, seulement un téléphone : les informations y étaient difficiles à voir facilement."],
      ["Pas à l'aise avec le tableur", "Cet outil n'est pas évident pour quelqu'un qui n'est pas très à l'aise avec l'informatique."],
      ["Retrouver une pièce semblable", "Savoir s'il possède déjà un produit similaire demande de tout reparcourir."]
    ],
    demarcheIntro: "Je suis partie de Bruno et de sa façon de travailler, pas d'un outil à la mode.",
    demarche: [
      ["Comprendre", "Je collabore avec Bruno depuis des années, et j'ai discuté avec lui de la façon dont il utilisait son Google Sheet. Il n'était pas à l'aise avec cet outil et, comme il n'a qu'un téléphone, il avait du mal à voir facilement les informations."],
      ["Définir le besoin", "Retrouver vite un produit, trier comme il le souhaite, voir sa collection d'un coup d'œil, et que tout reste simple, même sans être à l'aise avec l'informatique."],
      ["Concevoir", "Une application privée, en français, pensée pour le téléphone, dont l'accès est réservé à lui seul. À la recherche et aux filtres, j'ai ajouté l'IA : une photo ou une description pour retrouver un produit."],
      ["Tester et ajuster", "Bruno l'a testée. Il souhaitait des images plus grandes et pouvoir chercher un produit à partir d'une image : je l'ai adaptée en ce sens."]
    ],
    reponses: [
      ["Je n'ai qu'un téléphone", "Une application pensée pour le téléphone, simple à lire sur un petit écran.", "Sur téléphone"],
      ["Je veux bien voir mes montres", "Des images plus grandes.", "Grandes images"],
      ["Je cherche une pièce précise", "Une recherche et des filtres.", "Recherche"],
      ["Je veux trier comme je veux", "Le tri de la collection, selon son besoin.", "Tri"],
      ["Je veux voir où j'en suis", "Des statistiques sur l'inventaire.", "Statistiques"],
      ["Est-ce que j'en ai déjà un comme celui-là ?", "Il ajoute une photo ou décrit le produit, et l'IA (Claude Haiku 5.5) cherche un produit similaire : c'est la recherche par image qu'il demandait.", "Recherche par photo"],
      ["Je ne suis pas à l'aise avec l'informatique", "Une application simple, en français.", "Simplicité"],
      ["Ma collection est privée", "Un accès sécurisé, réservé à lui seul.", "Accès privé"]
    ],
    resultats: "Un inventaire en ligne et sécurisé, qui remplace le Google Sheet. Bruno l'utilise depuis deux mois, sur son téléphone. {{à compléter : ce qu'il en dit}}",
    retient: "{{à compléter : ce que tu referais autrement, ce que tu as appris}}"
  },
  38: {
    slider: true,
    legendes: ["Pinday sur ordinateur et sur téléphone.", "Les notes : écrire dans l'aperçu, avec les diapositives à côté.", "La révision : résumés, cartes et quiz pour chaque cours.", "Pinday sur téléphone : emploi du temps, notes, révision, examens."],
    role: "Conception produit, design et développement",
    duree: "Octobre 2026",
    tools: "JavaScript, Google Drive et Sheets, Cloudflare, Liveblocks, IA",
    status: "En ligne, en français et en anglais",
    resume: {
      probleme: "Étudiante, j'ai vu à quel point il est difficile de rester organisé et de prendre des notes qui servent vraiment, surtout avec des slides.",
      reponse: "Une application où chaque cours s'organise tout seul, où l'on note directement sur les slides et où l'on révise de façon interactive.",
      resultat: "Une application en ligne, installable, où les données restent dans le Drive de chaque étudiant."
    },
    pour: "Pinday s'adresse aux étudiants et à leur routine de la semaine : aller en cours, suivre des slides, prendre des notes, puis réviser avant les examens. J'en ai fait partie, et c'est de là que je suis partie.",
    probleme: [
      ["Des notes dispersées", "Les notes sont dans un outil, les slides en PDF ailleurs, l'emploi du temps dans un calendrier : c'est à l'étudiant de tout rassembler."],
      ["Les slides compliquent les notes", "Prendre des notes sur des slides reste difficile avec la plupart des outils."],
      ["Réviser sans méthode", "On révise « quand on a le temps », sans plan, alors que relire ne suffit pas pour retenir. Il fallait quelque chose de didactique et d'interactif."],
      ["Chacun dans son coin", "Les notes se partagent en captures d'écran, et chacun annote de son côté."]
    ],
    demarcheIntro: "Je suis partie de la routine des étudiants, pas d'une liste de fonctionnalités.",
    demarche: [
      ["Comprendre", "Je suis partie de ce que j'ai vécu en tant qu'étudiante, puis de ce que mes camarades rencontraient au quotidien. Le vrai problème n'est pas de manquer d'outils : c'est de rester régulier tout au long du semestre, sans fichiers de notes éparpillés partout, et de pouvoir prendre des notes sur les slides et à côté."],
      ["Définir le besoin", "Un outil qui s'occupe de l'organisation à la place de l'étudiant, et qui soit didactique et interactif pour aider à apprendre, pas seulement à archiver."],
      ["Concevoir", "J'ai cherché à retirer toute la corvée : le dossier et le fichier d'un cours se créent tout seuls. Tout en restant un outil de notes standard, Pinday permet la collaboration, l'export en PDF et les commentaires, et tout est enregistré dans le Google Drive de chaque étudiant. Chacun écrit comme il préfère, et les notes se relient entre elles."],
      ["Tester et ajuster", "J'ai testé l'application avec des amis étudiants. Ils ont été satisfaits, surtout de la prise de notes sur les slides, sur téléphone comme sur ordinateur, et de l'organisation automatique."]
    ],
    reponses: [
      ["Je veux m'organiser sans y penser", "Un dossier et un fichier de cours créés automatiquement.", "Organisation"],
      ["Je veux noter en suivant la slide", "Dessiner, annoter et écrire à côté des diapositives.", "Notes sur slides"],
      ["Chacun a sa façon d'écrire", "Du markdown pour ceux qui préfèrent, un éditeur plus simple pour les autres, et des notes liées entre elles.", "Écriture libre"],
      ["Je veux travailler avec les autres", "Plusieurs étudiants modifient les mêmes notes en direct.", "Collaboration"],
      ["Je veux vraiment retenir", "Résumés, cartes de révision et quiz avec répétition espacée (mode IA optionnel), et un plan de révision glissé dans l'emploi du temps.", "Révision"],
      ["Je garde la main sur mes données", "Tout est enregistré dans le Google Drive de chaque étudiant.", "Mes données"]
    ],
    resultats: "L'application est en ligne, installable sur téléphone et ordinateur, et disponible en français et en anglais. Testée avec des amis étudiants, elle les a satisfaits, surtout pour les notes sur slides (sur téléphone ou ordinateur) et l'organisation automatique."
  },
  36: {
    slider: true,
    role: "Conception produit, design et développement",
    duree: "Juillet à octobre 2026",
    tools: "TypeScript, React, React Native, Tailwind CSS, PostgreSQL",
    status: "En développement, bientôt sur le Play Store",
    resume: {
      probleme: "Dans une maison, il y a beaucoup à faire et à penser : l'argent des enfants, les tâches, les repas, les courses.",
      reponse: "Une seule application qui centralise tout ce dont une famille a besoin au quotidien.",
      resultat: "Une application installable, utilisée par ma famille, qui apprend aussi aux enfants à gérer leur argent."
    },
    pour: "Pour les familles : les parents qui jonglent avec le quotidien, et les enfants, qui apprennent à gérer leur argent de poche et à participer à la vie de la maison. Une interface spéciale existe pour les plus jeunes.",
    probleme: [
      ["Beaucoup à faire, beaucoup à penser", "Aujourd'hui, les parents ont beaucoup de choses en tête en même temps."],
      ["Tout est éparpillé", "L'argent des enfants, les tâches ménagères, les repas, les courses et les tâches liées aux enfants vivent chacun à leur endroit."],
      ["L'enfant ne voit pas son argent", "Il ne sait pas combien il a, ni ce qu'il a économisé au fil des mois."],
      ["Les demandes se perdent", "Les demandes d'argent passent à l'oral : elles s'oublient ou se discutent."]
    ],
    demarcheIntro: "Je suis partie de ma propre famille, de ce que les parents ont en tête chaque jour et de ce que les enfants comprennent de leur argent.",
    demarche: [
      ["Comprendre", "Avant, l'argent de poche était suivi dans une application externe, avec un historique qu'il fallait pouvoir garder. Je voulais un outil à nous, simple pour un enfant et assez fiable pour un parent. Un autre problème est revenu à la maison : les enfants oublient qu'ils ont des choses à faire."],
      ["Définir les besoins", "Deux besoins : alléger la charge mentale des parents en centralisant tout, et donner à chaque enfant un compte clair, qu'il comprend seul."],
      ["Concevoir pour chacun", "Pour les enfants : un accès simple (un code famille, son prénom, puis un code à quatre chiffres), un solde en grand, et des demandes écrites plutôt que des discussions. Une interface par âge : celle des plus jeunes ne garde que l'argent, les points, la récompense et les tâches. Pour les parents : le contrôle, et des modules à activer seulement selon leurs besoins. Une règle : on ne supprime jamais une opération, on la corrige, pour que l'historique reste lisible par tous."],
      ["Tester et ajuster", "L'application est utilisée par ma famille et encore en développement. Pendant les tests, il est apparu clairement que des notifications avec des boutons directement dedans simplifieraient l'usage : on répond sans ouvrir l'application. J'ai aussi ajouté le choix de recevoir chaque mois un e-mail avec l'évolution des comptes."]
    ],
    reponses: [
      ["Je ne veux plus tout garder en tête", "Un seul endroit pour l'argent des enfants, les tâches, les repas et les courses.", "Tout au même endroit"],
      ["Mon enfant veut comprendre son argent", "Un compte à lui : solde, historique, argent de poche automatique et objectifs d'épargne avec intérêts.", "Compte de l'enfant"],
      ["Les tâches doivent compter", "Des tâches payées en argent ou en points, que le parent valide.", "Tâches"],
      ["Chaque âge a son interface", "Une interface pour les plus jeunes, avec seulement l'argent, les points, la récompense et les tâches, et pour les ados un portefeuille d'actions supervisé.", "Chaque âge"],
      ["Chaque famille est différente", "Les parents choisissent les modules du foyer (repas, lessives, courses) et les permissions entre co-parents.", "Sur mesure"],
      ["Demander sans se disputer", "L'enfant fait sa demande dans l'application, la réponse est écrite et le mouvement se fait tout seul.", "Demandes"],
      ["Je ne veux pas oublier", "Un rappel qui revient jusqu'à ce que la tâche soit cochée (mode ADHD), et, pour les plus jeunes, des quêtes du jour.", "Rappels"]
    ],
    resultats: "L'application aide les familles qui ont beaucoup à penser : moins de choses à garder en tête, moins de disputes. Elle est installable et garde les derniers soldes même sans réseau."
  },
  1: {
    includes: [2],
    slider: true,
    role: "Conception de l'expérience (UX) et de l'interface (UI), identité visuelle",
    tools: "Figma, système de design de Google",
    status: "Application web",
    resume: {
      probleme: "Touristes et habitants veulent découvrir des lieux, mais il leur faut un moyen simple de trouver et de suivre un itinéraire.",
      reponse: "Une application pour chercher, suivre, partager et noter des itinéraires.",
      resultat: "Un prototype haute fidélité avec une identité colorée : une couleur par critère de recherche."
    },
    pour: "Les touristes comme les habitants du canton de Vaud, qui veulent sortir, marcher et découvrir des lieux près de chez eux ou pendant leur visite.",
    probleme: [
      ["Trouver", "Repérer le bon chemin ou le bon lieu parmi de nombreuses options."],
      ["Y aller", "Passer de l'envie à la balade sans changer d'outil."],
      ["Partager", "Pouvoir faire profiter les autres de ses découvertes."],
      ["Choisir en confiance", "Savoir ce que les autres ont pensé d'un chemin avant de s'y lancer."]
    ],
    demarcheIntro: "Je suis partie de ce que les utilisateurs voulaient faire, et j'ai gardé leurs besoins comme fil conducteur.",
    demarche: [
      ["Comprendre", "J'ai commencé par une enquête quantitative pour savoir ce dont les utilisateurs avaient besoin."],
      ["Définir les besoins", "L'analyse des résultats a fait ressortir quatre fonctionnalités clés : chercher, naviguer, partager, noter et commenter."],
      ["Concevoir", "D'abord des prototypes basse fidélité pour vérifier les idées vite, puis des prototypes haute fidélité avec des couleurs et une identité graphique, en m'appuyant sur le système de design de Google pour garder une interface cohérente."],
      ["Tester et ajuster", "J'ai testé les prototypes basse fidélité, puis amélioré le design grâce aux retours."]
    ],
    reponses: [
      ["Je cherche un chemin ou un lieu", "Une carte, ou une barre de recherche avec des filtres.", "Chercher"],
      ["Je veux y aller sans quitter l'application", "La navigation se lance directement depuis l'application.", "Naviguer"],
      ["Je veux partager mes coups de cœur", "Partage de lieux et d'itinéraires.", "Partager"],
      ["Je veux choisir en confiance", "Noter et commenter les chemins et les itinéraires.", "Avis"],
      ["Je veux me repérer d'un coup d'œil", "Des couleurs joyeuses, une par critère de recherche.", "Couleurs"]
    ],
    resultats: "Un prototype haute fidélité complet, avec une identité visuelle propre (voir le projet associé)."
  },
  35: {
    role: "Recherche (mémoire de master)",
    duree: "Novembre 2025 à juillet 2026",
    tools: "SUS, UEQ-S",
    status: "Mémoire, Jönköping University",
    resume: {
      probleme: "Les gestionnaires de mots de passe rendent la connexion si fluide qu'on fait moins attention à l'endroit où l'on se connecte, ce qui expose aux attaques par e-mail.",
      reponse: "Ajouter un peu de friction positive : un petit défi avant d'afficher le mot de passe, sans rendre l'outil pénible.",
      resultat: "Pas de meilleure détection des attaques, mais une perception différente de l'outil, et des pistes pour la suite."
    },
    pour: "Les personnes qui reçoivent des e-mails professionnels tous les jours et utilisent un gestionnaire de mots de passe pour aller vite.",
    probleme: [
      ["Beaucoup de mots de passe", "On demande aux gens d'en créer et d'en retenir toujours plus, alors le gestionnaire est devenu un réflexe."],
      ["L'attention baisse", "Quand tout est fluide, on prête moins attention à l'adresse du site où l'on se connecte."],
      ["Des e-mails qui jouent sur la confiance", "Dans une attaque BEC, un pirate se fait passer pour un supérieur hiérarchique."]
    ],
    demarcheIntro: "Ici, l'empathie passe par une expérience avec de vraies personnes, pour mesurer l'effet du design sur leur comportement.",
    demarche: [
      ["Comprendre", "Partir d'un comportement de tous les jours : on se connecte en quelques secondes, parfois sans regarder l'adresse."],
      ["Définir la question", "Peut-on ajouter de la friction positive à un gestionnaire de mots de passe pour aider à repérer les attaques, tout en gardant l'outil facile à utiliser ?"],
      ["Concevoir", "Un gestionnaire avec de petits défis inspirés des CAPTCHA avant l'affichage du mot de passe : une question à choix multiple, un curseur à placer sur un nombre, une phrase à recopier."],
      ["Tester", "24 participants, répartis en deux groupes égaux. Un groupe utilise un gestionnaire standard, l'autre celui avec friction. Dix e-mails, dont trois attaques à ne pas suivre, puis un questionnaire."]
    ],
    reponsesTitle: "Ce que j'ai trouvé",
    reponses: [
      ["Est-ce qu'on repère mieux les attaques ?", "Aucune différence significative entre les deux groupes. L'âge, le genre, le niveau d'anglais et l'expérience en informatique n'ont pas influencé le score.", "Détection"],
      ["L'outil reste-t-il agréable à utiliser ?", "Scores SUS moyens : 89 pour le gestionnaire standard, 78 pour celui avec friction.", "Facilité (SUS)"],
      ["Comment est-il perçu ?", "Selon le UEQ-S, le groupe standard l'a jugé plus efficace, et le groupe avec friction plus original et plus agréable visuellement.", "Perception"]
    ],
    resultats: "La friction utilisée n'a pas suffi à augmenter la vigilance face aux attaques BEC, mais elle a changé la perception du gestionnaire de mots de passe."
  },
  2: {
    role: "Identité visuelle : logo, charte graphique et ligne éditoriale",
    status: "Identité de marque",
    resume: {
      probleme: "Donner une identité à une application centrée sur le canton de Vaud.",
      reponse: "Un logo fait de la silhouette du canton et du nom, avec un jeu de mots sur « vos sentiers ».",
      resultat: "Une palette verte, cohérente avec la nature et les couleurs du drapeau cantonal."
    },
    decisions: [
      {t: "Un nom qui se prononce comme « vos sentiers »", choix: "Le logo associe la silhouette du canton de Vaud et le nom « Vaud Sentiers ».", pourquoi: "Le jeu de mots rappelle « vos sentiers » tout en ancrant l'application dans le canton."},
      {t: "Le vert et le blanc du drapeau", choix: "Le vert et le blanc du drapeau cantonal dans la silhouette, le vert comme couleur principale.", pourquoi: "Le vert représente la nature et la découverte ; les couleurs secondaires viennent de la même gamme pour s'accorder."}
    ]
  },
  4: {
    slider: true,
    hideEmpty: true,
    role: "Architecture de l'information et prototype du wiki en ligne",
    duree: "Février 2025",
    tools: "Figma, impression",
    status: "Jeu de cartes",
    resume: {
      probleme: "Comment nourrir l'amour des enfants pour les animaux ?",
      reponse: "Un jeu de cartes d'animaux insolites, avec des informations importantes sur chacun.",
      resultat: "Un jeu et un prototype de wiki en ligne qui l'accompagne."
    },
    contexte: "Un jeu de cartes pour donner aux enfants le goût des animaux insolites, et passer un bon moment en famille. Comment nourrir l'amour des animaux chez un enfant ? Les enfants sont souvent fascinés par les animaux insolites, et ils apprennent mieux et plus vite quand ils s'amusent. Nous avons donc imaginé un jeu de cartes qui réunit des animaux du monde entier, avec des informations importantes sur chacun.",
    probleme: [
      ["Intéresser les enfants", "Les enfants sont souvent fascinés par les animaux insolites, et ils apprennent mieux et plus vite quand ils s'amusent."],
      ["Passer du temps en famille", "Un moyen interactif et ludique de passer un bon moment ensemble."]
    ],
    decisions: [
      {t: "Un jeu de cartes", choix: "Un moyen interactif et ludique de passer du temps en famille, avec des animaux du monde entier et des informations importantes sur chacun.", pourquoi: "On apprend plus vite en s'amusant."},
      {t: "L'architecture de l'information d'abord", choix: "J'ai travaillé la structure de l'information de chaque carte : ce fut le cœur de notre travail.", pourquoi: "C'est essentiel pour un public d'enfants."},
      {t: "Un wiki en ligne", choix: "J'ai créé le prototype d'un wiki en ligne.", pourquoi: "Aider les joueurs à comprendre le jeu et à en savoir plus sur les animaux."}
    ]
  },
  5: {
    slider: true,
    hideEmpty: true,
    role: "Identité visuelle de ma propre marque",
    tools: "Flocage sur vêtements",
    status: "Marque en ligne",
    resume: {
      probleme: "Donner une identité à une marque de vêtements floqués qui me ressemble.",
      reponse: "Un logo caméléon coloré qui ne se cache pas, mais se démarque.",
      resultat: "Une identité fine et colorée, qui parle d'individualité et d'affirmation de soi."
    },
    contexte: "Ma propre marque de vêtements floqués, avec des designs que je dessine et qui me ressemblent. Ces dernières années, j'ai appris la technique du flocage sur vêtements, et elle m'a tout de suite fascinée. Unmatched est née de là.",
    probleme: [
      ["Une marque qui me ressemble", "Donner une identité à des vêtements floqués dont je dessine moi-même les designs."],
      ["Se démarquer plutôt que se fondre dans la masse", "Encourager l'authenticité et la confiance en soi, avec une mode colorée et distinctive."]
    ],
    decisions: [
      {t: "Un caméléon qui remonte à la surface", choix: "Le logo est un caméléon, mais pas un caméléon caché : il remonte à la surface.", pourquoi: "Pour dire qu'on peut se démarquer et être soi-même sans complexe."},
      {t: "Une identité fine et colorée", choix: "Une identité fine, avec des couleurs vives, qui parle d'individualité et d'affirmation de soi.", pourquoi: "Les couleurs vives reflètent le dynamisme de la marque et la variété des motifs de la collection."}
    ]
  },
  6: {
    slider: true,
    hideEmpty: true,
    role: "Développement de l'API REST et de l'interface en Vue.js",
    duree: "Janvier à février 2025",
    tools: "Vue.js, API REST",
    status: "Projet terminé, à améliorer",
    resume: {
      probleme: "Les SPA doivent présenter les animaux à adopter.",
      reponse: "Une application où l'on fait défiler les animaux, comme sur une application de rencontre.",
      resultat: "Un projet qui fonctionne, avec des améliorations identifiées."
    },
    contexte: "Un « Tinder pour animaux » : les SPA publient les animaux à adopter, et les utilisateurs font défiler les profils pour trouver le leur.",
    probleme: [
      ["Présenter les animaux à adopter", "Les SPA publient les animaux disponibles à l'adoption."],
      ["Trouver le sien", "Les utilisateurs font défiler les profils pour trouver l'animal qui leur correspond."]
    ],
    decisions: [
      {t: "Faire communiquer SPA et utilisateurs", choix: "Une communication directe entre les SPA et les utilisateurs."},
      {t: "Glisser pour aimer ou refuser", choix: "Like et dislike des animaux en les faisant glisser."},
      {t: "Des filtres", choix: "Des filtres pour trouver plus vite l'animal qui convient."},
      {t: "Un espace pour les SPA", choix: "Les SPA peuvent créer, modifier et supprimer des animaux."}
    ]
  },
  7: {
    slider: true,
    hideEmpty: true,
    role: "Création de vidéo par IA",
    duree: "Février 2025",
    tools: "ChatGPT, MidJourney, Runway, Adobe Premiere Pro, ElevenLabs",
    status: "Vidéo",
    resume: {
      probleme: "Réaliser une publicité pour une pizzeria de Florence uniquement avec de l'IA.",
      reponse: "Une idée : les pizzas sentent si bon qu'elles redonnent vie aux statues.",
      resultat: "Une publicité complète, du scénario à la voix italienne du slogan."
    },
    contexte: "Une publicité pour une pizzeria de Florence, réalisée entièrement avec de l'IA, en équipe de trois, dans le cadre d'un cours sur l'intelligence artificielle. L'idée : les pizzas sentent si bon qu'elles redonnent vie aux statues.",
    probleme: [
      ["Une publicité entièrement faite par IA", "Du scénario à la voix du slogan, chaque étape devait passer par un outil d'IA."],
      ["Garder une ambiance cohérente", "Le plus difficile : conserver la même ambiance graphique d'une image à l'autre."]
    ],
    decisions: [
      {t: "Le scénario", choix: "Écrit avec ChatGPT, en affinant les prompts jusqu'à ce que chaque partie de l'histoire nous convienne."},
      {t: "Le storyboard", choix: "Les images ont été créées avec MidJourney.", pourquoi: "Notre astuce pour garder une ambiance graphique cohérente : utiliser exactement la même phrase dans chaque prompt."},
      {t: "L'animation", choix: "Les images ont été animées avec Runway."},
      {t: "Le montage et le son", choix: "Montage sur Adobe Premiere Pro, ambiance sonore, et voix italienne du slogan créée avec ElevenLabs."}
    ]
  },
  8: {
    slider: true,
    hideEmpty: true,
    role: "Conception et développement",
    duree: "Depuis 2024, maintenance en cours",
    tools: "HTML, CSS, JavaScript, Vue.js",
    status: "En ligne, maintenu",
    resume: {
      probleme: "Un horloger indépendant de Genève a besoin d'une présence en ligne à la hauteur de son travail.",
      reponse: "Un site sur mesure, immersif, avec réservation et paiement intégrés.",
      resultat: "Un site en trois langues, que le client gère en toute autonomie."
    },
    contexte: "Le site de Bruno Pesenti, horloger indépendant à Genève : une vitrine pour sa collection et son savoir-faire, avec un service de réservation intégré. Je collabore avec Bruno depuis plusieurs années pour documenter et promouvoir son travail : catalogue imprimé, identité visuelle, logo, et ce site. Aujourd'hui, je continue d'assurer la maintenance et les mises à jour du site.",
    probleme: [
      ["Une vitrine à la hauteur de son travail", "Montrer sa collection et son savoir-faire, avec une interface immersive et facile à utiliser."],
      ["Réserver et payer en ligne", "Les clients doivent pouvoir réserver des pièces et régler les produits comme les livraisons."],
      ["Une clientèle internationale", "Le site doit parler à des clients de plusieurs pays."],
      ["Rester autonome", "Bruno doit pouvoir faire vivre son stock et ses réservations sans dépendre de moi."]
    ],
    decisions: [
      {t: "Un site codé à la main", choix: "Conçu et codé à la main (HTML, CSS, JavaScript avec Vue.js), avec une interface immersive et facile à utiliser, adaptée à tous les écrans, ordinateur comme mobile."},
      {t: "Un service de réservation", choix: "Les clients réservent des pièces et règlent les produits comme les livraisons."},
      {t: "Trois langues", choix: "Le site est proposé en français, en anglais et en italien.", pourquoi: "Pour sa clientèle internationale."},
      {t: "Une interface d'administration", choix: "Bruno ajoute, modifie ou supprime des pièces et gère ses réservations en toute autonomie."}
    ]
  },
  9: {
    slider: true,
    hideEmpty: true,
    role: "Rédaction, photographie, mise en page et choix des matériaux",
    tools: "Minion Variable Concept, papier couché demi-mat",
    status: "Catalogue imprimé",
    resume: {
      probleme: "Documenter et promouvoir la collection d'un horloger genevois.",
      reponse: "Un catalogue imprimé complet : textes, photographies, mise en page et papiers choisis.",
      resultat: "Plus qu'un catalogue, un témoignage du patrimoine horloger genevois, porté par une mise en page rigoureuse, de belles images et des matériaux raffinés."
    },
    contexte: "Le catalogue imprimé de la collection de Bruno Pesenti, horloger à Genève. J'ai voulu qu'il lui ressemble dans chaque détail. Je continue de collaborer avec Bruno, notamment pour la mise à jour de son site.",
    probleme: [
      ["Un catalogue qui lui ressemble", "Un objet imprimé fidèle à Bruno dans chaque détail, pour documenter et promouvoir sa collection."],
      ["Des pièces à présenter avec précision", "Des descriptions de produits claires et détaillées, et des photographies à la hauteur."]
    ],
    decisions: [
      {t: "Le contenu", choix: "J'ai rédigé des descriptions de produits claires et détaillées, pris les photographies et conçu la mise en page."},
      {t: "Une palette sobre et sombre", choix: "Des noirs profonds et des bruns riches.", pourquoi: "La couleur agit sur les émotions : ces tons évoquent le luxe et la sophistication de l'horlogerie."},
      {t: "Une police qui guide l'œil", choix: "« Minion Variable Concept », une police à empattements.", pourquoi: "Elle améliore la lisibilité : elle crée un fil horizontal invisible qui guide l'œil à travers les descriptions techniques."},
      {t: "Un papier à la hauteur", choix: "Couverture en papier de 200 g/m² avec un pelliculage mat « Soft Touch », agréable au toucher. Pages intérieures en papier couché demi-mat de 115 g/m².", pourquoi: "Pour une belle reproduction des photographies."}
    ]
  },
  10: {
    slider: true,
    hideEmpty: true,
    role: "Création du logo et de la carte de visite",
    status: "Identité visuelle",
    resume: {
      probleme: "Donner une identité simple à un horloger genevois.",
      reponse: "Un logo qui représente les aiguilles d'une montre réglées sur 10h10.",
      resultat: "Un logo qui représente bien l'identité de la marque de Bruno."
    },
    contexte: "Le logo et la carte de visite de Bruno Pesenti, horloger à Genève, créés dans le cadre de notre collaboration (catalogue, site web, identité visuelle). Je continue de collaborer avec lui, notamment pour la mise à jour de son site.",
    probleme: [
      ["Un logo compris au premier regard", "Un logo simple, que l'on comprend tout de suite."],
      ["Des tons qui fonctionnent partout", "Des couleurs qui marchent aussi bien sur fond sombre que sur fond clair."]
    ],
    decisions: [
      {t: "Les aiguilles sur 10h10", choix: "Le logo représente les aiguilles d'une montre réglées sur 10h10.", pourquoi: "C'est la norme dans le métier : dans la grande majorité des photos horlogères, les montres affichent cette heure pour l'équilibre esthétique."},
      {t: "Des tons sobres", choix: "Des couleurs sobres, qui fonctionnent aussi bien sur fond sombre que sur fond clair.", pourquoi: "Elles reflètent le luxe de l'horlogerie tout en restant fidèles à son héritage ancien."}
    ]
  },
  11: {
    slider: true,
    hideEmpty: true,
    role: "Création de la série « Coach like a woman »",
    tools: "Dessin, vidéo",
    status: "Projet d'école avec UEFA et Amazon",
    resume: {
      probleme: "Encourager les jeunes femmes à devenir entraîneuses de football.",
      reponse: "Une campagne « Tomorrow's Football » : un site web, des réseaux sociaux et une série animée interactive.",
      resultat: "Une campagne et le début du premier épisode de la série, dessiné."
    },
    contexte: "Une campagne pour encourager les jeunes femmes à devenir entraîneuses de football, dans le cadre d'un projet scolaire mené avec l'UEFA et Amazon. En équipe de huit, nous avons créé la campagne Tomorrow's Football : un site web, une campagne sur les réseaux sociaux et une série animée interactive.",
    probleme: [
      ["Donner envie de devenir entraîneuse", "Encourager de jeunes femmes à se lancer dans l'entraînement du football."]
    ],
    decisions: [
      {t: "Une série : « Coach like a woman »", choix: "Elle suit une jeune femme qui devient entraîneuse de l'équipe de football de sa sœur. J'étais en charge de sa création."},
      {t: "Interactive", choix: "Chaque épisode est créé en partie par le public. Nous avons interviewé une vraie personne, qui explique ce qu'elle souhaite voir dans l'épisode."},
      {t: "Entièrement dessinée", choix: "La série est dessinée de bout en bout. Le début du premier épisode a été réalisé."}
    ]
  },
  12: {
    slider: true,
    hideEmpty: true,
    role: "Tests d'utilisabilité : modération, puis observation",
    status: "Mission de test",
    resume: {
      probleme: "Tester l'utilisabilité d'une application bancaire en cours de développement.",
      reponse: "Des tests avec deux utilisateurs de profils différents.",
      resultat: "Des problèmes à résoudre, et des solutions proposées."
    },
    contexte: "Des tests d'utilisabilité sur l'application en cours de développement de Swissquote, groupe bancaire suisse (trading, investissement, services bancaires). Cette expérience m'a permis de mettre en pratique ce que j'avais appris en cours et de comprendre concrètement comment conduire un test d'utilisabilité.",
    probleme: [
      ["Repérer ce qui bloque", "Trouver les problèmes d'usage d'une application encore en développement."]
    ],
    decisions: [
      {t: "Des hypothèses d'abord", choix: "J'ai établi des hypothèses."},
      {t: "Deux profils d'utilisateurs", choix: "J'ai préparé des questions et des tâches pour deux utilisateurs de profils différents."},
      {t: "Modératrice, puis observatrice", choix: "Pendant les entretiens, j'ai été modératrice, puis observatrice."},
      {t: "Des solutions proposées", choix: "Les tests ont fait ressortir des problèmes à résoudre, et nous avons proposé des solutions. Je ne peux pas partager les résultats."}
    ]
  },
  32: {
    slider: true,
    hideEmpty: true,
    role: "Création du logo",
    status: "Identité visuelle",
    resume: {
      probleme: "Donner une identité aux ateliers de Mélanie, autour des produits maison naturels.",
      reponse: "Un colibri stylisé, dans des tons chauds et dorés.",
      resultat: "Un logo qui porte chaleur, espoir et résilience, facile à reconnaître et à retenir."
    },
    contexte: "Un logo pour les ateliers de Mélanie, qui accompagne chacun dans la création de produits maison naturels, à travers ses ateliers et son blog.",
    probleme: [
      ["Inspirer à rejoindre une mission", "Donner envie à chacun de rejoindre la mission de Mélanie."]
    ],
    decisions: [
      {t: "Une légende pour inspiration", choix: "La légende amérindienne du colibri : face à un terrible incendie de forêt, un petit colibri transporte inlassablement des gouttes d'eau pour l'éteindre, malgré les moqueries des autres. Quand on lui demande pourquoi, il répond qu'il fait sa part."},
      {t: "Un colibri stylisé, aux tons chauds et dorés", choix: "Un colibri stylisé, dans des tons chauds et dorés.", pourquoi: "Ils évoquent la dimension légendaire et naturelle du récit, portent la chaleur, l'espoir et la résilience, et rendent le logo facile à reconnaître et à retenir."},
      {t: "Chacun fait sa part", choix: "Comme le colibri, Ateliers Colibri permet à chacun de faire sa part, pour former ensemble un océan à partir de ruisseaux individuels."}
    ]
  },
  33: {
    slider: true,
    hideEmpty: true,
    role: "Création du logo",
    status: "Identité visuelle",
    resume: {
      probleme: "Donner une identité à un site sur la mythologie grecque, à la fois culturel et commercial.",
      reponse: "Une silhouette de la Grèce antique, dans des tons chauds et dorés.",
      resultat: "Un logo qui reflète l'identité du projet et qui se reconnaît facilement."
    },
    contexte: "Le logo d'un site en ligne consacré à la mythologie grecque, qui devait aussi évoquer l'aspect commercial du projet.",
    probleme: [
      ["Évoquer la mythologie et le commerce", "Un logo à la fois culturel et commercial."]
    ],
    decisions: [
      {t: "Une silhouette de la Grèce antique", choix: "Une silhouette de la Grèce antique, accompagnée d'éléments graphiques qui évoquent les dieux et les héros."},
      {t: "Des tons chauds et dorés", choix: "Des couleurs chaudes et dorées.", pourquoi: "Pour renforcer l'aspect mythologique et donner une impression de richesse et de mystère."}
    ]
  },
  34: {
    slider: true,
    hideEmpty: true,
    role: "Conception et développement",
    tools: "Flutter, Android",
    status: "Application Android",
    resume: {
      probleme: "Suivre son temps d'écran.",
      reponse: "Un lion dont la santé et le bonheur dépendent du temps passé sur le téléphone.",
      resultat: "Une application Android avec widget et notifications."
    },
    contexte: "Une application Android, créée avec Flutter, pour suivre son temps d'écran avec l'aide d'un lion.",
    probleme: [
      ["Suivre son temps d'écran", "L'utilisateur choisit les applications à suivre, puis voit chaque jour le temps total passé sur son téléphone."]
    ],
    decisions: [
      {t: "Un lion comme symbole", choix: "Un lion dont la santé et le bonheur dépendent du temps d'écran : trop long, il devient triste et malade ; raisonnable, il est heureux et en pleine forme.", pourquoi: "Les couleurs de l'application changent aussi selon le temps d'écran."},
      {t: "Au quotidien", choix: "Un widget pour suivre la progression du lion depuis l'écran d'accueil, et une notification toutes les quinze minutes passées sur le téléphone."}
    ]
  },
  37: {
    slider: true,
    hideEmpty: true,
    role: "Conception, identité visuelle et développement",
    tools: "Code front-end",
    status: "En ligne, en français et en anglais",
    resume: {
      probleme: "Avoir un site à moi pour montrer et vendre mes portraits d'animaux à l'acrylique.",
      reponse: "Un site conçu et codé entièrement par moi, de l'identité visuelle au front-end.",
      resultat: "Un site avec galerie, portraits sur commande, cartes cadeaux et boutique."
    },
    contexte: "Mon propre site pour mes portraits d'animaux à l'acrylique. Je l'ai entièrement conçu et codé, de l'identité visuelle au front-end.",
    probleme: [
      ["Montrer et vendre mes peintures", "Un site à moi, pour présenter mes portraits d'animaux et permettre d'acheter directement."]
    ],
    decisions: [
      {t: "Ce qu'on y trouve", choix: "Une galerie de mes peintures, un service de portrait sur commande pour faire peindre son propre animal, des cartes cadeaux et une boutique en ligne pour acheter des œuvres directement."},
      {t: "Un design fidèle à mon identité", choix: "Une palette chaude et douce, un monogramme « EP » dessiné à la main, et des illustrations d'animaux simples et réalistes."},
      {t: "Deux langues", choix: "Le site est disponible en français et en anglais."}
    ]
  },
};
