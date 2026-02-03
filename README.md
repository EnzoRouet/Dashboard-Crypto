# 📈 Crypto Dashboard - Custom Charting Engine

**Projet de fin d'étude** focalisé sur le développement JavaScript natif et la manipulation graphique bas niveau.
Une Single Page Application (SPA) d'analyse financière construite sans framework, avec un moteur de rendu graphique développé "from scratch".

## 🎯 Contexte & Objectifs Pédagogiques

Ce projet a été réalisé dans le but de **valider une expertise approfondie du langage JavaScript**.

Contrairement à une approche classique utilisant des librairies clés en main (comme _Chart.js_ ou _Recharts_), le choix technique s'est porté sur **l'API Canvas HTML5 native**.

**Objectifs validés :**

- Maitrise du **JavaScript Vanilla (ES6+)** et de la Programmation Orientée Objet / Modulaire.
- Compréhension des **moteurs de rendu 2D** (coordonnées, pixels, rafraîchissement).
- Gestion des **mathématiques appliquées au front-end** (règle de trois, normalisation des données, inversion d'axes).
- Optimisation des performances (Gestion des "Calques" Canvas, RequestAnimationFrame).

## 🛠️ Stack Technique

- **Frontend :** JavaScript (ES Modules), HTML5, CSS3.
- **Moteur Graphique :** HTML5 Canvas API (100% Custom).
- **Données :** [CoinGecko API](https://www.google.com/search?q=https://www.coingecko.com/en/api) (Fetch & Async/Await).
- **Architecture :** Modulaire (Séparation Logique / Rendu / Données).

## ✨ Fonctionnalités Développées

### 1. Moteur de Graphique Financier

- Rendu de courbes de prix dynamiques basé sur l'historique API.
- Génération automatique des grilles X (Temps) et Y (Prix) selon l'échelle.
- Adaptation dynamique de l'échelle (Timeframes : 1J, 7J, 1M, 3M, 1A).

### 2. Outils d'Analyse Technique (Interactive Tools)

- **Crosshair (Curseur) :** Suivi de la souris avec affichage du prix et de la date précis (Interpolation linéaire).
- **Price Range Ruler :** Outil de dessin permettant de mesurer la performance (%) entre deux points, avec changement de couleur (Vert/Rouge) selon la tendance.

### 3. Interface & UX

- **SPA (Single Page App) :** Navigation fluide sans rechargement.
- **Architecture en Calques (Layers) :** Superposition de 4 canvas pour optimiser le rendu (seul le calque "Outils" est redessiné lors du mouvement de la souris).

## 🏗️ Architecture du Code

Le code est structuré pour séparer les responsabilités :

```
/src
├── API.js        # Gestion des appels réseaux (CoinGecko)
├── details.js    # Contrôleur de la vue détaillée (Logique métier)
├── draw.js       # Moteur de rendu statique (Courbes, Grilles)
├── render.js     # Manipulation du DOM (Tableau, Listes)
└── tools.js      # Moteur d'interaction (Dessin, Souris, Calculs mathématiques)

```

## 🧠 Challenges Techniques Résolus

### La conversion Données ↔ Pixels

Le défi principal était de traduire des données financières (ex: Bitcoin à 45 000$) en coordonnées pixels sur l'écran, et inversement pour les outils de dessin.

- _Solution :_ Implémentation de fonctions de normalisation prenant en compte la hauteur du canvas et l'inversion de l'axe Y (le point 0 étant en haut en informatique graphique).

### La gestion des Écouteurs d'Événements

Lors du changement de timeframe (ex: passer de 1 jour à 1 mois), les anciens écouteurs de souris s'accumulaient, créant des bugs de performance.

- _Solution :_ Mise en place d'une stratégie de clonage de nœuds DOM (`cloneNode`) pour nettoyer proprement les anciens listeners avant d'initialiser le nouveau graphique.

## ⚙️ Installation & Lancement

Le projet utilisant les modules ES6 (`import/export`), il nécessite un environnement serveur local.

1. **Cloner le dépôt :**

```bash
git clone https://github.com/ton-pseudo/crypto_dashboard.git

```

2. **Configuration :**
   Créer un fichier `src/config.js` et y ajouter votre clé API CoinGecko :

```javascript
export const API_KEY = "VOTRE_CLE_ICI";
```

⚡ Option rapide (Clé de Démo) : Si vous ne souhaitez pas créer de compte CoinGecko pour tester le projet, vous pouvez utiliser cette clé générée spécifiquement pour la démonstration :

export const API_KEY = "CG-NnmfhqMBMUBvf8VhhicqpSsw";

⚠️ Note : Cette clé étant publique et partagée, elle est susceptible d'atteindre les limites de requêtes (Rate Limit) si plusieurs utilisateurs testent le projet simultanément.

3. **Lancer le serveur local :**

- Via VS Code : Extension **Live Server**.
- Via Python : `python -m http.server 8000`
- Via Node : `npx serve`

---

_Projet réalisé par Enzo Rouet._
