const { products } = require('../data/mockData');

function listProducts(_req, res) {
  res.json(products);
}

/**
 * Get a single product by id.
 * TODO (Assessment Task - Backend 1): Implement this handler to return the product
 * when found, or 404 with { error: 'Product not found' } when the id does not match.
 */
function getProductById(req, res) {
  res.status(404).json({ error: 'Product not found' });
}

module.exports = { listProducts, getProductById };
