const express = require('express');
const mongoose = require('mongoose');

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

// router.post('/deleteTemplate/:id', async (req, res) => {
//   //delete
//   Temp.findByIdAndRemove({_id: req.params.id}).then(temps =>{
//     res.send(temps)
//   })
// });

router.post('/deleteAllProducts', (req) => {
    if(req.body.name === 'yetkili')
    Product.remove({}, () => {
      console.log('deleted all products');
    })
  })

  router.post('/product', async(req, res) => {
    const { barcode , HBPrice } = req.body

    if (!barcode || !HBPrice) {
      return res
        .status(422)
        .send({ error: 'You must provide a name and datas' });
    }

  console.log(req.body);

  try {
      const product = new Product({ barcode, HBPrice });
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
});

module.exports = router;



  

  
