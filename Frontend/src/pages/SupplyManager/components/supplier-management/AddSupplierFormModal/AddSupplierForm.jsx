import React from 'react';
import { Modal, Box, TextField, Button, Stack } from '@mui/material';

function AddSupplierForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        paymentTerms: '',
        products: [{ name: '', category: '' }],
    });

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        if (name === 'productName' || name === 'productCategory') {
            const newProducts = [...formData.products];
            newProducts[index] = { ...newProducts[index], [name]: value };
            setFormData({ ...formData, products: newProducts });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleProductsChange = (event, index) => {
        const { name, value } = event.target;
        const newProducts = [...formData.products];
        newProducts[index] = { ...newProducts[index], [name]: value };
        setFormData({ ...formData, products: newProducts });

    }

    const handleAddProduct = () => {
        setFormData({
            ...formData,
            products: [...formData.products, { name: '', category: '' }],
        });
    };

    const handleRemoveProduct = (index) => {
        const newProducts = formData.products.filter((_, i) => i !== index);
        setFormData({ ...formData, products: newProducts });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
        const formattedData = {
            name: formData.name,
            contact: {
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
            },
            productsSupplied: formData.products,
            paymentTerms: formData.paymentTerms,
        };
        await onSubmit(formattedData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: 400,
                    maxWidth: 500,
                    overflowY: 'auto', 
                    maxHeight: '95vh', 
                    zIndex: 9999, 
                }}
            >
                <h2 id="add-supplier-modal-title">Add Supplier</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Payment Terms"
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        {formData.products.map((product, index) => (
                            <Stack key={index} direction="row" spacing={2}>
                                <TextField
                                    label="Product Name"
                                    name="name"
                                    value={product.name}
                                    onChange={(e) => handleProductsChange(e, index)}
                                    fullWidth
                                />
                                <TextField
                                    label="Product Category"
                                    name="category"
                                    value={product.category}
                                    onChange={(e) => handleProductsChange(e, index)}
                                    fullWidth
                                />
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleRemoveProduct(index)}
                                >
                                    Remove Product
                                </Button>
                            </Stack>
                        ))}
                        <Button
                            type="button"
                            variant="contained"
                            color="info"
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add Supplier
                        </Button>

                        <Button variant="contained" color="error" onClick={onClose}>
                            Cancel
                        </Button>
                        
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}

export default AddSupplierForm;
