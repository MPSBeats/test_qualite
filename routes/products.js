// Importation des modules nécessaires
const express = require('express');
const fs = require('fs');          // Pour lire/écrire les fichiers JSON
const path = require('path');      // Pour gérer les chemins de fichiers
const router = express.Router();   // Création du routeur Express

// Définition du chemin du fichier JSON contenant les produits
const productsFilePath = path.join(__dirname, '../data/products.json');

// --- Fonctions utilitaires --- //

// Lecture du fichier JSON et conversion en tableau d’objets
function readProducts() {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
}

// Écriture d’un tableau d’objets dans le fichier JSON
function writeProducts(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// --- Routes Produits --- //

// 🔹 GET /products → Retourne tous les produits
router.get('/', (req, res) => {
  res.json(readProducts());
});

// 🔹 GET /products/:id → Retourne un produit spécifique
router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));

  // Si le produit existe → le renvoyer, sinon message d’erreur 404
  product ? res.json(product) : res.status(404).json({ message: 'Produit non trouvé' });
});

// 🔹 POST /products → Ajoute un nouveau produit
router.post('/', (req, res) => {
  const products = readProducts();
  const { name, price, categoryId } = req.body;

  // Création du nouveau produit avec un id auto-incrémenté
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    categoryId
  };

  // Ajout et sauvegarde dans le fichier
  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// 🔹 PUT /products/:id → Met à jour un produit existant
router.put('/:id', (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  // Si non trouvé → erreur
  if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

  // Mise à jour seulement des champs fournis
  const { name, price, categoryId } = req.body;
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.categoryId = categoryId ?? product.categoryId;

  writeProducts(products);
  res.json(product);
});

// 🔹 DELETE /products/:id → Supprime un produit
router.delete('/:id', (req, res) => {
  let products = readProducts();
  const id = parseInt(req.params.id);
  const initialLength = products.length;

  // Filtrer pour retirer le produit correspondant
  products = products.filter(p => p.id !== id);

  // Si aucun changement → produit introuvable
  if (products.length === initialLength) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }

  writeProducts(products);
  res.json({ message: 'Produit supprimé' });
});

// Export du routeur pour utilisation dans server.js
module.exports = router;