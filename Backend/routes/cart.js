const express = require('express');

const { addToCart,getCartById,getAllCarts,updateCart,deleteCartItem  } = require('../controllers/cartController');
const { model } = require('mongoose');
const router = express.Router();

router.post('/',addToCart);

// GET cart by ID
router.get('/:cartId', getCartById);

router.get('/', getAllCarts); // Route to fetch all carts

router.patch('/update', updateCart);

router.delete('/:cartId/remove/:productId', deleteCartItem);
module.exports = router;
