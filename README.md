# Portfolio d'Elodie Perring

Un site statique (HTML, CSS, JavaScript), sans outil de build. Ouvre `index.html` dans un navigateur, ou mets le dossier tel quel sur un hébergement (Virtualmin, GitHub Pages, Netlify, Vercel).

Le site est en français et en anglais (le bouton FR / EN en haut). Il est pensé pour le téléphone d'abord.

## Mettre en ligne
Il n'y a rien à compiler. Envoie le **contenu du dossier** (`index.html`, `projet.html`, `projets.html`, `assets/`, et les quatre dossiers `*-app/`) à la racine de l'hébergement (`public_html` sur Virtualmin). Le fichier `portfolio-dist.zip` contient exactement cela.

## Les fichiers
- `index.html` : l'accueil (présentation, projets, compétences, contact).
- `projets.html` : tous les projets, avec un filtre par type et une recherche.
- `projet.html` : la page d'un projet (`projet.html?id=…`), faite à partir de `assets/projects.js` et des textes de `assets/studies.js` (français) et `assets/studies-en.js` (anglais).
- `assets/projects.js` : la liste de tous les projets (titre, description, images, étiquettes, date, site). Chaque projet est écrit deux fois : en anglais, et dans le bloc `fr`.
- `assets/studies.js`, `assets/studies-en.js` : le contenu de chaque page de projet (contexte, problème, décisions…). Avec `slider: true`, les images défilent toutes seules, en grand ; avec `hideEmpty: true`, les sections vides sont retirées.
- `assets/stories.js`, `assets/story.js`, `assets/story.css` : l'histoire interactive d'un projet, racontée sur un téléphone.
- `assets/style.css` : les styles du site. Les couleurs et les polices sont des variables en haut du fichier.
- `assets/i18n.js` : le français et l'anglais.

## Les applications interactives
Chaque projet interactif est une vraie application, avec des données inventées :
- `pinday-app/` : Pinday (l'application elle-même, en mode démo).
- `myhouzly-app/` : MyHouzly, reconstruit avec la feuille de style et le balisage de l'application.
- `vaudsentiers-app/` : Vaud Sentiers, reconstruit d'après les maquettes Figma.
- `adopt-app/` : Adopte un animal, le code Vue.js de l'application avec une fausse API (`mock.js`) qui tourne dans la page.

Rien ne quitte la page : aucune donnée réelle, aucun mot de passe.

## En local
```
python -m http.server 5190
```
puis ouvre http://localhost:5190.
