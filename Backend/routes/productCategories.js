const express = require('express')

const { addCategory, getAllCategories } = require('../controllers/categoryController')

const router = express.Router()

// GET all products
router.get('/', getAllCategories)

// POST a new feedback
router.post('/', addCategory)


module.exports = router