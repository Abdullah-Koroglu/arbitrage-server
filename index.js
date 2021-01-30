require('./models/Product');
require('./models/ProductName');
require('./models/Category');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const productNameRoutes = require('./routes/productNameRoutes');


const app = express();

app.use(bodyParser.json());
app.use(productRoutes);
app.use(productNameRoutes);
app.use(categoryRoutes);


mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  app.get('/', (req, res) => {
    res.send('Bismihi')
  })

const port = 3000;

app.listen(port, () => console.log('Server running...'));
