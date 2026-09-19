
# 🌐 Code with Chris - Portfolio
![Logo du site](./src/assets/images/chrislain-light-logo.png)

Bienvenue sur mon portfolio développé avec **Vue.js** !  
Ce projet met en avant mes compétences, expériences, et réalisations en tant que développeur web full-stack.

---


## Aperçu du Site en Dark Mode 
![Description de l'image](./src/assets/images/preview_ca_website_dark.png)

---

## 🌟 Fonctionnalités

- **Technologies modernes :** Construit avec **Vue.js** pour une interface réactive et performante.  
- **Contact simplifié :** Intégration de l'API **EmailJS** pour permettre aux visiteurs de m'envoyer des messages directement via le formulaire de contact.  
- **Responsivité :** Adapté à tous les écrans (mobile, tablette et desktop).  
- **Design épuré :** Interface moderne et élégante, mettant en valeur mes projets et compétences.  
- **Multilingue :** Support des langues **français** et **anglais** avec i18n.

---

## 🚀 Technologies utilisées

- **Framework Frontend :** [Vue.js](https://vuejs.org/)  
- **API de messagerie :** [EmailJS](https://www.emailjs.com/)  
- **Gestion des styles :** [Tailwind CSS](https://tailwindcss.com/) et [DaisyUI](https://daisyui.com/)  
- **Internationalisation :** Gestion multilingue avec i18n.

---

## 📂 Structure du projet

```
├── public/
│   ├── images/         # Images statiques utilisées dans le site
│   └── favicon/        # Icônes du site
├── src/
│   ├── assets/         # Images et ressources de styles
│   ├── components/     # Composants réutilisables
│   ├── locales/        # Fichiers JSON pour les traductions (français et anglais)
│   ├── views/          # Pages principales (Home, About, Contact, etc.)
│   └── App.vue         # Composant racine
└── package.json        # Configuration des dépendances
```

---

## 📋 Installation et exécution

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/RootCode2024/portfolio.git
   cd portfolio
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

4. **Accéder au site :**  
   Ouvrez votre navigateur à l'adresse [http://localhost:5173](http://localhost:5173).

---

## 📨 Configuration d'EmailJS

1. Créez un compte sur [EmailJS](https://www.emailjs.com/).  
2. Configurez un **service email**, un **modèle** et récupérez votre `SERVICE_ID`, `TEMPLATE_ID` et `USER_ID`.  
3. Ajoutez-les dans votre fichier `.env` :
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_user_id
   ```

---

## 📬 Me contacter

Envoyez-moi un message via le formulaire de contact ou par email :  
- **E-mail :** chrislainavocegan1@gmail.com  
- **LinkedIn :** [Chrislain Avocegan](https://www.linkedin.com/in/chrislain-avocegan-314273315)  
- **Portfolio en ligne :** [chrislain-portfolio.vercel.app](https://chrislain-portfolio.vercel.app)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Vous pouvez librement l'utiliser, le modifier, ou l'améliorer.  

---

### ✨ Développé avec passion par *Code with Chris*  

---

## Publier un article de blog

Le blog ne dépend d'aucune base de données : un article = un fichier Markdown.

1. Créer un fichier dans `src/content/blog/`, par exemple `mon-article.md`.
   Le nom du fichier devient l'URL : `/blog/mon-article`.
2. Commencer le fichier par cet en-tête :

```markdown
---
title: Titre de l'article
description: Une ou deux phrases de résumé, affichées dans la liste
date: 2026-09-19
tags: [Laravel, API]
cover: /assets/images/mon-image.png
lang: fr
---

Le contenu de l'article, en Markdown.
```

3. Committer et déployer. Le tri par date, le temps de lecture, les filtres par
   sujet et les articles liés sont calculés automatiquement.

## Mettre à jour les réalisations

Les projets sont définis à un seul endroit : `src/data/projects.js`.
Le champ `featured: true` place le projet sur la page d'accueil (6 maximum).
Les descriptions longues des pages de détail sont dans
`src/views/Works/WorkDetailView.vue`, repérées par le même `slug`.

## Regénérer le CV PDF

Le CV téléchargeable est construit à partir des fichiers de traduction, pour
qu'il reste toujours aligné avec la page `/resume` :

```bash
npm run build:cv     # nécessite : pip install weasyprint
```

Sortie : `public/assets/cv/chrislain_avocegan_cv_{fr,en}.pdf`

## Sitemap

```bash
npm run build && npm run build:sitemap
```

Génère `dist/sitemap.xml` et `dist/robots.txt`, articles de blog et pages
projets inclus.
