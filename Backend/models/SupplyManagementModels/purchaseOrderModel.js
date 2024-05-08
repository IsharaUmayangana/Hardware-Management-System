const mongoose = require('mongoose');

// Define the PurchaseOrder schema
const PurchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      //required: true
    }
  }],
  totalAmount: {
    type: Number,
    //required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Cancelled', 'Received'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the PurchaseOrder model
const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

module.exports = PurchaseOrder;
