import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import './InventoryStyles.css';

const InventoryHome = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Hand Tools');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityLimit, setQuantityLimit] = useState('');
    const [buyingPrice,setBuyingPrice] = useState('');
    const [discount,setDiscount] = useState('');
    const [description,setDescription] = useState('');
    const [displayItem, setDisplayItem] = useState(true);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    
    const handleInventoryFrom = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('buyingPrice', buyingPrice);
        formData.append('discount', discount);
        formData.append('quantity', quantity);
        formData.append('quantityLimit',quantityLimit);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('displayItem', displayItem);

        try {
            const response = await fetch('http://localhost:8000/inventory', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setName('');
            setCategory('Hand Tools');
            setPrice('');
            setQuantity('');
            setQuantityLimit('');
            setImage(null);
            setError(null);
            setBuyingPrice('');
            setDiscount('');
            setDescription('');
            setDisplayItem(true);
            console.log('new product added', data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="newItem-form" onSubmit={handleInventoryFrom}>
            <h2>Add New Product</h2>
            <hr/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Item Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        required
                    >
                        {['Hand Tools', 'Power Tools', 'Building Materials', 'Paint and Painting Supplies', 'Plumbing Supplies', 'Electrical Supplies', 'Other'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="selling Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Buying Price"
                        value={buyingPrice}
                        onChange={(e) => setBuyingPrice(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Minimum Quantity"
                        value={quantityLimit}
                        onChange={(e) => setQuantityLimit(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Discount %"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        rowsMin={3}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={displayItem} onChange={(e) => setDisplayItem(e.target.checked)} />}
                        label="Display Item"
                    />
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" type="submit">
                Add Item
            </Button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InventoryHome;
