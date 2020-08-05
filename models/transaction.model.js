const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userID: { type: String, required: true },
  product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;