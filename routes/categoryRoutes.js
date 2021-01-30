const express = require('express');
const mongoose = require('mongoose');

const Category = mongoose.model('Category');

const router = express.Router();


router.get('/category', async (req, res) => {
  const category = await Category.find({});
  res.send(category);
});

router.post('/deleteallcategoies', (req) => {
  if(req.body.name === 'yetkili')
  Category.remove({}, () => {
    console.log('deleted all products');
  })
})

router.post('/category', async(req, res) => {
  const { name, link , main} = req.body;
  
  if (!name || !link) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and link' });
  }
  
    try {
      const category = new Category({ name, link , main});
      await category.save();
      res.send(category);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });


module.exports = router;