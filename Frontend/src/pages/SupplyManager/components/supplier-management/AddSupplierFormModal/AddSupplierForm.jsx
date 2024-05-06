import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Stack, Autocomplete } from '@mui/material';
//import ProductSelection from '../ProductSelection';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AddSupplierForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        paymentTerms: '',
        products: [],
    });

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Fetch products from Inventory collection
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/inventory/');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log('Form submitted:', formData);
        const formattedData = {
            name: formData.name,
            contact: {
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
            },
            productsSupplied: selectedProducts,
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
                        {/*<ProductSelection onSelect={handleProductSelect} />*/}

                        <Autocomplete
                            multiple
                            options={products}
                            disableCloseOnSelect
                            getOptionLabel={(product) => product.name}
                            renderOption={(props, product, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {product.name}
                                </li>
                            )}
                            value={selectedProducts}
                            onChange={(event, newValue) => setSelectedProducts(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Product" variant="outlined" />
                            )}
                        />
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
