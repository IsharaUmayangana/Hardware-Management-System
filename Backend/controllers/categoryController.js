const Category = require('../models/productCategory');
const mongoose = require('mongoose');

// get all product data
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}).sort({ createdAt: -1 });
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// add new product
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addCategory, getAllCategories };
