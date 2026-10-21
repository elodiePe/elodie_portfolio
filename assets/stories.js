/* The stories of the case studies, told on a phone (see story.js). One story per project id, in French and in English.
   A step: w = the time on the phone, k = "p" (the problem, before) or "a" (the answer, after), t = title, x = text,
   s = the screen, a list of pieces of interface: ["bar", title, right] ["search", placeholder, value] ["sheet", rows]
   ["list", [[title, sub, emoji]]] ["cards", …] ["chips", labels, active] ["bubble", text, "me"|"them"] ["note", text, hue, tilt]
   ["alert", text] ["toast", text] ["cap", text] ["btn", label, "primary"|"ghost"|"cam", message once pressed]
   ["stat", [[value, label]]] ["bars", [[label, percent]]] ["big", value, label] ["slide", title, annotation]
   ["flash", front, back, hint] ["slider", label, target, message] ["email", from, subject, preview, flagged]
   ["url", text, suspicious part] ["field", label, value] ["map", pins, "route"] ["stars", n] ["avatars", [emoji], text].
   The data of the screens is made up: say so in `legend`. */
window.STORIES = {
  39: {
    fr: {
      kicker: "L'histoire", title: "Une journée avec Bruno", intro: "Bruno est horloger. Il n'a pas d'ordinateur : tout se passe sur son téléphone.",
      before: "Avant", after: "Maintenant", legend: "",
      steps: [
        {w: "9:10", k: "p", m: "😵‍💫", t: "Il ouvre son tableur", x: "Sur un petit écran, le Google Sheet est minuscule. Il pince, il fait glisser, il perd sa ligne.",
         s: [["bar", "Google Sheets", "⋮"], ["sheet", [["Réf.", "Type", "Matière", "Ø", "Année", "Notes"], ["012", "Montre de poche", "Argent", "46", "1890", "—"], ["013", "Chronographe", "Acier", "38", "1952", "à vérifier"], ["014", "Bracelet", "Or", "34", "1965", "—"], ["015", "Montre de poche", "Or", "44", "1901", "cadran fêlé"], ["016", "Régulateur", "Laiton", "—", "1880", "—"], ["017", "Chronographe", "Acier", "40", "1948", "—"]]], ["cap", "Pincer pour zoomer…"]]},
        {w: "9:25", k: "p", m: "😣", t: "Une liste, rien d'autre", x: "Recherche lente, tri compliqué. Combien de pièces ? De quelle époque ? Impossible de le voir d'un coup d'œil.",
         s: [["bar", "Google Sheets", "⋮"], ["alert", "Aucune vue d'ensemble"], ["big", "?", "pièces au total, de quelles époques ?"], ["btn", "Trier la colonne…", "ghost"]]},
        {w: "10:00", k: "p", m: "🤔", t: "« En ai-je déjà une comme celle-ci ? »", x: "Un client lui montre une montre. Pour savoir s'il en possède une semblable, il doit tout reparcourir.",
         s: [["bar", "Photos"], ["note", "Une montre apportée par un client", 35, -3], ["alert", "Il faudrait tout reparcourir à la main…"], ["btn", "Chercher dans le tableur", "ghost"]]},
        {w: "10:05", k: "a", th: "watch", m: "😌", t: "Il ouvre Inventaire", x: "Une application privée, en français, pensée pour son téléphone : de grandes images, faciles à lire.",
         s: [["app", "collection"]]},
        {w: "10:10", k: "a", th: "watch", t: "Il cherche et il trie", x: "Une recherche, des filtres, un tri : il retrouve une pièce en quelques touches. Essayez : effacez, puis tapez « réveil » ou « seeland ».",
         s: [["app", "collection", "mido"]]},
        {w: "10:15", k: "a", th: "watch", m: "🤩", t: "Il cherche par photo", x: "Il ajoute la photo de la montre du client, ou la décrit. L'IA cherche un produit similaire dans sa collection. Touchez « Prendre une photo », puis « Rechercher ».",
         s: [["app", "ia"]]},
        {w: "18:00", k: "a", th: "watch", m: "😄", t: "Il voit sa collection d'un coup d'œil", x: "Des statistiques sur son inventaire, sans rien calculer.",
         s: [["app", "stats"]]},
      ]
    },
    en: {
      kicker: "The story", title: "A day with Bruno", intro: "Bruno is a watchmaker. He has no computer: everything happens on his phone.",
      before: "Before", after: "Now", legend: "",
      steps: [
        {w: "9:10", k: "p", m: "😵‍💫", t: "He opens his spreadsheet", x: "On a small screen, the Google Sheet is tiny. He pinches, drags, loses his row.",
         s: [["bar", "Google Sheets", "⋮"], ["sheet", [["Ref.", "Type", "Material", "Ø", "Year", "Notes"], ["012", "Pocket watch", "Silver", "46", "1890", "—"], ["013", "Chronograph", "Steel", "38", "1952", "to check"], ["014", "Bracelet", "Gold", "34", "1965", "—"], ["015", "Pocket watch", "Gold", "44", "1901", "cracked dial"], ["016", "Regulator", "Brass", "—", "1880", "—"], ["017", "Chronograph", "Steel", "40", "1948", "—"]]], ["cap", "Pinch to zoom…"]]},
        {w: "9:25", k: "p", m: "😣", t: "A list, nothing more", x: "Slow search, awkward sorting. How many pieces? From which era? Impossible to see at a glance.",
         s: [["bar", "Google Sheets", "⋮"], ["alert", "No overview"], ["big", "?", "pieces in total, from which eras?"], ["btn", "Sort the column…", "ghost"]]},
        {w: "10:00", k: "p", m: "🤔", t: "“Do I already have one like this?”", x: "A customer shows him a watch. To know whether he owns a similar one, he has to go through everything again.",
         s: [["bar", "Photos"], ["note", "A watch brought by a customer", 35, -3], ["alert", "He would have to go through it all by hand…"], ["btn", "Search the spreadsheet", "ghost"]]},
        {w: "10:05", k: "a", th: "watch", m: "😌", t: "He opens Inventaire", x: "A private app, in French, designed for his phone: big images, easy to read.",
         s: [["app", "collection"]]},
        {w: "10:10", k: "a", th: "watch", t: "He searches and sorts", x: "A search, filters, sorting: he finds a piece in a few taps. Try it: clear the field, then type “alarm” or “seeland”.",
         s: [["app", "collection", "mido"]]},
        {w: "10:15", k: "a", th: "watch", m: "🤩", t: "He searches by photo", x: "He adds a photo of the customer's watch, or describes it. The AI looks for a similar product in his collection. Tap “Prendre une photo”, then “Rechercher”.",
         s: [["app", "ia"]]},
        {w: "18:00", k: "a", th: "watch", m: "😄", t: "He sees his collection at a glance", x: "Statistics about his inventory, without calculating anything.",
         s: [["app", "stats"]]},
      ]
    }
  },

  38: {
    fr: {
      kicker: "L'histoire", title: "Une journée de cours", intro: "Suivez un étudiant, de son premier cours à ses révisions du soir.",
      before: "Avant", after: "Maintenant", device: "laptop", legend: "L'application Pinday elle-même (démo, en anglais). Touchez, écrivez, faites défiler : elle est vivante.",
      steps: [
        {w: "8:30", k: "p", m: "😵‍💫", t: "Trois outils ouverts avant le début", x: "Les notes sont dans un outil, les slides en PDF ailleurs, l'emploi du temps dans un calendrier.",
         s: [["bar", "Mes outils"], ["note", "notes-cours.doc", 50, -2], ["note", "slides_chapitre3.pdf", 10, 2], ["note", "Calendrier : cours à 8h30", 200, -1], ["alert", "Tout est ailleurs"]]},
        {w: "9:15", k: "p", m: "😣", t: "Noter sur une slide, c'est compliqué", x: "Avec la plupart des outils, on passe d'une fenêtre à l'autre et on perd le fil.",
         s: [["slide", "Chapitre 3 · Les statistiques"], ["cap", "Je passe d'une fenêtre à l'autre…"], ["alert", "J'ai perdu le fil de la slide"]]},
        {w: "21:00", k: "p", m: "😩", t: "Réviser « quand on a le temps »", x: "Sans plan, et relire ne suffit pas pour retenir. Il fallait quelque chose de didactique et d'interactif.",
         s: [["big", "J-13", "avant l'examen"], ["alert", "Aucun plan de révision"], ["cap", "Relire, relire, relire…"]]},
        {w: "8:25", k: "a", th: "pinday", m: "😌", t: "Une seule application pour la journée", x: "Le prochain cours en haut, avec son compte à rebours, puis la suite de la journée : l'emploi du temps, les notes et les révisions au même endroit.",
         s: [["pinday", "home"]]},
        {w: "9:15", k: "a", th: "pinday", t: "On note directement sur la slide", x: "On dessine, on annote, on écrit à côté, en markdown ou avec un éditeur simple. À plusieurs, en direct, si on veut.",
         s: [["pinday", "note"]]},
        {w: "12:00", k: "a", th: "pinday", t: "Le cours s'organise tout seul", x: "Un dossier par cours, un fichier par séance : ils sont créés automatiquement. Rien à faire.",
         s: [["pinday", "library"]]},
        {w: "13:00", k: "a", th: "pinday", m: "🤩", t: "Tout est relié", x: "Les notes, les dossiers et les cours se relient entre eux. On voit d'un coup d'œil où l'on en est, examens compris.",
         s: [["pinday", "map"]]},
        {w: "19:00", k: "a", th: "pinday", t: "On sait quoi réviser, étape par étape", x: "Résumé, cartes de révision, quiz : une séance guidée, avec le temps prévu pour chaque étape.",
         s: [["pinday", "session"]]},
        {w: "19:30", k: "a", th: "pinday", m: "🤩", t: "On révise de façon interactive", x: "Des cartes à retourner, avec répétition espacée : une question à la fois.",
         s: [["pinday", "cards"]]},
        {w: "20:00", k: "a", th: "pinday", m: "😄", t: "Les examens guident le plan", x: "On ajoute ses examens : un plan de révision apparaît dans l'emploi du temps, autour des cours.",
         s: [["pinday", "exams"]]}
      ]
    },
    en: {
      kicker: "The story", title: "A day of classes", intro: "Follow a student, from the first class to the evening revision.",
      before: "Before", after: "Now", device: "laptop", legend: "The Pinday app itself (demo). Tap, write, scroll: it is alive.",
      steps: [
        {w: "8:30", k: "p", m: "😵‍💫", t: "Three tools open before it starts", x: "Notes are in one tool, slides as PDFs elsewhere, the schedule in a calendar.",
         s: [["bar", "My tools"], ["note", "class-notes.doc", 50, -2], ["note", "slides_chapter3.pdf", 10, 2], ["note", "Calendar: class at 8:30", 200, -1], ["alert", "Everything is somewhere else"]]},
        {w: "9:15", k: "p", m: "😣", t: "Taking notes on a slide is awkward", x: "With most tools, you jump from one window to another and lose the thread.",
         s: [["slide", "Chapter 3 · Statistics"], ["cap", "I jump from one window to the other…"], ["alert", "I lost track of the slide"]]},
        {w: "21:00", k: "p", m: "😩", t: "Revising “when there's time”", x: "No plan, and rereading isn't enough to remember. It needed to be didactic and interactive.",
         s: [["big", "D-13", "before the exam"], ["alert", "No revision plan"], ["cap", "Reread, reread, reread…"]]},
        {w: "8:25", k: "a", th: "pinday", m: "😌", t: "One app for the whole day", x: "The next class on top, with its countdown, then the rest of the day: schedule, notes and revision in one place.",
         s: [["pinday", "home"]]},
        {w: "9:15", k: "a", th: "pinday", t: "Take notes right on the slide", x: "Draw, annotate, write next to it, in markdown or with a simple editor. Together, live, if you like.",
         s: [["pinday", "note"]]},
        {w: "12:00", k: "a", th: "pinday", t: "The course organises itself", x: "One folder per course, one file per session: they are created automatically. Nothing to do.",
         s: [["pinday", "library"]]},
        {w: "13:00", k: "a", th: "pinday", m: "🤩", t: "Everything is linked", x: "Notes, folders and courses link to each other. You see at a glance where you stand, exams included.",
         s: [["pinday", "map"]]},
        {w: "19:00", k: "a", th: "pinday", t: "You know what to revise, step by step", x: "Summary, flashcards, quiz: a guided session, with the time planned for each step.",
         s: [["pinday", "session"]]},
        {w: "19:30", k: "a", th: "pinday", m: "🤩", t: "Revise interactively", x: "Cards to flip, with spaced repetition: one question at a time.",
         s: [["pinday", "cards"]]},
        {w: "20:00", k: "a", th: "pinday", m: "😄", t: "Exams shape the plan", x: "You add your exams: a revision plan appears in your schedule, around your classes.",
         s: [["pinday", "exams"]]}
      ]
    }
  },

  36: {
    fr: {
      kicker: "L'histoire", title: "Une soirée en famille", intro: "Entre les devoirs, les repas et l'argent de poche, il y a beaucoup à penser.",
      before: "Avant", after: "Maintenant", legend: "L'application MyHouzly elle-même (démo, famille inventée) : touchez, tapez, essayez.",
      steps: [
        {w: "18:30", k: "p", m: "😵‍💫", t: "Beaucoup à faire, beaucoup à penser", x: "L'argent des enfants, la lessive, les repas, les courses, les tâches liées aux enfants : chacun vit à son endroit, ou dans la tête.",
         s: [["bar", "Dans ma tête"], ["note", "Lessive", 50, -3], ["note", "Courses : lait, pain…", 10, 2], ["note", "Argent de poche ?", 200, -2], ["note", "Devoirs", 150, 3], ["alert", "Tout est dans la tête"]]},
        {w: "19:00", k: "p", m: "😣", t: "« J'ai combien ? »", x: "L'enfant ne sait pas combien il a, ni ce qu'il a économisé au fil des mois.",
         s: [["bubble", "Maman, j'ai combien ?", "me"], ["bubble", "Euh… je regarde.", "them"], ["big", "?", "personne ne le sait vraiment"]]},
        {w: "19:30", k: "p", m: "😤", t: "Les demandes se perdent", x: "Les demandes d'argent passent à l'oral : elles s'oublient, ou elles se discutent.",
         s: [["bubble", "Je peux avoir 5 francs ?", "me"], ["bubble", "Demande-moi demain.", "them"], ["alert", "Demain, on aura oublié"]]},
        {w: "18:35", k: "a", m: "😌", t: "Tout au même endroit", x: "L'argent des enfants, les tâches, les repas et les courses : une seule application, avec l'accueil de chacun.",
         s: [["myhouzly", "home"]]},
        {w: "19:05", k: "a", t: "Chaque enfant voit son compte", x: "Son solde, son argent de poche automatique et son historique : plus besoin de demander « j'ai combien ? ».",
         s: [["myhouzly", "money"]]},
        {w: "19:20", k: "a", m: "🤩", t: "Un objectif pour économiser", x: "L'enfant choisit ce qu'il veut s'offrir et voit la barre avancer à chaque franc mis de côté.",
         s: [["myhouzly", "savings"]]},
        {w: "19:35", k: "a", m: "😌", t: "La demande, par écrit", x: "L'enfant demande dans l'application : le montant, pour quoi faire, à qui. Plus de « demande-moi demain ».",
         s: [["myhouzly", "request"]]},
        {w: "19:40", k: "a", m: "😄", t: "Le parent répond en un geste", x: "Les demandes arrivent à un seul endroit. Accepter ou refuser : le solde se met à jour tout seul.",
         s: [["myhouzly", "parent"]]},
        {w: "19:50", k: "a", m: "🐥", t: "Une interface pour les plus petits", x: "Une seule page : un compagnon qui grandit avec l'épargne, la demande d'argent et les quêtes du jour. Rien d'autre.",
         s: [["myhouzly", "young"]]},
        {w: "20:00", k: "a", m: "😄", t: "Les tâches, chacun son tour", x: "Les repas et le linge tournent entre les membres de la famille, et chacun coche ce qu'il a fait.",
         s: [["myhouzly", "tasks"]]},
        {w: "20:10", k: "a", m: "😋", t: "Qui cuisine ce soir ?", x: "Chaque famille règle sa rotation, midi et soir. Chacun a sa couleur, et le tour du jour est mis en avant.",
         s: [["myhouzly", "meals"]]},
        {w: "20:20", k: "a", m: "😌", t: "Le ménage, sans négociation", x: "Les tours de ménage tournent d'une semaine à l'autre : on voit d'un coup d'œil qui fait quoi.",
         s: [["myhouzly", "clean"]]},
        {w: "20:30", k: "a", m: "🛎️", t: "Un mode pour ne rien oublier", x: "Pour celles et ceux qui oublient facilement (le mode ADHD), une alerte urgente revient jusqu'à ce que la tâche soit cochée.",
         s: [["myhouzly", "adhd"]]},
        {w: "20:45", k: "a", m: "🤓", t: "Pour les ados : découvrir les actions", x: "Un portefeuille d'actions supervisé par les parents, pour apprendre à investir sans risque réel.",
         s: [["myhouzly", "stocks"]]}
      ]
    },
    en: {
      kicker: "The story", title: "An evening with the family", intro: "Between homework, meals and pocket money, there is a lot to think about.",
      before: "Before", after: "Now", legend: "The MyHouzly app itself (demo, an invented family): tap, type, try.",
      steps: [
        {w: "18:30", k: "p", m: "😵‍💫", t: "So much to do, so much to think about", x: "The children's money, laundry, meals, shopping, child-related tasks: each lives in its own place, or in someone's head.",
         s: [["bar", "In my head"], ["note", "Laundry", 50, -3], ["note", "Shopping: milk, bread…", 10, 2], ["note", "Pocket money?", 200, -2], ["note", "Homework", 150, 3], ["alert", "It's all in my head"]]},
        {w: "19:00", k: "p", m: "😣", t: "“How much do I have?”", x: "The child doesn't know how much they have, nor what they have saved over the months.",
         s: [["bubble", "Mum, how much do I have?", "me"], ["bubble", "Er… let me check.", "them"], ["big", "?", "nobody really knows"]]},
        {w: "19:30", k: "p", m: "😤", t: "Requests get lost", x: "Requests for money are made out loud: they get forgotten, or argued over.",
         s: [["bubble", "Can I have 5 francs?", "me"], ["bubble", "Ask me tomorrow.", "them"], ["alert", "Tomorrow, we'll have forgotten"]]},
        {w: "18:35", k: "a", m: "😌", t: "Everything in one place", x: "The children's money, chores, meals and shopping: a single app, with a home screen for each person.",
         s: [["myhouzly", "home"]]},
        {w: "19:05", k: "a", t: "Each child sees their account", x: "Their balance, their automatic pocket money and their history: no more “how much do I have?”.",
         s: [["myhouzly", "money"]]},
        {w: "19:20", k: "a", m: "🤩", t: "A goal to save for", x: "The child picks what they want to buy and watches the bar move with every franc put aside.",
         s: [["myhouzly", "savings"]]},
        {w: "19:35", k: "a", m: "😌", t: "The request, in writing", x: "The child asks in the app: how much, what for, and who. No more “ask me tomorrow”.",
         s: [["myhouzly", "request"]]},
        {w: "19:40", k: "a", m: "😄", t: "The parent answers in one tap", x: "Requests arrive in one place. Accept or decline: the balance updates on its own.",
         s: [["myhouzly", "parent"]]},
        {w: "19:50", k: "a", m: "🐥", t: "An interface for the little ones", x: "A single page: a companion that grows with the savings, the money request and the quests of the day. Nothing else.",
         s: [["myhouzly", "young"]]},
        {w: "20:00", k: "a", m: "😄", t: "Chores, everyone in turn", x: "Meals and laundry rotate between family members, and everyone ticks off what they did.",
         s: [["myhouzly", "tasks"]]},
        {w: "20:10", k: "a", m: "😋", t: "Who is cooking tonight?", x: "Each family sets its own rota, lunch and dinner. Everyone has a colour, and today's turn stands out.",
         s: [["myhouzly", "meals"]]},
        {w: "20:20", k: "a", m: "😌", t: "Housework, without negotiating", x: "Housework turns rotate from one week to the next: you see at a glance who does what.",
         s: [["myhouzly", "clean"]]},
        {w: "20:30", k: "a", m: "🛎️", t: "A mode so nothing is forgotten", x: "For people who forget easily (ADHD mode), an urgent alert keeps coming back until the task is ticked off.",
         s: [["myhouzly", "adhd"]]},
        {w: "20:45", k: "a", m: "🤓", t: "For teens: discovering stocks", x: "A stock portfolio supervised by the parents, to learn about investing with no real risk.",
         s: [["myhouzly", "stocks"]]}
      ]
    }
  },

  6: {
    fr: {
      kicker: "L'application", title: "Essayez l'application", intro: "Le vrai code de l'application (Vue.js), avec des données inventées : touchez, faites glisser, écrivez à la SPA.",
      before: "Avant", after: "L'application", legend: "L'application elle-même (démo, en français, données inventées) : touchez, faites glisser, écrivez.",
      steps: [
        {w: "10:00", k: "a", m: "👋", t: "Se connecter", x: "Un compte pour les personnes qui veulent adopter, un autre pour les SPA.",
         s: [["adopt", "login"]]},
        {w: "10:01", k: "a", m: "😍", t: "Glisser pour aimer ou refuser", x: "Un animal à la fois : à droite pour aimer, à gauche pour passer. Des filtres par type ou par caractère.",
         s: [["adopt", "home"]]},
        {w: "10:02", k: "a", m: "🧐", t: "Tout savoir sur l'animal", x: "On touche la carte pour voir ses photos, son âge, son caractère et la SPA qui l'accueille.",
         s: [["adopt", "details"]]},
        {w: "10:04", k: "a", m: "❤️", t: "Les coups de cœur", x: "Les animaux aimés sont réunis au même endroit : on peut en retirer un ou ouvrir la discussion avec la SPA.",
         s: [["adopt", "likes"]]},
        {w: "10:06", k: "a", m: "💬", t: "Parler avec la SPA", x: "La conversation se fait en direct, avec le statut de la demande : en attente, accepté ou refusé.",
         s: [["adopt", "chat"]]},
        {w: "10:20", k: "a", m: "🏠", t: "Côté SPA", x: "La SPA voit ses animaux, peut les modifier ou les supprimer, et suit les discussions de chacun.",
         s: [["adopt", "spa"]]},
        {w: "10:25", k: "a", m: "➕", t: "Ajouter un animal", x: "Une fiche en quelques étapes : nom, âge, description, caractère et jusqu'à trois photos.",
         s: [["adopt", "add"]]}
      ]
    },
    en: {
      kicker: "The app", title: "Try the app", intro: "The real code of the app (Vue.js), with invented data: tap, swipe, write to the shelter.",
      before: "Before", after: "The app", legend: "The app itself (demo, in French, invented data): tap, swipe, write.",
      steps: [
        {w: "10:00", k: "a", m: "👋", t: "Signing in", x: "One account for people who want to adopt, another for the shelters.",
         s: [["adopt", "login"]]},
        {w: "10:01", k: "a", m: "😍", t: "Swipe to like or reject", x: "One animal at a time: right to like, left to pass. Filters by type or by character.",
         s: [["adopt", "home"]]},
        {w: "10:02", k: "a", m: "🧐", t: "Everything about the animal", x: "You tap the card to see its photos, age, character and the shelter that looks after it.",
         s: [["adopt", "details"]]},
        {w: "10:04", k: "a", m: "❤️", t: "The favourites", x: "The animals you liked are gathered in one place: you can remove one or open the discussion with the shelter.",
         s: [["adopt", "likes"]]},
        {w: "10:06", k: "a", m: "💬", t: "Talking with the shelter", x: "The conversation is live, with the status of the request: pending, accepted or rejected.",
         s: [["adopt", "chat"]]},
        {w: "10:20", k: "a", m: "🏠", t: "The shelter side", x: "The shelter sees its animals, can edit or delete them, and follows the discussions of each.",
         s: [["adopt", "spa"]]},
        {w: "10:25", k: "a", m: "➕", t: "Adding an animal", x: "A form in a few steps: name, age, description, character and up to three photos.",
         s: [["adopt", "add"]]}
      ]
    }
  },

  1: {
    fr: {
      kicker: "L'histoire", title: "Un dimanche de balade", intro: "On a envie de sortir. Reste à trouver où aller, comment y aller, et si ça vaut le coup.",
      before: "Avant", after: "Maintenant", legend: "",
      steps: [
        {w: "10:00", k: "p", m: "🤔", t: "Où aller ?", x: "Beaucoup d'options, peu de repères pour choisir le bon chemin.",
         s: [["search", "Rechercher une balade"], ["list", [["Balade n° 1", "3 h", "🥾"], ["Balade n° 2", "3 h", "🥾"], ["Balade n° 3", "2 h 30", "🥾"], ["Balade n° 4", "3 h", "🥾"]]], ["alert", "47 résultats : lequel choisir ?"]]},
        {w: "10:20", k: "p", m: "😣", t: "Passer de l'envie à la balade", x: "Une fois le chemin trouvé, il faut changer d'outil pour y aller.",
         s: [["bar", "Tour du lac · 3 h"], ["cap", "Copier l'adresse…"], ["btn", "Ouvrir une autre application", "ghost"], ["alert", "Je change d'outil pour y aller"]]},
        {w: "11:00", k: "p", m: "😕", t: "Est-ce que ça vaut le coup ?", x: "Savoir ce que les autres ont pensé d'un chemin avant de s'y lancer.",
         s: [["bar", "Tour du lac"], ["cap", "Aucun avis sur ce chemin"], ["stars", 0], ["alert", "Je ne sais pas ce que les autres en pensent"]]},
        {w: "10:05", k: "a", m: "😌", t: "Tout part de l'accueil", x: "Les sentiers les plus populaires, les lieux récents et les thèmes : on trouve une idée sans rien chercher.",
         s: [["vaudsentiers", "home"]]},
        {w: "10:10", k: "a", t: "Chercher sur la carte", x: "Une carte avec les lieux du canton : on touche un point pour voir le sentier.",
         s: [["vaudsentiers", "mapsel"]]},
        {w: "10:15", k: "a", m: "🤩", t: "Une couleur par critère", x: "La recherche garde ses filtres sous les yeux, et chaque thème a sa couleur : on se repère d'un coup d'œil.",
         s: [["vaudsentiers", "results"]]},
        {w: "10:30", k: "a", m: "😄", t: "Un sentier, tout au même endroit", x: "Description, itinéraire, lieux à voir, accessibilité : on peut enregistrer le sentier ou commencer la navigation.",
         s: [["vaudsentiers", "detail"]]},
        {w: "15:30", k: "a", m: "😄", t: "Noter et commenter", x: "Après la balade, on laisse son avis, et l'on voit ce que les autres en ont pensé.",
         s: [["vaudsentiers", "detailrev"]]}
      ]
    },
    en: {
      kicker: "The story", title: "A Sunday walk", intro: "You feel like going out. Now to find where to go, how to get there, and whether it's worth it.",
      before: "Before", after: "Now", legend: "",
      steps: [
        {w: "10:00", k: "p", m: "🤔", t: "Where to go?", x: "Lots of options, few landmarks to choose the right path.",
         s: [["search", "Search a walk"], ["list", [["Walk no. 1", "3 h", "🥾"], ["Walk no. 2", "3 h", "🥾"], ["Walk no. 3", "2 h 30", "🥾"], ["Walk no. 4", "3 h", "🥾"]]], ["alert", "47 results: which one to choose?"]]},
        {w: "10:20", k: "p", m: "😣", t: "From the wish to the walk", x: "Once the path is found, you have to switch tools to get there.",
         s: [["bar", "Lake loop · 3 h"], ["cap", "Copy the address…"], ["btn", "Open another app", "ghost"], ["alert", "I switch tools to get there"]]},
        {w: "11:00", k: "p", m: "😕", t: "Is it worth it?", x: "Knowing what others thought of a path before setting off.",
         s: [["bar", "Lake loop"], ["cap", "No review on this path"], ["stars", 0], ["alert", "I don't know what others think"]]},
        {w: "10:05", k: "a", m: "😌", t: "It all starts from the home page", x: "The most popular trails, the newest places and the themes: you find an idea without searching for anything.",
         s: [["vaudsentiers", "home"]]},
        {w: "10:10", k: "a", t: "Searching on the map", x: "A map with the places of the canton: you tap a point to see the trail.",
         s: [["vaudsentiers", "mapsel"]]},
        {w: "10:15", k: "a", m: "🤩", t: "One colour per criterion", x: "The search keeps its filters in view, and every theme has its own colour: you find your way at a glance.",
         s: [["vaudsentiers", "results"]]},
        {w: "10:30", k: "a", m: "😄", t: "A trail, everything in one place", x: "Description, route, places to see, accessibility: you can save the trail or start the navigation.",
         s: [["vaudsentiers", "detail"]]},
        {w: "15:30", k: "a", m: "😄", t: "Rate and comment", x: "After the walk, you leave your opinion, and you see what others thought.",
         s: [["vaudsentiers", "detailrev"]]}
      ]
    }
  },

  35: {
    fr: {
      kicker: "L'histoire", title: "Un lundi matin au bureau", intro: "Un e-mail qui semble venir de la direction. Un gestionnaire de mots de passe qui va vite.",
      before: "Sans le défi", after: "Avec le défi", legend: "",
      steps: [
        {w: "8:45", k: "p", m: "😬", t: "Un e-mail « de la direction »", x: "Dans une attaque BEC, un pirate se fait passer pour un supérieur hiérarchique.",
         s: [["bar", "Boîte de réception"], ["email", "Direction", "Urgent : connexion à l'intranet", "Peux-tu te connecter tout de suite ?", 1], ["email", "Équipe", "Compte rendu de lundi", "Voici le résumé de la réunion…"]]},
        {w: "8:46", k: "p", m: "😣", t: "Le gestionnaire remplit tout, vite", x: "Les identifiants se remplissent d'un geste. On se connecte en quelques secondes.",
         s: [["url", "https://intranet-societe.com"], ["field", "Identifiant", "prenom.nom"], ["field", "Mot de passe", "••••••••••"], ["btn", "Se connecter", "primary"], ["cap", "Une seconde, c'est fait."]]},
        {w: "8:47", k: "p", m: "😱", t: "Personne n'a regardé l'adresse", x: "Quand tout est fluide, on prête moins attention à l'adresse du site.",
         s: [["url", "https://intranet-soc1ete.com", "soc1ete"], ["alert", "Un seul caractère change : l'attaque est passée"]]},
        {w: "Test", k: "a", m: "🤔", t: "Un petit défi avant le mot de passe", x: "Avant d'afficher le mot de passe, le gestionnaire demande un petit geste, inspiré des CAPTCHA.",
         s: [["bar", "Gestionnaire de mots de passe"], ["cap", "Avant d'afficher le mot de passe :"], ["slider", "Placez le curseur sur 7", 7, "Défi réussi : le mot de passe s'affiche"], ["url", "https://intranet-societe.com"]]},
        {w: "Test", k: "a", t: "On l'a testé avec 24 personnes", x: "Deux groupes égaux : un gestionnaire standard, ou celui avec friction. Dix e-mails, dont trois attaques, puis un questionnaire.",
         s: [["stat", [["24", "participants"], ["10", "e-mails"], ["3", "attaques"]]], ["cap", "Attaques repérées : aucune différence significative entre les groupes."]]},
        {w: "Résultats", k: "a", m: "💡", t: "Ce qu'on a mesuré", x: "La friction n'a pas amélioré la détection des attaques, mais elle a changé la perception du gestionnaire.",
         s: [["stat", [["89", "SUS · standard"], ["78", "SUS · avec friction"]]], ["cap", "Le groupe standard le juge plus efficace, l'autre plus original et plus agréable visuellement."]]}
      ]
    },
    en: {
      kicker: "The story", title: "A Monday morning at the office", intro: "An email that seems to come from management. A password manager that is fast.",
      before: "Without the challenge", after: "With the challenge", legend: "",
      steps: [
        {w: "8:45", k: "p", m: "😬", t: "An email “from management”", x: "In a BEC attack, a hacker poses as someone higher up in the company.",
         s: [["bar", "Inbox"], ["email", "Management", "Urgent: intranet sign-in", "Can you sign in right now?", 1], ["email", "Team", "Monday meeting notes", "Here is the summary of the meeting…"]]},
        {w: "8:46", k: "p", m: "😣", t: "The manager fills everything in, fast", x: "Credentials fill in with one gesture. You sign in within seconds.",
         s: [["url", "https://intranet-company.com"], ["field", "Username", "first.last"], ["field", "Password", "••••••••••"], ["btn", "Sign in", "primary"], ["cap", "One second, done."]]},
        {w: "8:47", k: "p", m: "😱", t: "Nobody looked at the address", x: "When everything is smooth, you pay less attention to the address of the site.",
         s: [["url", "https://intranet-c0mpany.com", "c0mpany"], ["alert", "One character changed: the attack went through"]]},
        {w: "Test", k: "a", m: "🤔", t: "A small challenge before the password", x: "Before showing the password, the manager asks for a small gesture, inspired by CAPTCHAs.",
         s: [["bar", "Password manager"], ["cap", "Before the password is shown:"], ["slider", "Place the slider on 7", 7, "Challenge passed: the password is shown"], ["url", "https://intranet-company.com"]]},
        {w: "Test", k: "a", t: "We tested it with 24 people", x: "Two equal groups: a standard manager, or the one with friction. Ten emails, three of them attacks, then a questionnaire.",
         s: [["stat", [["24", "participants"], ["10", "emails"], ["3", "attacks"]]], ["cap", "Attacks spotted: no significant difference between the groups."]]},
        {w: "Results", k: "a", m: "💡", t: "What we measured", x: "The friction did not improve attack detection, but it changed how the password manager was perceived.",
         s: [["stat", [["89", "SUS · standard"], ["78", "SUS · friction"]]], ["cap", "The standard group found it more efficient, the other more novel and more visually appealing."]]}
      ]
    }
  }
};
