const router = require('express').Router();
const authenticate = require('./auth')
let Cart = require('../models/cart.model');

router.route('/').get(authenticate, (req, res) => {
  Cart.find({userID: req.user.userID}).populate('product')
    .then(carts => res.json(carts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(authenticate, (req, res) => {
  const userID = req.user.userID
  const product = req.body.product;
  const quantity = Number(req.body.quantity);

  const newCart = new Cart({
    userID,
    product,
    quantity,
  });

  newCart.save()
  .then(() => res.json('Product added in cart!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;