
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userID: { type: String, required: true },
  product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  quantity: { type: Number, required: true },
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;