// Importation des modules nécessaires
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Définition du chemin du fichier JSON contenant les catégories
const categoriesFilePath = path.join(__dirname, '../data/categories.json');

// --- Fonctions utilitaires --- //

// Lecture du fichier JSON
function readCategories() {
  const data = fs.readFileSync(categoriesFilePath, 'utf-8');
  return JSON.parse(data);
}

// Écriture dans le fichier JSON
function writeCategories(categories) {
  fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2));
}

// --- Routes Catégories --- //

// 🔹 GET /categories → Liste toutes les catégories
router.get('/', (req, res) => {
  res.json(readCategories());
});

// 🔹 GET /categories/:id → Récupère une catégorie spécifique
router.get('/:id', (req, res) => {
  const categories = readCategories();
  const category = categories.find(c => c.id === parseInt(req.params.id));

  category ? res.json(category) : res.status(404).json({ message: 'Catégorie non trouvée' });
});

// 🔹 POST /categories → Ajoute une nouvelle catégorie
router.post('/', (req, res) => {
  const categories = readCategories();
  const { name } = req.body;

  const newCategory = {
    id: categories.length ? categories[categories.length - 1].id + 1 : 1,
    name
  };

  categories.push(newCategory);
  writeCategories(categories);

  res.status(201).json(newCategory);
});

// 🔹 PUT /categories/:id → Met à jour une catégorie existante
router.put('/:id', (req, res) => {
  const categories = readCategories();
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) return res.status(404).json({ message: 'Catégorie non trouvée' });

  category.name = req.body.name ?? category.name;

  writeCategories(categories);
  res.json(category);
});

// 🔹 DELETE /categories/:id → Supprime une catégorie
router.delete('/:id', (req, res) => {
  let categories = readCategories();
  const id = parseInt(req.params.id);
  const initialLength = categories.length;

  categories = categories.filter(c => c.id !== id);

  if (categories.length === initialLength) {
    return res.status(404).json({ message: 'Catégorie non trouvée' });
  }

  writeCategories(categories);
  res.json({ message: 'Catégorie supprimée' });
});

// Export du routeur
module.exports = router;
