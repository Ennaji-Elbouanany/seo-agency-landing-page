# SEO Agency — Landing Page

Intégration d’une landing page à partir d’une maquette, en HTML, CSS et JavaScript avec jQuery local. Aucun outil de compilation ni installation de dépendances n’est nécessaire.

## Lancer le projet

Ouvrir `index.html` dans un navigateur, ou servir le dossier localement :

```bash
python -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Structure

```text
index.html          Structure et sections de la page
style.css           Mise en page responsive, polices et animations
script.js           Apparitions au scroll et interaction newsletter
jquery-4.0.0.js      Copie locale de jQuery utilisée par la page
assets/fonts/       Polices WOFF2 et licences associées
assets/images/      Images et éléments graphiques de la maquette
```

## Interactions et choix techniques

- jQuery est chargé une seule fois, avant `script.js`, avec `defer` et un chemin relatif compatible avec GitHub Pages.
- IntersectionObserver détecte l’entrée et la sortie des éléments portant `data-reveal`. jQuery ajoute ou retire `is-visible` : les apparitions se rejouent à chaque passage.
- Le CSS anime l’opacité et une translation verticale de 16 px pendant 450 ms. Les éléments d’un groupe peuvent apparaître avec un décalage de 70 ms.
- Le titre et le bouton principal de Home sont immédiatement visibles.
- Les cartes conservent le fond de leur section. Le fond bleu clair des cartes du guide et le fond gris clair des cartes Business apparaissent au survol avec un pointeur précis ; aucun clic ne conserve de sélection.
- Le clavier dispose d’un focus visible. Les transitions de fond des cartes durent 200 ms ; celles des liens et boutons durent 180 ms.
- `prefers-reduced-motion` est respecté. Le contenu reste lisible si JavaScript ou jQuery n’est pas disponible.
- Les polices sont hébergées localement ; DM Sans est préchargée. Les images sous Home utilisent le chargement différé.

## Vérifications réalisées

Vérifications dans Chrome à 1440, 768, 390 et 320 px : apparitions répétées au scroll, survol, absence de sélection persistante après clic ou événement tactile, focus clavier, réduction des mouvements et lisibilité sans JavaScript ou jQuery. Aucun débordement horizontal ni erreur JavaScript détecté pendant ces tests.

La comparaison pixel perfect avec la maquette et les essais sur de vrais appareils et d’autres navigateurs restent à effectuer.

## Périmètre de la démonstration

Le projet est une intégration statique. Le formulaire newsletter affiche un message d’indisponibilité et n’envoie aucune inscription. Les tarifs Monthly/Annual, les achats et la navigation des témoignages restent dans l’état visuel fourni. Le lien `Contact Us` pointe actuellement vers une cible `#contact` à compléter.

Les licences des polices sont présentes dans `assets/fonts/`. La copie de jQuery conserve son en-tête de licence. Les éléments graphiques proviennent des ressources fournies pour le test.

## Hébergement sur GitHub Pages

Après publication du dépôt :

1. Ouvrir **Settings → Pages** sur GitHub.
2. Choisir **Deploy from a branch**.
3. Sélectionner la branche **main**, dossier **/ (root)**, puis enregistrer.

Les fichiers utilisent des chemins relatifs pour fonctionner sous l’URL du dépôt. L’activation de GitHub Pages n’est pas effectuée par cette préparation du dépôt.
