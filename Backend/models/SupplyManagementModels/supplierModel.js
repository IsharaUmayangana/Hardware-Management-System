const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SupplierSchema = new Schema({
  name: {
    type: String,
    //required: true
  },
  contact: {
    phone: String,
    email: String,
    address: String
  },
  productsSupplied: [{
    name: String,
    category: String 
  }],
  paymentTerms: String,
  orderHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    orderDate: Date,
    
  }],
  performanceMetrics: {
    onTimeDelivery: Number,
    productQuality: Number,
    responsiveness: Number,
    
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);


