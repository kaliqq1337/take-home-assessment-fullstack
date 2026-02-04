/**
 * TODO (Assessment Task - Backend 2): Implement validation for POST /api/orders body.
 * Validate that req.body has:
 * - items: array of { productId: string, quantity: number }
 * - each item must have productId (non-empty string) and quantity (positive integer)
 * If invalid, respond with 400 and { error: '...' } and do not call next().
 * If valid, call next().
 */
function validateOrderBody(req, res, next) {
  next();
}

module.exports = { validateOrderBody };
