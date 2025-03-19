const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  salesRep: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Sale', SaleSchema); 