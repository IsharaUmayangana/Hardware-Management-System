<<<<<<< HEAD
const Supplier = require('../../models/SupplyManagementModels/supplierModel');
const mongoose = require('mongoose')

// get all Suppliers
const getAllSuppliers = async (req, res) => {

    try {
        const Suppliers = await Supplier.find({}).sort({ createdAt: -1 });

        res.status(200).json(Suppliers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// get one supplier

const getOneSupplier = async (req, res) => {

    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid supplier id' });
        }
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ error: 'Cannot find the supplier' });
        }
        res.status(200).json(supplier);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create a new supplier

const createSupplier = async (req, res) => {
    const { name, contact, productsSupplied, paymentTerms } = req.body;

    try {

        const newSupplier = await Supplier.create({ name, contact, productsSupplied, paymentTerms });
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// update the supplier

const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, contact, productsSupplied, paymentTerms } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid suppplier id' });
    }

    try {

        const updatedSupplier = await Supplier.findByIdAndUpdate(id, {
            name,
            contact,
            productsSupplied,
            paymentTerms,
        }, { new: true });

        if (!updatedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }


        res.status(200).json(updatedSupplier);
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}


// delete a supplier

const deleteSupplier = async (req, res) => {

    const { id } = req.params;

    try {

        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}




=======
const Supplier = require ('../../models/SupplyManagementModels/supplierModel');
const mongoose = require ('mongoose')

// get all Suppliers
const getAllSuppliers = async (req, res) => {
    
    const Suppliers = await Supplier.find({}).sort({createdAt: -1})

    res.status(200).json(Suppliers)
}


// get one supplier

const getOneSupplier = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the supplier'})
    }
    const supplier = await Supplier.findById(id)

    if(!supplier){
        return res.status(404).json({error: 'Cannot find the supplier'})
    }
    res.status(200).json(supplier) 
}

// create a new supplier

const createSupplier = async (req, res) => {
    const { name, contact, productsSupplied, paymentTerms, notes } = req.body;

    try {
    
        const newSupplier = await Supplier.create({name, contact, productsSupplied, paymentTerms, notes});
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// update the supplier

const updateSupplier = async (req, res) => {
    const { id } = req.params; 
    const { name, contact, productsSupplied, paymentTerms, notes } = req.body; 

    try {
        
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, {
            name,
            contact,
            productsSupplied,
            paymentTerms,
            notes
        }, { new: true });

        if (!updatedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        
        res.status(200).json(updatedSupplier);
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
}


// delete a supplier

const deleteSupplier = async (req, res) => {

    const { id } = req.params; 

    try {
        
        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });

    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
}




>>>>>>> 976cc275b49c8a4102df995a5812636b46677d9b
module.exports = { getAllSuppliers, getOneSupplier, createSupplier, updateSupplier, deleteSupplier }