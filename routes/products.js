const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(async (req, res) => {
    Product.find().populate('category',null,{_id: req.params.id})
      .then(products => {
        res.json(products.filter(product => !!product.category))
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const name = req.body.name
  const category = req.body.category;
  const description = req.body.description;
  const price = req.body.price;
  const make = req.body.make;

  const newProduct = new Product({
    name,
    category,
    description,
    price,
    make
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;