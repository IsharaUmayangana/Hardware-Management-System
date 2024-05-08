import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import './InventoryStyles.css';

const EditInventoryItems = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityLimit, setQuantityLimit] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [displayItem, setDisplayItem] = useState(false); // Initial value set to false
  const [image, setImage] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/inventory/${id}`);
        const data = await response.json();
        setProduct(data);
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        setQuantity(data.quantity);
        setQuantityLimit(data.quantityLimit);
        setBuyingPrice(data.buyingPrice);
        setDiscount(data.discount);
        setDescription(data.description);
        setDisplayItem(data.displayItem);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInventoryEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('quantityLimit', quantityLimit);
    formData.append('buyingPrice', buyingPrice);
    formData.append('discount', discount);
    formData.append('description', description);
    formData.append('displayItem', displayItem);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        window.alert('Product Detail successfully updated :-)');
        console.log('updated');
        navigate(`/selectedItem/${id}`);
      } else {
        window.alert('Product Detail not updated :-(');
        console.log('Data not updated');
        navigate(`/inventory`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again.");
    }
  };

  return (
    <div className="selectedProduct">
      {loading && <p>Loading...</p>}
      {!loading && !product && <p>No product found</p>}
      {!loading && product && (
        <form className="editItem-form" onSubmit={handleInventoryEdit}>
          <h2>Edit Item</h2>
          <hr />

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
                label="Unit Price"
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
                label="Quantity Limit"
                value={quantityLimit}
                onChange={(e) => setQuantityLimit(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                label="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                rowsMin={3}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={displayItem} onChange={(e) => setDisplayItem(e.target.checked)} />}
                label="Display Item on Homepage"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </Grid>
          </Grid>

          <br />

          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>

          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default EditInventoryItems;
