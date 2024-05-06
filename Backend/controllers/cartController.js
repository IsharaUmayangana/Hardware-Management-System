const Cart = require('../models/cartModels');
const mongoose = require('mongoose')
const Inventory = require('../models/inventoryModel');



// exports.addToCart = async (req, res) => {
//     try {
//         const { cartItems } = req.body;

//         // Check if requested quantities are available in inventory
//         for (const item of cartItems) {
//             const product = await Inventory.findById(item.product);
//             if (!product) {
//                 return res.status(404).json({ error: 'Product not found' });
//             }
//             if (product.quantity < item.quantity) {
//                 return res.status(400).json({ error: 'Insufficient quantity in inventory' });
//             }
//             // Update inventory quantity
//             product.quantity -= item.quantity; // Reduce inventory quantity
//             await product.save(); // Save the updated inventory
//         }

//         // Create a new cart with the received items
//         const cart = new Cart({
//             cartItems: cartItems
//         });

//         // Save the cart
//         const updatedCart = await cart.save();

//         res.status(201).json({ cart: updatedCart });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.addToCart = async (req, res) => {
//     try {
//          //const userId = req.userId; // Assuming userId is obtained from authentication middleware
//         const userId = '662639b6d941c0f2cc66be48';
//         const { cartItems } = req.body;

//         // Check if requested quantities are available in inventory
//         for (const item of cartItems) {
//             const product = await Inventory.findById(item.product);
//             if (!product) {
//                 return res.status(404).json({ error: 'Product not found' });
//             }
//             if (product.quantity < item.quantity) {
//                 return res.status(400).json({ error: 'Insufficient quantity in inventory' });
//             }
//             // Update inventory quantity
//             product.quantity -= item.quantity; // Reduce inventory quantity
//             await product.save(); // Save the updated inventory
//         }

//         // Create a new cart associated with the user
//         const cart = new Cart({
//             user: userId,
//             cartItems: cartItems
//         });

//         // Save the cart
//         const updatedCart = await cart.save();

//         res.status(201).json({ cart: updatedCart });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

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

// exports.getCartItemCount = async (req, res) => {
//     try {
//         // Find all carts and count the total number of items
//         const carts = await Cart.find();
//         let totalItems = 0;
//         carts.forEach(cart => {

//             cart.cartItems.forEach(item => {
//                 totalItems += item.quantity;
//             });
//         });
//         res.status(200).json({ totalItems });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getCartItemCount = async (req, res) => {
//     try {
//       // Find all carts
//       const carts = await Cart.find();
  
//       // Reduce the total number of items using reduce instead of forEach loop
//       const totalItems = carts.reduce((acc, cart) => {
//         return acc + cart.cartItems.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
//       }, 0);
  
//       res.status(200).json({ totalItems });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

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


// exports.getCartItemCount = async (req, res) => {
//     try {
//         const userId = '662639b6d941c0f2cc66be48'; // Assuming userId is obtained from authentication middleware

//         // Find the user's cart
//         const cart = await Cart.findOne({ user: userId });

//         if (!cart) {
//             // If the cart doesn't exist, return 0 items
//             return res.status(200).json({ totalItems: 0 });
//         }

//         // Calculate the total number of items in the cart
//         const totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);

//         res.status(200).json({ totalItems });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };