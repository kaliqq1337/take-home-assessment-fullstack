/**
 * TODO (Assessment Task - Backend 2): Implement validation for POST /api/orders body.
 * Validate that req.body has:
 * - items: array of { productId: string, quantity: number }
 * - each item must have productId (non-empty string) and quantity (positive integer)
 * If invalid, respond with 400 and { error: '...' } and do not call next().
 * If valid, call next().
 */
function validateOrderBody(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Request body must be a JSON object' });
  }

  const { items } = body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' });
  }

  if (items.length === 0) {
    return res.status(400).json({ error: 'items must not be empty' });
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!item || typeof item !== 'object') {
      return res.status(400).json({ error: `items[${i}] must be an object` });
    }

    const { productId, quantity } = item;

    if (typeof productId !== 'string' || productId.trim().length === 0) {
      return res
          .status(400)
          .json({ error: `items[${i}].productId must be a non-empty string` });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res
          .status(400)
          .json({ error: `items[${i}].quantity must be a positive integer` });
    }
  }

  next();
}

module.exports = { validateOrderBody };
