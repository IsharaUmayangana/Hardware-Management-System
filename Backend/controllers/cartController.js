const Cart = require('../models/cartModels');
const mongoose = require('mongoose')
const Inventory = require('../models/inventoryModel');

exports.addToCart = async (req, res) => {
    try {
        const userId = '662639b6d941c0f2cc66be48'; // Assuming userId is obtained from authentication middleware
        const { cartItems } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If the user doesn't have a cart yet, create a new one
            cart = new Cart({
                user: userId,
                cartItems: cartItems
            });
        } else {
            // If the user already has a cart, update cartItems
            cartItems.forEach((item) => {
                // Check if the item already exists in the cart
                const existingItem = cart.cartItems.find((cartItem) => cartItem.product.toString() === item.product.toString());
                if (existingItem) {
                    // If the item exists, update quantity and price
                    existingItem.quantity += item.quantity;
                    existingItem.price += item.price;
                } else {
                    // If the item doesn't exist, add it to the cart
                    cart.cartItems.push(item);
                }
            });
        }

        // Save the updated cart
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

exports.clearCart = async (req, res) => {
    try {
        const userId = '662639b6d941c0f2cc66be48'; // Assuming userId is obtained from authentication middleware
        
        // Find and delete the user's cart
        await Cart.findOneAndDelete({ user: userId });

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





