import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const AddNewItemForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    itemName: "",
    description: "",
    quantity: "",
    oneDayPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // add new item
      await axios.post(`http://localhost:8000/items`, formData);
      console.log("New item added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="imageUrl"
              label="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="itemName"
              label="Item Name"
              value={formData.itemName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="quantity"
              label="Available Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="oneDayPrice"
              label="One Day Price"
              type="number"
              value={formData.oneDayPrice}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" type="submit">
            Add to List
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewItemForm;
