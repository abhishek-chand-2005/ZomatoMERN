const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        }
      }
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
      default: 'pending',
    }
  },
  {
    timestamps: true }
);

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel