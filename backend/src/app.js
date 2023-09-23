const express = require('express');
const productRouter = require('./routes/productRoute');
const salesRouter = require('./routes/salesRoute');
const productUpdateRouter = require('./routes/productRoute');

const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);
app.use('/products', productUpdateRouter);
// não remova esse endpoint, é para o avaliador funcionar //
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
