const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  barcode: {
    type: String,
    required: true
  },
  HBPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Product', ItemSchema);