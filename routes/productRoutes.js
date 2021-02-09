const express = require('express');
const mongoose = require('mongoose');
var request = require('request');

const Product = mongoose.model('Product');

const router = express.Router();


// router.post('/getUserTemplate', async (req, res) => {
//   const temps = await Temp.find({ userId: req.user._id });

//   res.send(temps);
// });

router.get('/product', async (req, res) => {
  Product.find().then((item) => {
    res.send(item)
  }).catch(err => { res.status(404).json({ msg: err }), console.log(err.msg); });
});

router.get('/productsearch', async (req, res) => {
  var rate = 1;
  var options = {
    'method': 'GET',
    'url': 'https://api.exchangeratesapi.io/latest',
    'headers': {
      'Cookie': '__cfduid=daff3ce01fc6fdeb0fda6aecb860dad2c1612889485'
    }
  };
  request(options, async function (error, response) {
    if (error) throw new Error(error);
    var rates = JSON.parse(response.body).rates
    rate = (rates.TRY / rates.USD);
    var query = {$where: `function() { return this.UK[0].price/this.HBPrice >= ${rate}}`}
    Product.find(query, { HBPrice: 1, "UK.price": 1, _id: 0 }).
    exec(function (err, results) {
      res.send(results)
    });
  });
  var sayi = 10
  var sayi2 = 100


  // {"UK.price" : {$lt : 220}}
  // {"UK.price" : 102}
  // { $where: function(sayi) { return this.UK[0].price  ==   this.HBPrice * sayi } }
});

// router.post('/deleteTemplate/:id', async (req, res) => {
//   //delete
//   Temp.findByIdAndRemove({_id: req.params.id}).then(temps =>{
//     res.send(temps)
//   })
// });

router.post('/deleteAllProducts', (req) => {
  if (req.body.name === 'yetkili')
    Product.remove({}, () => {
      console.log('deleted all product names');
    })
})

router.post('/product', async (req, res) => {
  const { barcode, HBPrice, UK, US, DE, link } = req.body

  if (!barcode || !HBPrice) {
    return res
      .status(422)
      .send({ error: 'You must provide a barcode and HBPrice' });
  }

  console.log(req.body);

  try {
    const product = new Product({ barcode, HBPrice, UK, US, DE, link });
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;






