const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Products
let ProductAdd = new Schema({
  
  ProductUniqueId: {
    type: Number
  },
  ProductDes: {
    type: String
  },
  ProductOffer: {
    type: String
  },
  ProductTitle: {
    type: String
  },
  ProductPrice: {
    type: String
  }

},{
    collection: 'productAdd'
});

module.exports = mongoose.model('ProductAdd', ProductAdd);