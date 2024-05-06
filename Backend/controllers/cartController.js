const Cart = require('../models/cartModels');
const mongoose = require('mongoose')
const Inventory = require('../models/inventoryModel');
exports.addToCart = async(req,res) =>{
    
    try {
        const { cartItems } = req.body;

        

        // Create a new cart with the received items
        const cart = new Cart({
            cartItems: cartItems
        });

        // Save the cart
        const updatedCart = await cart.save();

        res.status(201).json({ cart: updatedCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    

 };

 exports.addToCart = async (req, res) => {
    try {
        const { cartItems } = req.body;

        // Check if requested quantities are available in inventory
        for (const item of cartItems) {
            const product = await Inventory.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ error: 'Insufficient quantity in inventory' });
            }
        }

        // Create a new cart with the received items
        const cart = new Cart({
            cartItems: cartItems
        });

        // Save the cart
        const updatedCart = await cart.save();

        res.status(201).json({ cart: updatedCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const { cartId } = req.params;

        // Find the cart by ID
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.getAllCarts = async (req, res) => {
    try {
        // Find all carts and populate the product name
        const carts = await Cart.find().populate({
            path: 'cartItems.product',
            model: 'newInventory',
            //select: 'name'
        });

        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const updatedCarts = req.body.carts;

        // Iterate through updated carts and update each in the database
        for (const updatedCart of updatedCarts) {
            const cartId = updatedCart._id;
            const cartItems = updatedCart.cartItems;
            
            // Find the cart by ID and update its cartItems
            await Cart.findByIdAndUpdate(cartId, { cartItems }, { new: true });
        }

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.deleteCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;

        // Delete the cart by its ID
        const deletedCart = await Cart.findByIdAndDelete(cartId);

        if (!deletedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.deleteCartItem = async (req, res) => {
//     try {
//         const { cartId, productId } = req.params;

//         // Find the cart by ID and remove the item with the given product ID
//         const cart = await Cart.findByIdAndUpdate(
//             cartId,
//             { $pull: { cartItems: { product: productId } } },
//             { new: true }
//         );

//         if (!cart) {
//             return res.status(404).json({ error: 'Cart not found' });
//         }

//         res.status(200).json({ message: 'Cart item deleted successfully', cart });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };



    