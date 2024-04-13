const express = require('express');
const router = express.Router();
const DeliveryModel = require('../../../models/DeliveryManagementModels/deliveryModel'); // Import your Delivery model here

// Route to handle updating and deleting a delivery by ID
router.put('/DeliveryUpdateDelete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Find the delivery by ID and update its details
        const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
            id,
            {
                shippingAddress: req.body.shippingAddress,
                selectVehicle: req.body.selectVehicle,
                deliveryCost: req.body.deliveryCost,
                estimateTime: req.body.estimateTime
            },
            { new: true } // To return the updated document
        );

        // Send the updated delivery as response
        res.json(updatedDelivery);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
