/* All the projects of the portfolio, in one place. The list page, the project page and the guided tour read this.
   Each project is written twice: the fields at the top are in English, and the `fr` block holds the French version
   (title, description, and when needed info and buttons: the labels of the buttons in the same order).
   To add a project: add an object here (id, title, description, images, tags, date, and optionally website, figma,
   audio, buttons, info, inthesameprojectas, fr). A "page" makes the card open a hand-written case study instead of
   the generic project page.
   In a description: <b>…</b> for a label, <br> for a line break, two <br> for a new paragraph, <ul><li> for a list. */
window.PROJECTS = [
    {
        "id": 39,
        "title": "The online inventory of an antique watch collection",
        "description": "A private, easy-to-use web application to manage the collection of Bruno Pesenti, a watchmaker in Geneva. I designed and built it. <br><br> <b>The problem</b><br>Bruno managed his inventory in a Google Sheet. It stayed a plain list: slow to search, awkward to sort, and with no overview of the collection. He has no computer, only a phone, so the information was hard to see, and for someone who isn't very comfortable with computers it was hard to use. <br><br> <b>The solution</b><br>A secure online application that only he can access. He can: <ul><li>Easily find his products with search and filters.</li><li>Sort his collection however he likes.</li><li>See his pieces with larger images.</li><li>Look at statistics about his inventory.</li><li>Ask AI for help (Claude Haiku 5.5): add a photo of a product to check whether he already owns a similar one, or simply describe what he is looking for.</li></ul> <b>Good to know</b><br>The interface is in French.",
        "images": [
            "assets/img/inventaire-collection.webp",
            "assets/img/inventaire-ia.webp"
        ],
        "tags": ["UX", "UI", "Coding"],
        "date": "2026-10-16",
        "inthesameprojectas": [8, 9, 10],
        "fr": {
            "title": "L'inventaire en ligne d'une collection d'horlogerie ancienne",
            "description": "Une application web privée, simple à utiliser, pour gérer la collection de Bruno Pesenti, horloger à Genève. Je l'ai conçue et développée. <br><br> <b>Le problème</b><br>Bruno gérait son inventaire dans un Google Sheet. Ça restait une simple liste : recherche lente, tri compliqué, aucune vue d'ensemble de la collection. Il n'a pas d'ordinateur, seulement un téléphone : les informations y étaient difficiles à voir, et pour quelqu'un qui n'est pas très à l'aise avec l'informatique, il était difficile à utiliser. <br><br> <b>La solution</b><br>Une application en ligne sécurisée, dont lui seul a l'accès. Il peut : <ul><li>Retrouver facilement ses produits grâce à la recherche et aux filtres.</li><li>Trier sa collection comme il le souhaite.</li><li>Voir ses pièces avec de plus grandes images.</li><li>Consulter des statistiques sur son inventaire.</li><li>Demander de l'aide à l'IA (Claude Haiku 5.5) : ajouter la photo d'un produit pour vérifier s'il en possède déjà un similaire, ou simplement décrire ce qu'il cherche.</li></ul> <b>À savoir</b><br>L'interface est en français."
        }
    },
    {
        "id": 38,
        "title": "Pinday: the study app that organises itself",
        "description": "Pinday brings a student's schedule, notes, slides and revision together in one place. I designed and built it from A to Z. <br><br> <b>The problem</b><br>When I was a student, I noticed that many students struggled to find a note-taking system that helped them stay organised, especially for taking notes on slides. It needed to be something didactic and interactive. <br><br> <b>The solution</b><ul><li><b>Automatic organisation:</b> a course folder and a course file are created on their own, with nothing to do.</li><li><b>Notes on slides:</b> you can draw on and annotate the slides, and write your notes next to them.</li><li><b>Two ways to write:</b> in markdown for those who prefer it, or with a simpler editor. Notes link to each other, like in Obsidian.</li><li><b>Collaboration:</b> several students can edit the same notes live.</li><li><b>Revision with AI (optional mode):</b> summaries, flashcards and quizzes for each course, with spaced repetition. In revision mode, the AI creates a revision plan and puts it straight into the student's schedule.</li></ul> <b>Your data stays yours</b><br>Everything is saved in each student's own Google Drive. The app is installable and available in French and English.",
        "images": [
            "assets/img/pinday-hero.webp",
            "assets/img/pinday-notes.webp",
            "assets/img/pinday-revision.webp",
            "assets/img/pinday-phones.webp"
        ],
        "website": "https://pinday.ch",
        "accent": "#E8461F",
        "tags": ["UX", "UI", "Coding", "AI"],
        "date": "2026-10-01",
        "fr": {
            "title": "Pinday : l'application d'étude qui s'organise toute seule",
            "description": "Pinday réunit l'emploi du temps, les notes, les diapositives et les révisions d'un étudiant au même endroit. Je l'ai conçue et développée de A à Z. <br><br> <b>Le problème</b><br>Quand j'étais étudiante, j'ai remarqué que beaucoup d'étudiants avaient du mal à trouver un système de prise de notes qui les aide à rester organisés, surtout pour prendre des notes sur les slides. Il fallait quelque chose de didactique et d'interactif. <br><br> <b>La solution</b><ul><li><b>Une organisation automatique :</b> un dossier et un fichier de cours sont créés tout seuls, sans rien avoir à faire.</li><li><b>Des notes sur les slides :</b> on peut dessiner et annoter les diapositives, et écrire ses notes à côté.</li><li><b>Deux façons d'écrire :</b> en markdown pour ceux qui préfèrent, ou avec un éditeur plus simple. Les notes sont liées entre elles, comme dans Obsidian.</li><li><b>La collaboration :</b> plusieurs étudiants peuvent modifier les mêmes notes en direct.</li><li><b>Les révisions avec l'IA (mode optionnel) :</b> résumés, cartes de révision et quiz pour chaque cours, avec répétition espacée. En mode révision, l'IA crée un plan de révision et l'intègre directement dans l'emploi du temps de l'étudiant.</li></ul> <b>Vos données restent chez vous</b><br>Tout est enregistré dans le Google Drive de chaque étudiant. L'application est installable et disponible en français et en anglais."
        }
    },
    {
        "id": 1,
        "title": "Vaud Sentiers: app design",
        "description": "A web app for discovering the canton of Vaud by following itineraries, designed for tourists and residents alike. <br><br> <b>My role</b><br>I was in charge of the user experience (UX) and the interface (UI). <br><br> <b>What users wanted</b><br>I started with a quantitative survey. The results brought out four key features: <ul><li>Search for paths and places on a map, or with a search bar and filters.</li><li>Start navigation straight from the app.</li><li>Share places and itineraries.</li><li>Rate and comment on paths and itineraries.</li></ul> <b>From idea to interface</b><ol><li>Low-fidelity prototypes, tested and then improved thanks to the feedback.</li><li>High-fidelity prototypes, with colours and a graphic identity, relying on Google's design system to keep the interface consistent.</li></ol> I chose cheerful colours, and each search criterion has its own, to guide users at a glance.",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_vaudsentier.png",
            "https://elodiepe.github.io/portfolio-images/project_vaudsentier_1.png"
        ],
        "audio": "https://elodiepe.github.io/portfolio-images/vaudsentier_audio.wav",
        "figma": "https://www.figma.com/design/Qfw43lvTlTthQ4UovmHn8v/RELLL---UI-UX?node-id=1564-17321&t=ejy0KVKyTaDJufvN-1",
        "tags": ["ux", "ui"],
        "info": "Background image of the first image by Ldgfr Photos (Adobe Stock)",
        "date": "2024-06-11",
        "inthesameprojectas": [2],
        "fr": {
            "title": "Vaud Sentiers : conception de l'application",
            "description": "Une application web pour découvrir le canton de Vaud en suivant des itinéraires, pensée aussi bien pour les touristes que pour les habitants. <br><br> <b>Mon rôle</b><br>J'étais en charge de l'expérience utilisateur (UX) et de l'interface (UI). <br><br> <b>Ce que les utilisateurs voulaient</b><br>J'ai commencé par une enquête quantitative. Les résultats m'ont permis de dégager quatre fonctionnalités clés : <ul><li>Chercher des chemins et des lieux sur une carte, ou avec une barre de recherche et des filtres.</li><li>Lancer la navigation directement depuis l'application.</li><li>Partager des lieux et des itinéraires.</li><li>Noter et commenter les chemins et les itinéraires.</li></ul> <b>De l'idée à l'interface</b><ol><li>Des prototypes basse fidélité, testés puis améliorés grâce aux retours.</li><li>Des prototypes haute fidélité, avec des couleurs et une identité graphique, en m'appuyant sur le système de design de Google pour garder une interface cohérente.</li></ol> J'ai choisi des couleurs joyeuses, et chaque critère de recherche a la sienne, pour guider les utilisateurs d'un coup d'œil.",
            "info": "Image de fond de la première image : Ldgfr Photos (Adobe Stock)"
        }
    },
    {
        "id": 2,
        "title": "Vaud Sentiers: visual identity",
        "description": "The logo, the graphic charter and the editorial line of the Vaud Sentiers app. I was responsible for them from A to Z. <br><br> <b>The logo</b><br>It brings together the silhouette of the canton of Vaud and the name of the app. The name is a play on words: it sounds almost like “vos sentiers” (your paths) in French, while reminding that the app is centred on the canton. <br><br> <b>The colours</b><ul><li>The green and white of the cantonal flag are built into the silhouette.</li><li>Green is the main colour, because it evokes nature and discovery.</li><li>The supporting colours come from the same range, so the whole stays harmonious.</li></ul>",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_vaudsentier-logo-1.png",
            "https://elodiepe.github.io/portfolio-images/project_vaudsentier-logo-2.png",
            "https://elodiepe.github.io/portfolio-images/project_vaudsentier-logo-3.png"
        ],
        "tags": ["branding"],
        "figma": "https://www.figma.com/proto/Qfw43lvTlTthQ4UovmHn8v/RELLL---UI-UX?page-id=221%3A6800&node-id=911-11226&p=f&viewport=648%2C639%2C0.22&t=KukiUh71ptefVvu1-1&scaling=min-zoom&content-scaling=fixed",
        "date": "2024-06-11",
        "inthesameprojectas": [1],
        "fr": {
            "title": "Vaud Sentiers : identité visuelle",
            "description": "Le logo, la charte graphique et la ligne éditoriale de l'application Vaud Sentiers. J'en étais responsable de A à Z. <br><br> <b>Le logo</b><br>Il réunit la silhouette du canton de Vaud et le nom de l'application. Le nom est un jeu de mots : il se prononce presque comme « vos sentiers », tout en rappelant que l'application est centrée sur le canton. <br><br> <b>Les couleurs</b><ul><li>Le vert et le blanc du drapeau cantonal sont intégrés dans la silhouette.</li><li>Le vert est la couleur principale, parce qu'il évoque la nature et la découverte.</li><li>Les couleurs secondaires viennent de la même gamme, pour que l'ensemble reste harmonieux.</li></ul>"
        }
    },
    {
        "id": 4,
        "title": "WildClash: a card game",
        "description": "A card game to give children a taste for unusual animals, and to enjoy time together as a family. <br><br> <b>The idea</b><br>How do you nurture a child's love of animals? Children are often fascinated by unusual animals, and they learn better and faster when they have fun. So, with my team of four, we imagined a card game that brings together animals from around the world, with key information about each one. <br><br> <b>What I did</b><ul><li>Worked on the information architecture of the cards: it is essential for an audience of children, and it was the heart of our work.</li><li>Created the prototype of an online wiki, to help players understand the game and learn more about the animals.</li></ul>",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_card.png",
            "https://elodiepe.github.io/portfolio-images/project_card_1.png",
            "https://elodiepe.github.io/portfolio-images/project_card_3.png"
        ],
        "tags": ["ux", "ui", "graphism"],
        "date": "2025-03-10",
        "info": "Background image by Jacob Lund (Adobe Stock)",
        "buttons": [
            {"label": "View the game rules", "url": "https://elodiepe.github.io/portfolio-images/wildclash-rules.pdf", "color": "peach"}
        ],
        "fr": {
            "title": "WildClash : un jeu de cartes",
            "description": "Un jeu de cartes pour donner aux enfants le goût des animaux insolites, et passer un bon moment en famille. <br><br> <b>L'idée</b><br>Comment nourrir l'amour des animaux chez un enfant ? Les enfants sont souvent fascinés par les animaux insolites, et ils apprennent mieux et plus vite quand ils s'amusent. Avec mon équipe de quatre, nous avons donc imaginé un jeu de cartes qui réunit des animaux du monde entier, avec des informations importantes sur chacun. <br><br> <b>Ce que j'ai fait</b><ul><li>Travailler l'architecture de l'information des cartes : c'est essentiel pour un public d'enfants, et ce fut le cœur de notre travail.</li><li>Créer le prototype d'un wiki en ligne, pour aider les joueurs à comprendre le jeu et à en savoir plus sur les animaux.</li></ul>",
            "info": "Image de fond : Jacob Lund (Adobe Stock)",
            "buttons": ["Voir les règles du jeu"]
        }
    },
    {
        "id": 5,
        "title": "Unmatched",
        "description": "My own brand of flock-printed clothing, with designs I draw and that look like me. <br><br> <b>Where it started</b><br>Over the last few years, I learned flock printing on clothing, and it fascinated me right away. Unmatched was born from that. <br><br> <b>The visual identity</b><br>I wanted a fine and colourful identity about individuality and self-expression. The logo is a chameleon, but not a hidden one: it comes to the surface, to say that you can stand out and be yourself without apology. Its vivid colours reflect the energy of the brand and the variety of the designs in the collection. <br><br> <b>The message</b><br>Rather than blending in, Unmatched encourages authenticity and self-confidence, with colourful and distinctive fashion.",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_unmatched-logo.png",
            "https://elodiepe.github.io/portfolio-images/project_mockup.png",
            "https://elodiepe.github.io/portfolio-images/project_mockup_1.png"
        ],
        "tags": ["graphism", "Branding"],
        "website": "https://www.unmatched.ch",
        "audio": "https://elodiepe.github.io/portfolio-images/unmatched_audio.wav",
        "date": "2024-01-15",
        "info": "Mockup is made by Mr.Mockup",
        "fr": {
            "description": "Ma propre marque de vêtements floqués, avec des designs que je dessine et qui me ressemblent. <br><br> <b>L'origine</b><br>Ces dernières années, j'ai appris la technique du flocage sur vêtements, et elle m'a tout de suite fascinée. Unmatched est née de là. <br><br> <b>L'identité visuelle</b><br>J'ai voulu une identité fine et colorée, qui parle d'individualité et d'affirmation de soi. Le logo est un caméléon, mais pas un caméléon caché : il remonte à la surface, pour dire qu'on peut se démarquer et être soi-même sans complexe. Ses couleurs vives reflètent le dynamisme de la marque et la variété des motifs de la collection. <br><br> <b>Le message</b><br>Plutôt que de se fondre dans la masse, Unmatched encourage l'authenticité et la confiance en soi, avec une mode colorée et distinctive.",
            "info": "Maquette réalisée par Mr.Mockup"
        }
    },
    {
        "id": 6,
        "title": "Adopt your pet",
        "description": "A “Tinder for pets”: animal shelters list the animals available for adoption, and users swipe through the profiles to find theirs. <br><br> <b>My role</b><br>I developed the REST API and the interface in Vue.js. <br><br> <b>The features</b><ul><li>Communication between shelters and users.</li><li>Liking and disliking animals by swiping.</li><li>Filters.</li><li>For shelters: create, edit and delete animals.</li></ul> <b>What's next</b><br>The project is finished, but a few improvements remain: simplify user access and optimise the loading of images.",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_adoptyourpet.png",
            "https://elodiepe.github.io/portfolio-images/project_adoptyourpet_1.png",
            "https://youtu.be/Mkt4ksmEyAg"
        ],
        "tags": ["ui", "coding"],
        "date": "2024-12-05",
        "info": "Background image by myself.",
        "fr": {
            "description": "Un « Tinder pour animaux » : les SPA publient les animaux à adopter, et les utilisateurs font défiler les profils pour trouver le leur. <br><br> <b>Mon rôle</b><br>J'ai développé l'API REST et l'interface en Vue.js. <br><br> <b>Les fonctionnalités</b><ul><li>Communication entre les SPA et les utilisateurs.</li><li>Like et dislike des animaux en les faisant glisser.</li><li>Filtres.</li><li>Pour les SPA : créer, modifier et supprimer des animaux.</li></ul> <b>Pour la suite</b><br>Le projet est terminé, mais il reste des améliorations à faire : simplifier l'accès des utilisateurs et optimiser le chargement des images.",
            "info": "Image de fond : réalisée par moi."
        }
    },
    {
        "id": 7,
        "title": "AI video: an advert",
        "description": "An advert for a pizzeria in Florence, made entirely with AI, in a team of three, as part of a course on artificial intelligence. <br><br> <b>The idea</b><br>The pizzas smell so good that they bring statues back to life. <br><br> <b>The steps</b><ol><li><b>The script:</b> written with ChatGPT, refining the prompts until every part of the story worked for us.</li><li><b>The storyboard:</b> the images were created with MidJourney. The hardest part was keeping a consistent graphic mood. Our trick: use exactly the same sentence in every prompt.</li><li><b>The animation:</b> the images were animated with Runway.</li><li><b>Editing and sound:</b> edited in Adobe Premiere Pro, with a sound atmosphere and an Italian voice for the slogan created with ElevenLabs.</li></ol>",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_videoAI.png",
            "https://youtu.be/gscp1yHJeHY"
        ],
        "tags": ["video"],
        "date": "2025-01-21",
        "fr": {
            "title": "Vidéo par IA : une publicité",
            "description": "Une publicité pour une pizzeria de Florence, réalisée entièrement avec de l'IA, en équipe de trois, dans le cadre d'un cours sur l'intelligence artificielle. <br><br> <b>L'idée</b><br>Les pizzas sentent si bon qu'elles redonnent vie aux statues. <br><br> <b>Les étapes</b><ol><li><b>Le scénario :</b> écrit avec ChatGPT, en affinant les prompts jusqu'à ce que chaque partie de l'histoire nous convienne.</li><li><b>Le storyboard :</b> les images ont été créées avec MidJourney. Le plus difficile était de garder une ambiance graphique cohérente. Notre astuce : utiliser exactement la même phrase dans chaque prompt.</li><li><b>L'animation :</b> les images ont été animées avec Runway.</li><li><b>Le montage et le son :</b> montage sur Adobe Premiere Pro, ambiance sonore, et voix italienne du slogan créée avec ElevenLabs.</li></ol>"
        }
    },
    {
        "id": 8,
        "title": "Bruno Pesenti's website",
        "audio": "https://elodiepe.github.io/portfolio-images/brunopesenti_audio.wav",
        "description": "The website of Bruno Pesenti, an independent watchmaker in Geneva: a showcase for his collection and his craft, with a booking service built in. <br><br> <b>The context</b><br>I have been working with Bruno for several years to document and promote his work: a printed catalogue, a visual identity, a logo, and this website. <br><br> <b>What I did</b><ul><li>Designed and hand-coded the site (HTML, CSS, JavaScript with Vue.js), with an immersive interface that is easy to use.</li><li>Made it responsive on every screen, computer and mobile.</li><li>Built in a booking service: customers reserve pieces and pay for products as well as deliveries.</li><li>Offered the site in French, English and Italian, for his international clientele.</li><li>Created an administration interface, so Bruno can add, edit or delete pieces and manage his bookings on his own.</li></ul> <b>Today</b><br>I keep maintaining and updating the site.",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-website-1.png",
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-website-2.png",
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-website-3.png"
        ],
        "website": "https://www.brunopesenti.ch",
        "tags": ["UX", "UI", "Coding"],
        "date": "2026-01-15",
        "inthesameprojectas": [9, 10, 39],
        "fr": {
            "title": "Site web de Bruno Pesenti",
            "description": "Le site de Bruno Pesenti, horloger indépendant à Genève : une vitrine pour sa collection et son savoir-faire, avec un service de réservation intégré. <br><br> <b>Le contexte</b><br>Je collabore avec Bruno depuis plusieurs années pour documenter et promouvoir son travail : catalogue imprimé, identité visuelle, logo, et ce site. <br><br> <b>Ce que j'ai fait</b><ul><li>Conçu et codé le site à la main (HTML, CSS, JavaScript avec Vue.js), avec une interface immersive et facile à utiliser.</li><li>Adapté le site à tous les écrans, ordinateur comme mobile.</li><li>Intégré un service de réservation : les clients réservent des pièces et règlent les produits comme les livraisons.</li><li>Proposé le site en français, en anglais et en italien, pour sa clientèle internationale.</li><li>Créé une interface d'administration, pour que Bruno ajoute, modifie ou supprime des pièces et gère ses réservations en toute autonomie.</li></ul> <b>Aujourd'hui</b><br>Je continue d'assurer la maintenance et les mises à jour du site."
        }
    },
    {
        "id": 9,
        "title": "Le Cabinotier's catalogue",
        "description": "The printed catalogue of the collection of Bruno Pesenti, a watchmaker in Geneva. I wanted it to look like him in every detail. <br><br> <b>The content</b><br>I wrote clear and detailed product descriptions, took the photographs and designed the layout. <br><br> <b>The colours</b><br>Colour acts on emotions, so the palette was central. I chose sober, dark tones, deep blacks and rich browns, which evoke the luxury and sophistication of watchmaking. <br><br> <b>The typography</b><br>I chose “Minion Variable Concept”, a serif typeface that improves legibility: it creates an invisible horizontal line that guides the eye through the technical descriptions. <br><br> <b>The paper</b><ul><li>Cover: 200 g/m² paper with a “Soft Touch” matte lamination, pleasant to the touch.</li><li>Inside pages: 115 g/m² semi-matte coated paper, for a beautiful reproduction of the photographs.</li></ul> <b>The result</b><br>More than a catalogue, a testimony to Geneva's watchmaking heritage, carried by a rigorous layout, beautiful images and refined materials. I keep working with Bruno, notably on the updates of his website.",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-catalogue-1.png",
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-catalogue-2.png",
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-catalogue-3.png"
        ],
        "tags": ["Branding", "graphism"],
        "inthesameprojectas": [10, 8],
        "website": "https://www.brunopesenti.ch/catalogue",
        "date": "2022-06-15",
        "fr": {
            "title": "Le catalogue du Cabinotier",
            "description": "Le catalogue imprimé de la collection de Bruno Pesenti, horloger à Genève. J'ai voulu qu'il lui ressemble dans chaque détail. <br><br> <b>Le contenu</b><br>J'ai rédigé des descriptions de produits claires et détaillées, pris les photographies et conçu la mise en page. <br><br> <b>Les couleurs</b><br>La couleur agit sur les émotions, donc la palette était centrale. J'ai choisi des tons sobres et sombres, des noirs profonds et des bruns riches, qui évoquent le luxe et la sophistication de l'horlogerie. <br><br> <b>La typographie</b><br>J'ai choisi « Minion Variable Concept », une police à empattements qui améliore la lisibilité : elle crée un fil horizontal invisible qui guide l'œil à travers les descriptions techniques. <br><br> <b>Le papier</b><ul><li>Couverture : papier de 200 g/m² avec un pelliculage mat « Soft Touch », agréable au toucher.</li><li>Pages intérieures : papier couché demi-mat de 115 g/m², pour une belle reproduction des photographies.</li></ul> <b>Le résultat</b><br>Plus qu'un catalogue, un témoignage du patrimoine horloger genevois, porté par une mise en page rigoureuse, de belles images et des matériaux raffinés. Je continue de collaborer avec Bruno, notamment pour la mise à jour de son site."
        }
    },
    {
        "id": 10,
        "title": "Business card and logo for Bruno Pesenti",
        "description": "The logo and the business card of Bruno Pesenti, a watchmaker in Geneva, created as part of our collaboration (catalogue, website, visual identity). <br><br> <b>The logo</b><br>I wanted a simple logo that you understand at first glance. It shows the hands of a watch set to 10:10. Why 10:10? It is the standard in the trade: in the vast majority of watch photographs, the watches show this time for aesthetic balance. <br><br> <b>The colours</b><br>Sober tones that work as well on a dark background as on a light one. They reflect the luxury of watchmaking while staying true to its antique heritage. <br><br> <b>The result</b><br>A logo that represents Bruno's brand well. I keep working with him, notably on the updates of his website.",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-carteVisite-1.png",
            "https://elodiepe.github.io/portfolio-images/project_brunopesenti-carteVisite-2.png"
        ],
        "tags": ["Branding", "graphism"],
        "inthesameprojectas": [9, 8],
        "website": "https://www.brunopesenti.ch",
        "date": "2022-06-15",
        "fr": {
            "title": "Carte de visite et logo pour Bruno Pesenti",
            "description": "Le logo et la carte de visite de Bruno Pesenti, horloger à Genève, créés dans le cadre de notre collaboration (catalogue, site web, identité visuelle). <br><br> <b>Le logo</b><br>Je voulais un logo simple, que l'on comprend au premier regard. Il représente les aiguilles d'une montre réglées sur 10h10. Pourquoi 10h10 ? C'est la norme dans le métier : dans la grande majorité des photos horlogères, les montres affichent cette heure pour l'équilibre esthétique. <br><br> <b>Les couleurs</b><br>Des tons sobres, qui fonctionnent aussi bien sur fond sombre que sur fond clair. Ils reflètent le luxe de l'horlogerie tout en restant fidèles à son héritage ancien. <br><br> <b>Le résultat</b><br>Un logo qui représente bien l'identité de la marque de Bruno. Je continue de collaborer avec lui, notamment pour la mise à jour de son site."
        }
    },
    {
        "id": 11,
        "title": "UEFA x Amazon",
        "description": "A campaign to encourage young women to become football coaches, as part of a school project run with UEFA and Amazon. <br><br> <b>The project</b><br>In a team of eight, we created the campaign Tomorrow's Football. It includes: <ul><li>a website;</li><li>a social media campaign;</li><li>an interactive animated series.</li></ul> <b>My part: the series</b><br>I was in charge of creating the series “Coach like a woman”. It follows a young woman who becomes the coach of her sister's football team. <ul><li><b>Interactive:</b> each episode is partly created by the audience. We interviewed a real person, who explains what they want to see in the episode.</li><li><b>Drawn:</b> the series is entirely hand-drawn. The beginning of the first episode has been made.</li></ul>",
        "audio": "https://elodiepe.github.io/portfolio-images/uefaamazon_audio.wav",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_uefa_amazon.png",
            "https://elodiepe.github.io/portfolio-images/project_tomorrowsfootball-website.png",
            "https://youtu.be/-g_J-_V3QI8"
        ],
        "tags": ["drawing", "ux", "video"],
        "buttons": [
            {"label": "View the website", "url": "https://tomorrowsfootball.ch/", "color": "mint"},
            {"label": "View the series' concept", "url": "https://elodiepe.github.io/portfolio-images/tomorrowsfootball-serie-concept.pdf", "color": "peach"},
            {"label": "View the series' storyboard", "url": "https://elodiepe.github.io/portfolio-images/tomorrowsfootball-storyboard-episode-1.pdf", "color": "peach"}
        ],
        "website": "https://tomorrowsfootball.ch/",
        "date": "2025-04-01",
        "fr": {
            "description": "Une campagne pour encourager les jeunes femmes à devenir entraîneuses de football, dans le cadre d'un projet scolaire mené avec l'UEFA et Amazon. <br><br> <b>Le projet</b><br>En équipe de huit, nous avons créé la campagne Tomorrow's Football. Elle comprend : <ul><li>un site web ;</li><li>une campagne sur les réseaux sociaux ;</li><li>une série animée interactive.</li></ul> <b>Ma part : la série</b><br>J'étais en charge de la création de la série « Coach like a woman ». Elle suit une jeune femme qui devient entraîneuse de l'équipe de football de sa sœur. <ul><li><b>Interactive :</b> chaque épisode est créé en partie par le public. Nous avons interviewé une vraie personne, qui explique ce qu'elle souhaite voir dans l'épisode.</li><li><b>Dessinée :</b> la série est entièrement dessinée. Le début du premier épisode a été réalisé.</li></ul>",
            "buttons": ["Voir le site", "Voir le concept de la série", "Voir le storyboard de la série"]
        }
    },
    {
        "id": 12,
        "title": "SwissQuote",
        "description": "Usability tests on the app under development of Swissquote, a Swiss banking group (trading, investment, banking services). <br><br> <b>My approach</b><ul><li>I set up hypotheses.</li><li>I prepared questions and tasks for two users with different profiles.</li><li>During the interviews, I was the moderator, then the observer.</li></ul> <b>The result</b><br>The tests brought out problems to solve, and we proposed solutions. I can't share the results, but this experience let me put into practice what I had learned in class and understand concretely how to run a usability test.",
        "images": ["https://elodiepe.github.io/portfolio-images/project_swissquote.png"],
        "tags": ["ux"],
        "date": "2024-11-30",
        "fr": {
            "description": "Des tests d'utilisabilité sur l'application en cours de développement de Swissquote, groupe bancaire suisse (trading, investissement, services bancaires). <br><br> <b>Ma démarche</b><ul><li>J'ai établi des hypothèses.</li><li>J'ai préparé des questions et des tâches pour deux utilisateurs de profils différents.</li><li>Pendant les entretiens, j'ai été modératrice, puis observatrice.</li></ul> <b>Le résultat</b><br>Les tests ont fait ressortir des problèmes à résoudre, et nous avons proposé des solutions. Je ne peux pas partager les résultats, mais cette expérience m'a permis de mettre en pratique ce que j'avais appris en cours et de comprendre concrètement comment conduire un test d'utilisabilité."
        }
    },
    {
        "id": 32,
        "title": "Ateliers Colibri",
        "description": "A logo for Mélanie's workshops, where she helps everyone create natural homemade products, through her workshops and her blog. <br><br> <b>The inspiration</b><br>The Native American legend of the hummingbird: faced with a terrible forest fire, a small hummingbird tirelessly carries drops of water to put it out, despite the mockery of the others. When asked why, it answers that it is doing its part. <br><br> <b>The logo</b><br>A stylised hummingbird in warm, golden tones that evoke the legendary and natural side of the story. These colours carry warmth, hope and resilience, and make the logo easy to recognise and remember. <br><br> <b>The message</b><br>Inspire everyone to join Mélanie's mission. Like the hummingbird, Ateliers Colibri lets each person do their part, to form an ocean together out of individual streams.",
        "images": ["https://elodiepe.github.io/portfolio-images/project_colibri-logo.png"],
        "tags": ["Branding"],
        "date": "2022-12-10",
        "fr": {
            "title": "Ateliers Colibri",
            "description": "Un logo pour les ateliers de Mélanie, qui accompagne chacun dans la création de produits maison naturels, à travers ses ateliers et son blog. <br><br> <b>L'inspiration</b><br>La légende amérindienne du colibri : face à un terrible incendie de forêt, un petit colibri transporte inlassablement des gouttes d'eau pour l'éteindre, malgré les moqueries des autres. Quand on lui demande pourquoi, il répond qu'il fait sa part. <br><br> <b>Le logo</b><br>Un colibri stylisé, dans des tons chauds et dorés qui évoquent la dimension légendaire et naturelle du récit. Ces couleurs portent la chaleur, l'espoir et la résilience, et rendent le logo facile à reconnaître et à retenir. <br><br> <b>Le message</b><br>Inspirer chacun à rejoindre la mission de Mélanie. Comme le colibri, Ateliers Colibri permet à chacun de faire sa part, pour former ensemble un océan à partir de ruisseaux individuels."
        }
    },
    {
        "id": 33,
        "title": "Mythologia shop",
        "description": "The logo of an online website about Greek mythology, which also had to evoke the commercial side of the project. <br><br> <b>The logo</b><br>A silhouette of ancient Greece, with graphic elements that evoke the gods and heroes. <br><br> <b>The colours</b><br>Warm, golden tones, to reinforce the mythological side and give an impression of wealth and mystery. <br><br> <b>The result</b><br>A logo that reflects the identity of the project and is easy to recognise.",
        "images": ["https://elodiepe.github.io/portfolio-images/project_mythologia-logo.png"],
        "tags": ["Branding"],
        "date": "2023-09-15",
        "fr": {
            "description": "Le logo d'un site en ligne consacré à la mythologie grecque, qui devait aussi évoquer l'aspect commercial du projet. <br><br> <b>Le logo</b><br>Une silhouette de la Grèce antique, accompagnée d'éléments graphiques qui évoquent les dieux et les héros. <br><br> <b>Les couleurs</b><br>Des tons chauds et dorés, pour renforcer l'aspect mythologique et donner une impression de richesse et de mystère. <br><br> <b>Le résultat</b><br>Un logo qui reflète l'identité du projet et qui se reconnaît facilement."
        }
    },
    {
        "id": 34,
        "title": "The screen time app",
        "description": "An Android application, created with Flutter, to keep track of your screen time with the help of a lion. <br><br> <b>How it works</b><br>The user chooses the apps to follow, then sees the total time spent on their phone every day. <br><br> <b>The lion</b><br>The symbol of the app is a lion whose health and happiness depend on screen time: too long, and it becomes sad and sick; reasonable, and it is happy and in great shape. The colours of the app also change with the screen time. <br><br> <b>Day to day</b><ul><li>A widget to follow the lion's progress from the home screen.</li><li>A notification every fifteen minutes spent on the phone.</li></ul>",
        "images": [
            "https://elodiepe.github.io/portfolio-images/project_screenTimer_1.png",
            "https://elodiepe.github.io/portfolio-images/project_screenTimer_2.png"
        ],
        "tags": ["coding"],
        "buttons": [
            {"label": "View the application", "url": "https://github.com/elodiePe/screen_time", "color": "mint"}
        ],
        "date": "2026-05-01",
        "fr": {
            "title": "L'application de temps d'écran",
            "description": "Une application Android, créée avec Flutter, pour suivre son temps d'écran avec l'aide d'un lion. <br><br> <b>Comment ça marche</b><br>L'utilisateur choisit les applications à suivre, puis voit chaque jour le temps total passé sur son téléphone. <br><br> <b>Le lion</b><br>Le symbole de l'application est un lion dont la santé et le bonheur dépendent du temps d'écran : trop long, il devient triste et malade ; raisonnable, il est heureux et en pleine forme. Les couleurs de l'application changent aussi selon le temps d'écran. <br><br> <b>Au quotidien</b><ul><li>Un widget pour suivre la progression du lion depuis l'écran d'accueil.</li><li>Une notification toutes les quinze minutes passées sur le téléphone.</li></ul>",
            "buttons": ["Voir l'application"]
        }
    },
    {
        "id": 35,
        "title": "Password managers vs BEC attacks",
        "date": "2026-06-01",
        "images": ["https://elodiepe.github.io/portfolio-images/jonkoping.jpg"],
        "tags": ["Research", "UX"],
        "audio": "https://elodiepe.github.io/portfolio-images/passwordmanager_audio.wav",
        "buttons": [
            {"label": "View the thesis", "url": "https://ju.diva-portal.org/smash/record.jsf?pid=diva2%3A2080216&dswid=-2264", "color": "mint"}
        ],
        "description": "My thesis: can we add a little friction to a password manager to help users spot email attacks, without making it hard to use? <br><br> <b>The context</b><br>People are asked to remember more and more passwords, and password managers have become a reflex. But their smoothness can lower attention: you pay less attention to where you are logging in, which exposes you to social engineering attacks. Among them, business email compromise (BEC): hackers pose as someone higher up in the company. <br><br> <b>The experiment</b><ul><li>24 participants, split into two equal groups.</li><li>Three tools: a password manager, an email inbox and several websites.</li><li>Ten emails, three of which were attacks not to be followed, then a questionnaire.</li><li>Group A: a standard password manager. Group B: a password manager with friction, meaning a small CAPTCHA-style challenge before the password is shown (a multiple choice question, a slider to place on a number, a sentence to copy...).</li></ul> <b>The results</b><ul><li>No significant difference between the groups in the number of attacks spotted. Age, gender, self-reported English level and IT experience did not influence the score.</li><li>Average SUS scores: 89 for group A, 78 for group B.</li><li>According to the UEQ-S, group A found the tool more efficient, and group B more novel and more visually appealing.</li></ul> <b>What we take from it</b><br>The friction used was not enough to increase vigilance against BEC attacks, but it changed how the password manager was perceived. <br><br> <b>Limits and next steps</b><br>The experiment took place in a lab: participants may have behaved differently than in real life. A possible next step: test it in a real work environment and refine the type of friction.",
        "fr": {
            "title": "Gestionnaires de mots de passe contre attaques BEC",
            "description": "Ma thèse : peut-on ajouter un peu de friction à un gestionnaire de mots de passe pour aider les utilisateurs à repérer les attaques par e-mail, sans le rendre difficile à utiliser ? <br><br> <b>Le contexte</b><br>On demande aux gens de retenir de plus en plus de mots de passe, et les gestionnaires sont devenus un réflexe. Mais leur fluidité peut faire baisser l'attention : on prête moins attention à l'endroit où l'on se connecte, ce qui expose aux attaques d'ingénierie sociale. Parmi elles, la compromission de messagerie professionnelle (BEC) : des pirates se font passer pour un supérieur hiérarchique. <br><br> <b>L'expérience</b><ul><li>24 participants, répartis en deux groupes égaux.</li><li>Trois outils : un gestionnaire de mots de passe, une boîte de réception et plusieurs sites web.</li><li>Dix e-mails, dont trois étaient des attaques à ne pas suivre, puis un questionnaire.</li><li>Groupe A : gestionnaire standard. Groupe B : gestionnaire avec de la friction, c'est-à-dire un petit défi inspiré des CAPTCHA avant l'affichage du mot de passe (question à choix multiple, curseur à placer sur un nombre, phrase à recopier...).</li></ul> <b>Les résultats</b><ul><li>Aucune différence significative entre les groupes dans le nombre d'attaques repérées. L'âge, le genre, le niveau d'anglais déclaré et l'expérience en informatique n'ont pas influencé le score.</li><li>Scores SUS moyens : 89 pour le groupe A, 78 pour le groupe B.</li><li>Selon le UEQ-S, le groupe A a jugé l'outil plus efficace, et le groupe B plus original et plus agréable visuellement.</li></ul> <b>Ce qu'on en retient</b><br>La friction utilisée n'a pas suffi à augmenter la vigilance face aux attaques BEC, mais elle a changé la perception du gestionnaire. <br><br> <b>Limites et suite</b><br>L'expérience s'est déroulée en laboratoire : les participants ont pu se comporter autrement qu'en situation réelle. Une suite possible : la tester dans un vrai environnement de travail et affiner le type de friction.",
            "buttons": ["Voir la thèse"]
        }
    },
    {
        "id": 36,
        "title": "MyHouzly: family finance and household app",
        "description": "A multi-platform app that helps parents teach their children financial responsibility, while running the day-to-day of the household. Status: in development, soon on the Play Store. <br><br> <b>The problem</b><br>Today, there is a lot to do and to think about at home. MyHouzly brings together everything a family needs in one place: the children's money, the chores around the house (housework, meals, shopping), and the tasks related to the children. <br><br> <b>For children</b><br>Each child has their own account: <ul><li>automatic weekly pocket money;</li><li>chores paid in real money or in points;</li><li>savings goals with configurable interest;</li><li>for teenagers, a supervised stock portfolio to discover investing.</li></ul> <b>For parents</b><ul><li>Approval of completed chores.</li><li>Fine-grained permissions between co-parents.</li><li>Choice of the household modules to switch on: meal planning, laundry rotation, shared shopping lists.</li></ul> <b>Under the hood</b><br>A monorepo with a TypeScript type layer shared between a React web app and a React Native (Expo) mobile app, both connected to a single Express/Prisma/PostgreSQL API. The app handles subscription billing, push notifications and data processing compliant with GDPR and the Swiss nLPD. The interface adapts to age, so the same app suits a 6-year-old and a 16-year-old. <br><br> <b>Technologies</b><br>TypeScript, React, React Native/Expo, Express, Prisma, PostgreSQL, Tailwind CSS, Stripe, Google Play Billing. Deployed on Railway (API) and Cloudflare Pages (web).",
        "images": [
            "assets/img/myhouzly-hero.webp"
        ],
        "website": "https://www.myhouzly.ch",
        "audio": "https://elodiepe.github.io/portfolio-images/myhouzly_audio.wav",
        "accent": "#0E8A6D",
        "tags": ["AI", "UX", "UI", "Coding"],
        "date": "2026-08-27",
        "fr": {
            "title": "MyHouzly : finances familiales et gestion du foyer",
            "description": "Une application multiplateforme qui aide les parents à apprendre la responsabilité financière à leurs enfants, tout en gérant le quotidien de la maison. Statut : en développement, bientôt sur le Play Store. <br><br> <b>Le problème</b><br>Aujourd'hui, il y a beaucoup à faire et à penser à la maison. MyHouzly réunit au même endroit tout ce dont une famille a besoin : l'argent des enfants, les tâches de la maison (ménage, repas, courses), et les tâches liées aux enfants. <br><br> <b>Pour les enfants</b><br>Chaque enfant a son propre compte : <ul><li>argent de poche hebdomadaire automatique ;</li><li>tâches rémunérées en argent réel ou en points ;</li><li>objectifs d'épargne avec intérêts configurables ;</li><li>pour les ados, un portefeuille d'actions supervisé pour découvrir l'investissement.</li></ul> <b>Pour les parents</b><ul><li>Validation des tâches terminées.</li><li>Gestion fine des permissions entre co-parents.</li><li>Choix des modules du foyer à activer : planification des repas, rotation des lessives, listes de courses partagées.</li></ul> <b>Sous le capot</b><br>Un monorepo avec une couche de types TypeScript partagée entre une application web React et une application mobile React Native (Expo), toutes deux reliées à une seule API Express/Prisma/PostgreSQL. L'application gère la facturation par abonnement, les notifications push et le traitement des données conformément au RGPD et à la nLPD. L'interface s'adapte à l'âge, pour convenir aussi bien à un enfant de 6 ans qu'à un ado de 16 ans. <br><br> <b>Technologies</b><br>TypeScript, React, React Native/Expo, Express, Prisma, PostgreSQL, Tailwind CSS, Stripe, Google Play Billing. Déployée sur Railway (API) et Cloudflare Pages (web)."
        }
    },
    {
        "id": 37,
        "title": "Elodie Perring Art",
        "description": "My own website for my acrylic animal portraits. I designed and coded it entirely myself, from the visual identity to the front-end. <br><br> <b>What you will find</b><ul><li>A gallery of my paintings.</li><li>A bespoke portrait service, to have your own pet painted.</li><li>Gift cards.</li><li>An online shop to buy pieces directly.</li></ul> <b>The design</b><br>It reflects my visual identity: a warm, soft palette, a hand-drawn “EP” monogram, and simple, realistic animal illustrations. The site is available in French and English.",
        "images": ["https://elodiepe.github.io/portfolio-images/project_elodieperringart.png"],
        "website": "https://www.elodieperringart.com",
        "tags": ["UX", "UI", "Coding", "painting", "branding"],
        "date": "2026-09-14",
        "fr": {
            "description": "Mon propre site pour mes portraits d'animaux à l'acrylique. Je l'ai entièrement conçu et codé, de l'identité visuelle au front-end. <br><br> <b>Ce qu'on y trouve</b><ul><li>Une galerie de mes peintures.</li><li>Un service de portrait sur commande, pour faire peindre son propre animal.</li><li>Des cartes cadeaux.</li><li>Une boutique en ligne pour acheter des œuvres directement.</li></ul> <b>Le design</b><br>Il reflète mon identité visuelle : une palette chaude et douce, un monogramme « EP » dessiné à la main, et des illustrations d'animaux simples et réalistes. Le site est disponible en français et en anglais."
        }
    }
];
