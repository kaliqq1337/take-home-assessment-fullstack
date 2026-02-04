const { Router } = require('express');
const ordersController = require('../controllers/ordersController');
const { validateOrderBody } = require('../middleware/validateOrderBody');

const router = Router();

router.get('/', ordersController.listOrders);
router.post('/', validateOrderBody, ordersController.createOrder);

module.exports = router;
