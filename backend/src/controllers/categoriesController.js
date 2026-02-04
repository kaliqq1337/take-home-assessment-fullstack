const { categories } = require('../data/mockData');

function listCategories(_req, res) {
  res.json(categories);
}

function getCategoryById(req, res) {
  const category = categories.find((c) => c.id === req.params.id);
  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(category);
}

module.exports = { listCategories, getCategoryById };
