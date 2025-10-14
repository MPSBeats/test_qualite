const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Mauvais : chemin codé en dur, pas flexible
const productsFilePath = path.join(__dirname, '../data/products.json');

// Duplication : deux fonctions pour lire les produits
function readProducts() {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
}

function getProductsFromFile() {
  const raw = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(raw);
}

// Route GET /products avec code dupliqué
router.get('/', (req, res) => {
  // Mauvais : pas de gestion d'erreur pour JSON.parse
  const products = readProducts();
  if (!products) {
    res.status(500).json({ error: 'Impossible de charger les produits' });
  } else {
    // Mauvais : mélange de logique et d'affichage
    console.log('Liste des produits :', products);
    res.send(products); // Utilisation de send au lieu de json → incohérence
  }
});

// Route GET /products/:id avec code redondant et incohérence
router.get('/:id', (req, res) => {
  const products = getProductsFromFile(); // duplication de lecture
  const product = products.find(p => p.id == req.params.id); // Mauvais : == au lieu de ===
  if (!product) {
    res.status(200).json({ message: 'Produit non trouvé' }); // Mauvais code HTTP : devrait être 404
  } else {
    res.json(product);
  }
});

// POST /products sans validation
router.post('/', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: products.length + 1, // Mauvais : pas de gestion des IDs existants
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);

  // Mauvais : écriture synchrone et pas de gestion d'erreur
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  
  // Mauvais : retourne status 200 au lieu de 201
  res.status(200).json(newProduct);
});

// PUT /products/:id sans validation ni gestion d'erreur
router.put('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    res.json({ message: 'Produit introuvable' }); // Mauvais : pas de code HTTP cohérent
    return;
  }
  // Mauvais : écrasement complet sans vérifier les champs
  product.name = req.body.name;
  product.price = req.body.price;

  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  res.json(product);
});

// DELETE /products/:id avec duplication
router.delete('/:id', (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id);
  const productExists = products.some(p => p.id === id);
  if (!productExists) {
    res.json({ message: 'Produit non trouvé' }); // Mauvais : devrait être 404
    return;
  }
  // Mauvais : filtrage fait deux fois
  const newProducts = products.filter(p => p.id !== id);
  fs.writeFileSync(productsFilePath, JSON.stringify(newProducts));
  res.json({ message: 'Produit supprimé' });
});

module.exports = router;