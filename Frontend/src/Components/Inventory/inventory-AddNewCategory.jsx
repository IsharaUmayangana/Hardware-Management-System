import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState('');

  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:8000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      setCategoryName('');
      setError('');
      alert('Category added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8000/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    fetchCategories();
  }, []);

  return (
    <div className='category-page-main' style={{ display: 'flex' }}>
      <div className='newCategory-form' style={{ marginRight: '20px' }}>
        <h2>Add New Category</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Add Category
          </Button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <div className='existing-category-list'>
        <br/>
        <h2>Existing Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default AddCategoryForm;
