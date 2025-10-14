// Importation du framework Express
const express = require('express');

// Importation du module CORS (Cross-Origin Resource Sharing)
// → Permet à ton API d’être appelée depuis un autre domaine (ex : front-end sur un autre port)
const cors = require('cors');

// Importation des fichiers de routes
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

// Création de l’application Express
const app = express();

// Middleware global : autorise les requêtes cross-origin
app.use(cors());

// Middleware : permet à Express de lire les corps de requêtes au format JSON
app.use(express.json());

// Montage des routeurs
// → Toute requête commençant par /products sera gérée par routes/products.js
// → Toute requête commençant par /categories sera gérée par routes/categories.js
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);

// Définition du port d’écoute du serveur
const PORT = 3000;

// Lancement du serveur : écoute sur http://localhost:3000
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));