const express = require('express');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
const productErrorMiddleware = require('./middlewares/productErrorMiddleware');
const saleErrorMiddleware = require('./middlewares/saleErrorMiddleware');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.use(express.json());
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use(productErrorMiddleware);
app.use('/sales', salesRoute);
app.use(saleErrorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;