# Site de Sarissa : mode d'emploi

Site de 7 pages (Home, Beauty, Fashion, Lifestyle, About, Services, Contact), en anglais, sans abonnement.

## 1. Ajouter ses photos et vidéos

Les fichiers vont dans le dossier `assets`, rangés par catégorie :

- `assets/home/` : `hero.mp4` (vidéo d'accueil, facultative), `hero.jpg`, `beauty.jpg`, `fashion.jpg`, `lifestyle.jpg` (visuels des trois grandes cartes de l'accueil)
- `assets/beauty/`, `assets/fashion/`, `assets/lifestyle/` : les photos et vidéos de chaque galerie
- `assets/about/portrait.jpg` : sa photo pour la page About

Les noms de fichiers doivent correspondre à ceux listés dans `content.js` (ex. `beauty-01.jpg`). Pour ajouter, retirer ou renommer un contenu, il suffit de modifier les lignes de `content.js`. Tant qu'un fichier est absent, une vignette rose avec son nom s'affiche à la place.

Conseils : photos en .jpg de 300 à 600 Ko maximum, vidéos en .mp4 de 10 Mo maximum (verticales, 720p), pour que le site reste rapide sur mobile.

## 2. Mettre ses coordonnées

Dans `content.js`, remplacer `email`, `instagram` et `tiktok` par les vraies valeurs.

## 3. Mettre le site en ligne gratuitement avec GitHub Pages

1. Créer un compte sur github.com.
2. Cliquer sur **New repository**, le nommer par exemple `sarissa`, le laisser en **Public**, puis **Create repository**.
3. Cliquer sur **uploading an existing file**, glisser tout le contenu du dossier du site (fichiers et dossier `assets`), puis **Commit changes**.
   Limite de GitHub : 25 Mo maximum par fichier envoyé depuis le navigateur.
4. Aller dans **Settings, Pages**. Dans **Branch**, choisir `main` et le dossier `/ (root)`, puis **Save**.
5. Après 1 à 2 minutes, le site est disponible à l'adresse `https://son-pseudo.github.io/sarissa/`.

Pour modifier le site plus tard : ouvrir le dépôt, **Add file, Upload files**, et renvoyer le fichier modifié (il remplace l'ancien).

## 4. Nom de domaine

Le site est en ligne sur **https://sarissa-ugc.com** (domaine acheté sur Cloudflare, renouvellement automatique activé).

- Réglages DNS dans Cloudflare : 4 enregistrements A vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` et un CNAME `www` vers `sarissaball.github.io`, tous en **DNS only** (nuage gris). Ne pas activer le proxy (nuage orange).
- Le fichier `CNAME` du dépôt contient le nom de domaine : ne pas le supprimer.
- L'adresse `hello@sarissa-ugc.com` est redirigée vers la boîte Gmail via Cloudflare Email Routing.

## Notes

- Le formulaire de contact est envoyé directement grâce au service gratuit FormSubmit (formsubmit.co), puis un message de remerciement s'affiche. Les demandes arrivent à l'adresse indiquée dans `content.js` (`email`).
- Activation (une seule fois) : envoyer une première demande depuis le site, puis cliquer sur le lien d'activation reçu de FormSubmit dans la boîte mail. Tant que ce n'est pas fait, les messages ne sont pas transmis.
- Après une modification de `style.css`, `script.js` ou `content.js`, augmenter le numéro `?v=` dans les 7 pages .html (ex. `?v=4` devient `?v=5`). Sinon les navigateurs peuvent garder l'ancienne version en mémoire.
- Statistiques de visites : Cloudflare Web Analytics (Cloudflare > Analytics & Logs > Web Analytics). Le petit script est en bas de chaque page .html, à garder si on ajoute une page.
