const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const LowStockSchema = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Reference to the Product model
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    
},{ timestamps: true })

LowStockSchema.index({product:1 ,name:1, category:1, quantity:1},{unique:true});

module.exports = mongoose.model('LowStock', LowStockSchema);
