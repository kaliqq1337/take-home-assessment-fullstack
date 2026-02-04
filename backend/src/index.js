const express = require('express');
const cors = require('cors');
const { requestLogger, notFound, errorHandler } = require('./middleware');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const { health } = require('./controllers/healthController');

require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/health', health);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`DecryptCode E-commerce API running at http://localhost:${PORT}`);
  console.log('Mock data loaded. Endpoints: /api/products, /api/categories, /api/orders');
});
