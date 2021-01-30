const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  main: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Category', ItemSchema);