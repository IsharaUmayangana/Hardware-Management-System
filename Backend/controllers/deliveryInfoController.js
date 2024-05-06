const DeliveryInfo = require('../models/deliveryInfoModel')

exports.addDeliveryInfo = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, address, city, totalPrice } = req.body;

        // Create a new delivery info object
        const deliveryInfo = new DeliveryInfo({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            totalPrice
        });

        // Save the delivery info
        const savedDeliveryInfo = await deliveryInfo.save();

        res.status(201).json({ deliveryInfo: savedDeliveryInfo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};