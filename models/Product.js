const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmazonPrice = new Schema({
  price: {
    type: Number,
  },
  link: {
    type: String,
  },
  exist: {
    type: Boolean,
    required: true
  },
});

const ItemSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: true
  },
  HBPrice: {
    type: Number,
    required: true
  },
  US: {
    type: [AmazonPrice],
  }, UK: {
    type: [AmazonPrice],
  }, DE: {
    type: [AmazonPrice],
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Product', ItemSchema);