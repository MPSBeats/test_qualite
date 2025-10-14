// server.test.js
const request = require('supertest');
const express = require('express');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

// Création d'une mini-app pour tester
const app = express();
app.use(express.json());
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);

describe('API Catalogue Tests', () => {

  // --- Tests produits --- //
  test('GET /products → doit retourner un tableau de produits', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /products/:id → doit retourner un produit spécifique', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name');
  });

  test('GET /products/:id → id inexistant retourne 404', async () => {
    const res = await request(app).get('/products/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

  // --- Tests catégories --- //
  test('GET /categories → doit retourner un tableau de catégories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /categories/:id → doit retourner une catégorie spécifique', async () => {
    const res = await request(app).get('/categories/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name');
  });

  test('GET /categories/:id → id inexistant retourne 404', async () => {
    const res = await request(app).get('/categories/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

});
