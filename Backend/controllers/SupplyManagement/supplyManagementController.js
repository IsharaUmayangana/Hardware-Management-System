const LowStock = require('../../models/SupplyManagementModels/SMNotifications')
const mongoose = require('mongoose')

// get all Notifications
const getAllLowStockItems = async (req, res) => {
    
    const LowStockItems = await LowStock.find({}).sort({createdAt: -1})

    res.status(200).json(LowStockItems)
}


// get one low stock item

const getOneLowStockItem = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the item'})
    }
    const LowStockItem = await LowStock.findById(id)

    if(!LowStockItem){
        return res.status(404).json({error: 'Cannot find the item'})
    }
    res.status(200).json(LowStockItem) 
}

// post a new low stock item

const createLowStockItem = async (req, res) => {
    const items = req.body; 

    try {
        
        const createdItems = [];

        
        for (const item of items) {
            const { product, name, category, quantity } = item;
            // Create the low stock item
            const lowStockItem = await LowStock.create({ product, name, category, quantity });
            createdItems.push(lowStockItem); 
        }

        res.status(200).json(createdItems); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { getAllLowStockItems, getOneLowStockItem, createLowStockItem }