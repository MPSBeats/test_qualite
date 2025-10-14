# test_qualite

# 🛍️ Mini-API Catalogue (Node.js / Express)

Cette mini-API permet de gérer un **catalogue de produits** et leurs **catégories**.  
Elle expose deux groupes d’endpoints :
- `/products` → pour la gestion des produits ;
- `/categories` → pour la gestion des catégories de produits.

---

## 🚀 Fonctionnalités principales

- Récupérer la liste complète des produits et catégories  
- Obtenir un élément précis par son `id`  
- Ajouter, modifier et supprimer un produit  
- Persistance des données dans des fichiers JSON (`/data/products.json` et `/data/categories.json`)  
- Architecture simple et claire avec Express.js  

---

## ⚙️ Installation et configuration

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/<ton-nom-utilisateur>/<nom-du-repo>.git
cd <nom-du-repo>

### 2️⃣ Installer les dépendances

Avant tout, vérifie que **Node.js** (version 18 ou supérieure) est installé sur ta machine.  
Ensuite, installe les dépendances avec :

```bash
npm install

Cela installera :

express → framework serveur

cors → autoriser les requêtes cross-origin

(et éventuellement jest si tu fais des tests unitaires)

▶️ Lancer le serveur

Une fois les dépendances installées, tu peux démarrer l’API avec :

node server.js


Par défaut, le serveur démarre sur :
👉 http://localhost:3000

Tu verras dans la console :

✅ Serveur démarré sur le port 3000

📁 Structure du projet
mini-api-catalogue/
│
├── data/
│   ├── products.json        → Données des produits
│   └── categories.json      → Données des catégories
│
├── routes/
│   ├── products.js          → Routes CRUD pour les produits
│   └── categories.js        → Routes CRUD pour les catégories
│
├── tests/
│   └── api.test.js          → Tests unitaires (facultatif)
│
├── .gitignore               → Exclusion du dossier node_modules
├── package.json             → Configuration du projet Node
├── server.js                → Point d’entrée de l’application
└── README.md                → Documentation du projet

🧩 Utilisation de l’API
🔹 Produits (/products)
Méthode	Endpoint	Description
GET	/products	Liste tous les produits
GET	/products/:id	Affiche un produit spécifique
POST	/products	Ajoute un nouveau produit
PUT	/products/:id	Met à jour un produit existant
DELETE	/products/:id	Supprime un produit
Exemple de requête POST
POST /products
Content-Type: application/json

{
  "name": "Manette Xbox",
  "price": 69.99,
  "categoryId": 2
}

Réponse
{
  "id": 6,
  "name": "Manette Xbox",
  "price": 69.99,
  "categoryId": 2
}

🔹 Catégories (/categories)
Méthode	Endpoint	Description
GET	/categories	Liste toutes les catégories
GET	/categories/:id	Affiche une catégorie spécifique
POST	/categories	Ajoute une nouvelle catégorie
PUT	/categories/:id	Met à jour une catégorie
DELETE	/categories/:id	Supprime une catégorie
🧪 Lancer les tests unitaires

Si tu as un fichier tests/api.test.js, tu peux exécuter les tests avec :

npm test


ou, si tu lances sans Jest installé :

node tests/api.test.js


💡 Assure-toi que ton serveur n’est pas déjà en cours d’exécution avant de lancer les tests.

🔧 Dépendances principales
Package	Utilité
express	Framework minimaliste pour créer l’API
cors	Autorise les requêtes externes
fs / path	Manipulation des fichiers et chemins locaux
jest (optionnel)	Tests unitaires automatiques
🚫 Fichiers ignorés ( .gitignore )

Le fichier .gitignore exclut certains dossiers/fichiers du dépôt :

node_modules/
.env




Réalisé par Sacha Simon , Dorian Roux et Yanis Slimani
