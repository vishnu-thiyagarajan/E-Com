const router = require('express').Router();
const authenticate = require('./auth')
let Transaction = require('../models/transaction.model');

router.route('/').get(authenticate, (req, res) => {
  Transaction.find({userID: req.user.userID}).populate('product')
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(authenticate, (req, res) => {
  const userID = req.user.userID
  const product = req.body.product;
  const quantity = Number(req.body.quantity);
  const amount = Number(req.body.quantity);

  const newTransaction = new Transaction({
    userID,
    product,
    quantity,
    amount,
  });

  newTransaction.save()
  .then(() => res.json('Added transaction!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').put(authenticate, async (req, res) => {
    const userID = req.user.userID
    const product = req.body.product;
    const quantity = Number(req.body.quantity);
    const amount = Number(req.body.amount);
    Transaction.findOneAndUpdate({_id: req.params.id}, {
        userID,
        product,
        quantity,
        amount,
      }, {
        new: true
      })
    .then((data) => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/delete/:id').delete(authenticate, async (req, res) => {
    Transaction.deleteOne({_id: req.params.id})
    .then(() => res.json('Transaction Deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;