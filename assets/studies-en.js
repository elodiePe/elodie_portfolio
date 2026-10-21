/* The English version of studies.js: same ids, same fields. Used when the site is in English. */
window.STUDIES_EN = {
  39: {
    slider: true,
    legendes: ["The collection: search, filters, sorting, and a piece's page with a large image.", "AI search (a description or a photo) and statistics: the 10 most valuable items."],
    role: "Research, design and development",
    duree: "July 2026",
    tools: "Next.js, React, TypeScript, Google Sheets and Drive, Claude Haiku 5.5, Vercel",
    status: "Live, private access",
    resume: {
      probleme: "Bruno has no computer, only a phone: his Google Sheet was hard to read there, and he wasn't comfortable with that tool.",
      reponse: "A private app, designed for the phone, where he finds, sorts and analyses his collection, and where AI helps him spot a similar product.",
      resultat: "A secure online inventory that Bruno has used on his phone for two months."
    },
    pour: "Bruno Pesenti, an independent watchmaker in Geneva, who manages a collection of antique watches. He is not very comfortable with computers and has no computer: he works only on his phone. I have worked with him for several years (website, catalogue, logo).",
    probleme: [
      ["Just a list", "The Google Sheet gives a list: slow search, awkward sorting, no overview of the collection."],
      ["Unreadable on a phone", "Bruno has no computer, only a phone: the information was hard to see easily there."],
      ["Not comfortable with spreadsheets", "The tool isn't obvious for someone who isn't very comfortable with computers."],
      ["Finding a similar piece", "Knowing whether he already owns a similar product means going through everything again."]
    ],
    demarcheIntro: "I started from Bruno and the way he works, not from a trendy tool.",
    demarche: [
      ["Understand", "I have worked with Bruno for years, and I talked with him about how he used his Google Sheet. He wasn't comfortable with the tool and, since he only has a phone, he struggled to see the information easily."],
      ["Define the need", "Find a product quickly, sort as he wishes, see his collection at a glance, and keep everything simple, even without being comfortable with computers."],
      ["Design", "A private app, in French, designed for the phone, whose access is reserved for him alone. On top of search and filters, I added AI: a photo or a description to find a product."],
      ["Test and adjust", "Bruno tested it. He wanted bigger images and to be able to search for a product from an image: I adapted the app accordingly."]
    ],
    reponses: [
      ["I only have a phone", "An app designed for the phone, easy to read on a small screen.", "On the phone"],
      ["I want to see my watches properly", "Bigger images.", "Big images"],
      ["I'm looking for a specific piece", "Search and filters.", "Search"],
      ["I want to sort my own way", "Sorting of the collection, as he needs.", "Sorting"],
      ["I want to see where I stand", "Statistics about the inventory.", "Statistics"],
      ["Do I already have one like this?", "He adds a photo or describes the product, and the AI (Claude Haiku 5.5) looks for a similar one: the image search he asked for.", "Photo search"],
      ["I'm not comfortable with computers", "A simple app, in French.", "Simplicity"],
      ["My collection is private", "Secure access, reserved for him alone.", "Private access"]
    ],
    resultats: "A secure online inventory that replaces the Google Sheet. Bruno has used it for two months, on his phone. {{to complete: what he says about it}}",
    retient: "{{to complete: what you would do differently, what you learned}}"
  },
  38: {
    slider: true,
    legendes: ["Pinday on a computer and on a phone.", "Notes: write straight in the preview, with the slides next to it.", "Revision: summaries, flashcards and quizzes for each course.", "Pinday on a phone: schedule, notes, revision, exams."],
    role: "Product design, design and development",
    duree: "October 2026",
    tools: "JavaScript, Google Drive and Sheets, Cloudflare, Liveblocks, AI",
    status: "Live, in French and English",
    resume: {
      probleme: "As a student, I saw how hard it is to stay organised and to take notes that really help, especially with slides.",
      reponse: "An app where each course organises itself, where you take notes right on the slides, and where you revise interactively.",
      resultat: "A live, installable app where the data stays in each student's own Drive."
    },
    pour: "Pinday is for students and their weekly routine: going to class, following slides, taking notes, then revising before exams. I was one of them, and that is where I started from.",
    probleme: [
      ["Scattered notes", "Notes are in one tool, slides as PDFs elsewhere, the schedule in a calendar: it is up to the student to bring everything together."],
      ["Slides make notes harder", "Taking notes on slides remains difficult with most tools."],
      ["Revising without a method", "You revise “when you have time”, without a plan, although rereading is not enough to remember. It needed to be didactic and interactive."],
      ["Everyone in their corner", "Notes are shared as screenshots, and everyone annotates on their own."]
    ],
    demarcheIntro: "I started from students' routine, not from a list of features.",
    demarche: [
      ["Understand", "I started from what I lived as a student, then from what my classmates ran into every day. The real problem is not a lack of tools: it is staying consistent across the whole semester, without note files scattered everywhere, and being able to take notes on the slides and next to them."],
      ["Define the need", "A tool that takes care of the organisation for the student, and that is didactic and interactive, to help learn and not just archive."],
      ["Design", "I tried to remove all the chores: a course's folder and file are created on their own. While staying a standard note-taking tool, Pinday allows collaboration, PDF export and comments, and everything is saved in each student's own Google Drive. Everyone writes the way they prefer, and notes link to each other."],
      ["Test and adjust", "I tested the app with student friends. They were satisfied, especially with taking notes on slides, on a phone or on a computer, and with the automatic organisation."]
    ],
    reponses: [
      ["I want to get organised without thinking about it", "A course folder and file created automatically.", "Organisation"],
      ["I want to take notes while following the slide", "Draw, annotate and write next to the slides.", "Notes on slides"],
      ["Everyone writes differently", "Markdown for those who prefer it, a simpler editor for the others, and notes linked to each other.", "Free writing"],
      ["I want to work with others", "Several students edit the same notes live.", "Collaboration"],
      ["I really want to remember", "Summaries, flashcards and quizzes with spaced repetition (optional AI mode), and a revision plan slipped into the schedule.", "Revision"],
      ["I stay in control of my data", "Everything is saved in each student's own Google Drive.", "My data"]
    ],
    resultats: "The app is live, installable on phone and computer, and available in French and English. Tested with student friends, it satisfied them, especially for notes on slides (on a phone or a computer) and the automatic organisation."
  },
  36: {
    slider: true,
    role: "Product design, design and development",
    duree: "July to October 2026",
    tools: "TypeScript, React, React Native, Tailwind CSS, PostgreSQL",
    status: "In development, soon on the Play Store",
    resume: {
      probleme: "In a home there is a lot to do and to think about: the children's money, chores, meals, shopping.",
      reponse: "A single app that brings together everything a family needs day to day.",
      resultat: "An installable app, used by my family, that also teaches children to manage their money."
    },
    pour: "For families: parents juggling daily life, and children who learn to manage their pocket money and to take part in running the home. A special interface exists for the youngest.",
    probleme: [
      ["So much to do, so much to think about", "Today, parents have many things on their mind at the same time."],
      ["Everything is scattered", "The children's money, household chores, meals, shopping and child-related tasks each live in their own place."],
      ["The child can't see their money", "They don't know how much they have, nor what they have saved over the months."],
      ["Requests get lost", "Requests for money are made out loud: they get forgotten or argued over."]
    ],
    demarcheIntro: "I started from my own family, from what parents have in mind every day and what children understand about their money.",
    demarche: [
      ["Understand", "Pocket money used to be tracked in an external app, with a history that had to be kept. I wanted a tool of our own, simple enough for a child and reliable enough for a parent. Another problem came up at home: children forget that they have things to do."],
      ["Define the needs", "Two needs: lighten parents' mental load by bringing everything together, and give each child a clear account they understand on their own."],
      ["Design for each person", "For children: simple access (a family code, their first name, then a four-digit code), a big balance, and written requests instead of discussions. One interface per age: the youngest's keeps only the money, the points, the reward and the tasks. For parents: control, and modules to switch on only according to their needs. One rule: an operation is never deleted, it is corrected, so the history stays readable by everyone."],
      ["Test and adjust", "The app is used by my family and is still in development. During testing it became clear that notifications with buttons right inside them would make the app simpler to use: you can answer without opening it. I also added the option of receiving an email every month with how the accounts have evolved."]
    ],
    reponses: [
      ["I don't want to keep everything in my head", "One place for the children's money, chores, meals and shopping.", "All in one place"],
      ["My child wants to understand their money", "An account of their own: balance, history, automatic pocket money and savings goals with interest.", "Child's account"],
      ["Chores should count", "Chores paid in money or points, which the parent approves.", "Chores"],
      ["Every age has its interface", "An interface for the youngest, with only the money, the points, the reward and the tasks, and for teenagers a supervised stock portfolio.", "Every age"],
      ["Every family is different", "Parents choose the household modules (meals, laundry, shopping) and the permissions between co-parents.", "Made to measure"],
      ["Ask without arguing", "The child makes the request in the app, the answer is written and the movement happens automatically.", "Requests"],
      ["I don't want to forget", "A reminder that keeps coming back until the task is ticked off (ADHD mode), and for the youngest, quests of the day.", "Reminders"]
    ],
    resultats: "The app helps families who have a lot to think about: less to keep in mind, fewer arguments. It is installable and keeps the latest balances even without a network."
  },
  1: {
    includes: [2],
    slider: true,
    role: "Experience design (UX) and interface design (UI), visual identity",
    tools: "Figma, Google's design system",
    status: "Web application",
    resume: {
      probleme: "Tourists and residents want to discover places, but they need a simple way to find and follow a route.",
      reponse: "An app to search, follow, share and rate routes.",
      resultat: "A high-fidelity prototype with a colourful identity: one colour per search criterion."
    },
    pour: "Tourists and residents of the canton of Vaud alike, who want to get out, walk and discover places near home or during their visit.",
    probleme: [
      ["Finding", "Spotting the right path or the right place among many options."],
      ["Getting there", "Going from the wish to the walk without switching tools."],
      ["Sharing", "Being able to let others enjoy what you discovered."],
      ["Choosing with confidence", "Knowing what others thought of a path before setting off."]
    ],
    demarcheIntro: "I started from what users wanted to do, and kept their needs as my guide throughout.",
    demarche: [
      ["Understand", "I began with a quantitative survey to find out what users needed."],
      ["Define the needs", "The analysis of the results brought out four key features: search, navigate, share, rate and comment."],
      ["Design", "Low-fidelity prototypes first, to check ideas quickly, then high-fidelity prototypes with colours and a graphic identity, relying on Google's design system to keep the interface consistent."],
      ["Test and adjust", "I tested the low-fidelity prototypes, then improved the design thanks to the feedback."]
    ],
    reponses: [
      ["I'm looking for a path or a place", "A map, or a search bar with filters.", "Search"],
      ["I want to go without leaving the app", "Navigation starts straight from the app.", "Navigate"],
      ["I want to share my favourites", "Sharing of places and itineraries.", "Share"],
      ["I want to choose with confidence", "Rate and comment on paths and itineraries.", "Reviews"],
      ["I want to find my way at a glance", "Cheerful colours, one per search criterion.", "Colours"]
    ],
    resultats: "A complete high-fidelity prototype, with a visual identity of its own (see the related project)."
  },
  35: {
    role: "Research (master's thesis)",
    duree: "November 2025 to July 2026",
    tools: "SUS, UEQ-S",
    status: "Thesis, Jönköping University",
    resume: {
      probleme: "Password managers make signing in so smooth that people pay less attention to where they sign in, which exposes them to email attacks.",
      reponse: "Add a little positive friction: a small challenge before the password is shown, without making the tool a chore.",
      resultat: "No better detection of attacks, but a different perception of the tool, and ideas for what comes next."
    },
    pour: "People who receive work emails every day and use a password manager to go faster.",
    probleme: [
      ["So many passwords", "People are asked to create and remember more and more of them, so the manager has become a reflex."],
      ["Attention drops", "When everything is smooth, you pay less attention to the address of the site you sign in to."],
      ["Emails that play on trust", "In a BEC attack, a hacker poses as someone higher up in the company."]
    ],
    demarcheIntro: "Here, empathy comes through an experiment with real people, to measure the effect of design on their behaviour.",
    demarche: [
      ["Understand", "Start from an everyday behaviour: you sign in within seconds, sometimes without looking at the address."],
      ["Define the question", "Can positive friction be added to a password manager to help spot attacks, while keeping the tool easy to use?"],
      ["Design", "A manager with small CAPTCHA-style challenges before the password is shown: a multiple choice question, a slider to place on a number, a sentence to copy."],
      ["Test", "24 participants, split into two equal groups. One group uses a standard manager, the other the one with friction. Ten emails, three of them attacks not to be followed, then a questionnaire."]
    ],
    reponsesTitle: "What I found",
    reponses: [
      ["Do people spot attacks better?", "No significant difference between the two groups. Age, gender, English level and IT experience did not influence the score.", "Detection"],
      ["Is the tool still pleasant to use?", "Average SUS scores: 89 for the standard manager, 78 for the one with friction.", "Usability (SUS)"],
      ["How is it perceived?", "According to the UEQ-S, the standard group found it more efficient, and the friction group more novel and more visually appealing.", "Perception"]
    ],
    resultats: "The friction used was not enough to increase vigilance against BEC attacks, but it changed how the password manager was perceived."
  },
  2: {
    role: "Visual identity: logo, graphic charter and editorial line",
    status: "Brand identity",
    resume: {
      probleme: "Give an identity to an app centred on the canton of Vaud.",
      reponse: "A logo made of the canton's silhouette and the name, with a play on words on “vos sentiers” (your paths).",
      resultat: "A green palette, consistent with nature and the colours of the cantonal flag."
    },
    decisions: [
      {t: "A name that sounds like “vos sentiers”", choix: "The logo combines the silhouette of the canton of Vaud and the name “Vaud Sentiers”.", pourquoi: "The pun echoes “vos sentiers” while anchoring the app in the canton."},
      {t: "The green and white of the flag", choix: "The green and white of the cantonal flag in the silhouette, green as the main colour.", pourquoi: "Green stands for nature and discovery; the supporting colours come from the same range so they blend."}
    ]
  },
  4: {
    slider: true,
    hideEmpty: true,
    role: "Information architecture and prototype of the online wiki",
    duree: "February 2025",
    tools: "Figma, print",
    status: "Card game",
    resume: {
      probleme: "How to nurture children's love of animals?",
      reponse: "A card game of unusual animals, with key information about each one.",
      resultat: "A game and a prototype of an online wiki that goes with it."
    },
    contexte: "A card game to give children a taste for unusual animals, and to enjoy time together as a family. How do you nurture a child's love of animals? Children are often fascinated by unusual animals, and they learn better and faster when they have fun. So we imagined a card game that brings together animals from around the world, with key information about each one.",
    probleme: [
      ["Interest children", "Children are often fascinated by unusual animals, and they learn better and faster when they have fun."],
      ["Enjoy time as a family", "An interactive and fun way to spend a good time together."]
    ],
    decisions: [
      {t: "A card game", choix: "An interactive and fun way to spend time as a family, with animals from around the world and key information about each one.", pourquoi: "You learn faster when you have fun."},
      {t: "Information architecture first", choix: "I worked on how the information on each card is structured: it was the heart of our work.", pourquoi: "It is essential for an audience of children."},
      {t: "An online wiki", choix: "I created the prototype of an online wiki.", pourquoi: "Help players understand the game and learn more about the animals."}
    ]
  },
  5: {
    slider: true,
    hideEmpty: true,
    role: "Visual identity of my own brand",
    tools: "Flock printing on clothing",
    status: "Online brand",
    resume: {
      probleme: "Give an identity to a flock-printed clothing brand that looks like me.",
      reponse: "A colourful chameleon logo that doesn't hide, but stands out.",
      resultat: "A fine and colourful identity about individuality and self-expression."
    },
    contexte: "My own brand of flock-printed clothing, with designs I draw and that look like me. Over the last few years, I learned flock printing on clothing, and it fascinated me right away. Unmatched was born from that.",
    probleme: [
      ["A brand that looks like me", "Give an identity to flock-printed clothing whose designs I draw myself."],
      ["Standing out rather than blending in", "Encourage authenticity and self-confidence, with colourful and distinctive fashion."]
    ],
    decisions: [
      {t: "A chameleon that comes to the surface", choix: "The logo is a chameleon, but not a hidden one: it comes to the surface.", pourquoi: "To say that you can stand out and be yourself without apology."},
      {t: "A fine and colourful identity", choix: "A fine identity with vivid colours, about individuality and self-expression.", pourquoi: "The vivid colours reflect the energy of the brand and the variety of the designs in the collection."}
    ]
  },
  6: {
    slider: true,
    hideEmpty: true,
    role: "REST API and Vue.js interface development",
    duree: "January to February 2025",
    tools: "Vue.js, REST API",
    status: "Finished project, to improve",
    resume: {
      probleme: "Shelters need to present the animals available for adoption.",
      reponse: "An app where you swipe through animals, like on a dating app.",
      resultat: "A working project, with improvements identified."
    },
    contexte: "A “Tinder for pets”: animal shelters list the animals available for adoption, and users swipe through the profiles to find theirs.",
    probleme: [
      ["Presenting the animals to adopt", "Shelters list the animals available for adoption."],
      ["Finding yours", "Users swipe through the profiles to find the animal that suits them."]
    ],
    decisions: [
      {t: "Let shelters and users communicate", choix: "Direct communication between shelters and users."},
      {t: "Swipe to like or reject", choix: "Liking and disliking animals by swiping."},
      {t: "Filters", choix: "Filters to find the right animal faster."},
      {t: "A space for shelters", choix: "Shelters can create, edit and delete animals."}
    ]
  },
  7: {
    slider: true,
    hideEmpty: true,
    role: "AI video creator",
    duree: "February 2025",
    tools: "ChatGPT, MidJourney, Runway, Adobe Premiere Pro, ElevenLabs",
    status: "Video",
    resume: {
      probleme: "Make an advert for a pizzeria in Florence using only AI.",
      reponse: "One idea: the pizzas smell so good that they bring statues back to life.",
      resultat: "A complete advert, from the script to the Italian voice of the slogan."
    },
    contexte: "An advert for a pizzeria in Florence, made entirely with AI, in a team of three, as part of a course on artificial intelligence. The idea: the pizzas smell so good that they bring statues back to life.",
    probleme: [
      ["An advert made entirely by AI", "From the script to the voice of the slogan, every step had to go through an AI tool."],
      ["Keeping a consistent mood", "The hardest part: keeping the same graphic mood from one image to the next."]
    ],
    decisions: [
      {t: "The script", choix: "Written with ChatGPT, refining the prompts until every part of the story worked for us."},
      {t: "The storyboard", choix: "The images were created with MidJourney.", pourquoi: "Our trick to keep a consistent graphic mood: use exactly the same sentence in every prompt."},
      {t: "The animation", choix: "The images were animated with Runway."},
      {t: "Editing and sound", choix: "Edited in Adobe Premiere Pro, with a sound atmosphere and an Italian voice for the slogan created with ElevenLabs."}
    ]
  },
  8: {
    slider: true,
    hideEmpty: true,
    role: "Design and development",
    duree: "Since 2024, maintenance ongoing",
    tools: "HTML, CSS, JavaScript, Vue.js",
    status: "Live, maintained",
    resume: {
      probleme: "An independent watchmaker in Geneva needs an online presence worthy of his work.",
      reponse: "A custom, immersive website with booking and payment built in.",
      resultat: "A site available in three languages, which the client manages on his own."
    },
    contexte: "The website of Bruno Pesenti, an independent watchmaker in Geneva: a showcase for his collection and his craft, with a booking service built in. I have been working with Bruno for several years to document and promote his work: a printed catalogue, a visual identity, a logo, and this website. Today, I keep maintaining and updating the site.",
    probleme: [
      ["A showcase worthy of his work", "Show his collection and his craft, with an immersive interface that is easy to use."],
      ["Booking and paying online", "Customers must be able to reserve pieces and pay for products as well as deliveries."],
      ["An international clientele", "The site has to speak to customers from several countries."],
      ["Staying independent", "Bruno has to be able to run his stock and his bookings without depending on me."]
    ],
    decisions: [
      {t: "A hand-coded site", choix: "Designed and hand-coded (HTML, CSS, JavaScript with Vue.js), with an immersive interface that is easy to use, responsive on every screen, computer and mobile."},
      {t: "A booking service", choix: "Customers reserve pieces and pay for products as well as deliveries."},
      {t: "Three languages", choix: "The site is offered in French, English and Italian.", pourquoi: "For his international clientele."},
      {t: "An administration interface", choix: "Bruno adds, edits or deletes pieces and manages his bookings on his own."}
    ]
  },
  9: {
    slider: true,
    hideEmpty: true,
    role: "Writing, photography, layout and choice of materials",
    tools: "Minion Variable Concept, semi-matte coated paper",
    status: "Printed catalogue",
    resume: {
      probleme: "Document and promote the collection of a Geneva watchmaker.",
      reponse: "A complete printed catalogue: texts, photographs, layout and chosen papers.",
      resultat: "More than a catalogue, a testimony to Geneva's watchmaking heritage, carried by a rigorous layout, beautiful images and refined materials."
    },
    contexte: "The printed catalogue of the collection of Bruno Pesenti, a watchmaker in Geneva. I wanted it to look like him in every detail. I keep working with Bruno, notably on the updates of his website.",
    probleme: [
      ["A catalogue that looks like him", "A printed object true to Bruno in every detail, to document and promote his collection."],
      ["Pieces to present precisely", "Clear and detailed product descriptions, and photographs to match."]
    ],
    decisions: [
      {t: "The content", choix: "I wrote clear and detailed product descriptions, took the photographs and designed the layout."},
      {t: "A sober, dark palette", choix: "Deep blacks and rich browns.", pourquoi: "Colour acts on emotions: these tones evoke the luxury and sophistication of watchmaking."},
      {t: "A typeface that guides the eye", choix: "“Minion Variable Concept”, a serif typeface.", pourquoi: "It improves legibility: it creates an invisible horizontal line that guides the eye through the technical descriptions."},
      {t: "Paper to match", choix: "Cover in 200 g/m² paper with a “Soft Touch” matte lamination, pleasant to the touch. Inside pages in 115 g/m² semi-matte coated paper.", pourquoi: "For a beautiful reproduction of the photographs."}
    ]
  },
  10: {
    slider: true,
    hideEmpty: true,
    role: "Creation of the logo and the business card",
    status: "Visual identity",
    resume: {
      probleme: "Give a simple identity to a Geneva watchmaker.",
      reponse: "A logo that shows the hands of a watch set to 10:10.",
      resultat: "A logo that represents Bruno's brand well."
    },
    contexte: "The logo and the business card of Bruno Pesenti, a watchmaker in Geneva, created as part of our collaboration (catalogue, website, visual identity). I keep working with him, notably on the updates of his website.",
    probleme: [
      ["A logo understood at first glance", "A simple logo that you understand right away."],
      ["Tones that work everywhere", "Colours that work as well on a dark background as on a light one."]
    ],
    decisions: [
      {t: "The hands at 10:10", choix: "The logo shows the hands of a watch set to 10:10.", pourquoi: "It is the standard in the trade: in the vast majority of watch photographs, the watches show this time for aesthetic balance."},
      {t: "Sober tones", choix: "Sober colours that work as well on a dark background as on a light one.", pourquoi: "They reflect the luxury of watchmaking while staying true to its antique heritage."}
    ]
  },
  11: {
    slider: true,
    hideEmpty: true,
    role: "Creation of the series “Coach like a woman”",
    tools: "Drawing, video",
    status: "School project with UEFA and Amazon",
    resume: {
      probleme: "Encourage young women to become football coaches.",
      reponse: "A “Tomorrow's Football” campaign: a website, social media and an interactive animated series.",
      resultat: "A campaign and the beginning of the first episode, drawn."
    },
    contexte: "A campaign to encourage young women to become football coaches, as part of a school project run with UEFA and Amazon. In a team of eight, we created the campaign Tomorrow's Football: a website, a social media campaign and an interactive animated series.",
    probleme: [
      ["Making young women want to coach", "Encourage young women to start coaching football."]
    ],
    decisions: [
      {t: "A series: “Coach like a woman”", choix: "It follows a young woman who becomes the coach of her sister's football team. I was in charge of creating it."},
      {t: "Interactive", choix: "Each episode is partly created by the audience. We interviewed a real person, who explains what they want to see in the episode."},
      {t: "Entirely drawn", choix: "The series is drawn from start to finish. The beginning of the first episode has been made."}
    ]
  },
  12: {
    slider: true,
    hideEmpty: true,
    role: "Usability tests: moderator, then observer",
    status: "Testing assignment",
    resume: {
      probleme: "Test the usability of a banking app under development.",
      reponse: "Tests with two users of different profiles.",
      resultat: "Problems to solve, and solutions proposed."
    },
    contexte: "Usability tests on the app under development of Swissquote, a Swiss banking group (trading, investment, banking services). This experience let me put into practice what I had learned in class and understand concretely how to run a usability test.",
    probleme: [
      ["Spotting what blocks users", "Find the usage problems of an app that is still under development."]
    ],
    decisions: [
      {t: "Hypotheses first", choix: "I set up hypotheses."},
      {t: "Two user profiles", choix: "I prepared questions and tasks for two users with different profiles."},
      {t: "Moderator, then observer", choix: "During the interviews, I was the moderator, then the observer."},
      {t: "Solutions proposed", choix: "The tests brought out problems to solve, and we proposed solutions. I can't share the results."}
    ]
  },
  32: {
    slider: true,
    hideEmpty: true,
    role: "Creation of the logo",
    status: "Visual identity",
    resume: {
      probleme: "Give an identity to Mélanie's workshops, about natural homemade products.",
      reponse: "A stylised hummingbird in warm, golden tones.",
      resultat: "A logo that carries warmth, hope and resilience, easy to recognise and remember."
    },
    contexte: "A logo for Mélanie's workshops, where she helps everyone create natural homemade products, through her workshops and her blog.",
    probleme: [
      ["Inspiring people to join a mission", "Make everyone want to join Mélanie's mission."]
    ],
    decisions: [
      {t: "A legend as inspiration", choix: "The Native American legend of the hummingbird: faced with a terrible forest fire, a small hummingbird tirelessly carries drops of water to put it out, despite the mockery of the others. When asked why, it answers that it is doing its part."},
      {t: "A stylised hummingbird in warm, golden tones", choix: "A stylised hummingbird in warm, golden tones.", pourquoi: "They evoke the legendary and natural side of the story, carry warmth, hope and resilience, and make the logo easy to recognise and remember."},
      {t: "Everyone does their part", choix: "Like the hummingbird, Ateliers Colibri lets each person do their part, to form an ocean together out of individual streams."}
    ]
  },
  33: {
    slider: true,
    hideEmpty: true,
    role: "Creation of the logo",
    status: "Visual identity",
    resume: {
      probleme: "Give an identity to a website about Greek mythology, both cultural and commercial.",
      reponse: "A silhouette of ancient Greece, in warm, golden tones.",
      resultat: "A logo that reflects the identity of the project and is easy to recognise."
    },
    contexte: "The logo of an online website about Greek mythology, which also had to evoke the commercial side of the project.",
    probleme: [
      ["Evoking mythology and commerce", "A logo that is both cultural and commercial."]
    ],
    decisions: [
      {t: "A silhouette of ancient Greece", choix: "A silhouette of ancient Greece, with graphic elements that evoke the gods and heroes."},
      {t: "Warm, golden tones", choix: "Warm, golden colours.", pourquoi: "To reinforce the mythological side and give an impression of wealth and mystery."}
    ]
  },
  34: {
    slider: true,
    hideEmpty: true,
    role: "Design and development",
    tools: "Flutter, Android",
    status: "Android application",
    resume: {
      probleme: "Keep track of your screen time.",
      reponse: "A lion whose health and happiness depend on the time spent on the phone.",
      resultat: "An Android app with a widget and notifications."
    },
    contexte: "An Android application, created with Flutter, to keep track of your screen time with the help of a lion.",
    probleme: [
      ["Keeping track of screen time", "The user chooses the apps to follow, then sees the total time spent on their phone every day."]
    ],
    decisions: [
      {t: "A lion as the symbol", choix: "A lion whose health and happiness depend on screen time: too long, and it becomes sad and sick; reasonable, and it is happy and in great shape.", pourquoi: "The colours of the app also change with the screen time."},
      {t: "Day to day", choix: "A widget to follow the lion's progress from the home screen, and a notification every fifteen minutes spent on the phone."}
    ]
  },
  37: {
    slider: true,
    hideEmpty: true,
    role: "Design, visual identity and development",
    tools: "Front-end code",
    status: "Live, in French and English",
    resume: {
      probleme: "Have a site of my own to show and sell my acrylic animal portraits.",
      reponse: "A site designed and coded entirely by me, from the visual identity to the front-end.",
      resultat: "A site with a gallery, bespoke portraits, gift cards and a shop."
    },
    contexte: "My own website for my acrylic animal portraits. I designed and coded it entirely myself, from the visual identity to the front-end.",
    probleme: [
      ["Showing and selling my paintings", "A site of my own, to present my animal portraits and let people buy directly."]
    ],
    decisions: [
      {t: "What you will find", choix: "A gallery of my paintings, a bespoke portrait service to have your own pet painted, gift cards and an online shop to buy pieces directly."},
      {t: "A design true to my identity", choix: "A warm, soft palette, a hand-drawn “EP” monogram, and simple, realistic animal illustrations."},
      {t: "Two languages", choix: "The site is available in French and English."}
    ]
  },
};
