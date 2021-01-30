const express = require('express');
const mongoose = require('mongoose');

const ProductName = mongoose.model('ProductName');

const router = express.Router();


router.get('/productname', async (req, res) => {
  const productname = await ProductName.find({});
  res.send(productname);
});

// router.post('/deleteTemplate/:id', async (req, res) => {
//   //delete
//   Temp.findByIdAndRemove({_id: req.params.id}).then(temps =>{
//     res.send(temps)
//   })
// });

router.post('/deleteAllProductNames', (req) => {
  if(req.body.name === 'yetkili')
  ProductName.remove({}, () => {
    console.log('deleted all products');
  })
})

router.post('/productname', async(req, res) => {
  const { name, link } = req.body;
  
  if (!name || !link) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and link' });
  }
  
    try {
      const productname = new ProductName({ name, link});
      await productname.save();
      res.send(productname);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });


module.exports = router;