import React, { useState, useEffect } from 'react';
import ProductDetails from './Inventory-ProductDetails';
import Status from './Inventory-Status';
import Sidebar from "../Dashboard/Dashboard_Sidebar";
import AddProductForm from './InventoryForm';
import AddNewCategoryForm from './inventory-AddNewCategory';
import './InventoryStyles.css';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const InventoryHome = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]); 
    const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
    const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 7;

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        setCurPage(1); // Reset page number when category change
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurPage(1); // Reset page number when search query change
    };

    //Dialog functions
    const handleAddCategoryDialogOpen = () => {
        setAddCategoryDialogOpen(true);
    };

    const handleAddCategoryDialogClose = () => {
        setAddCategoryDialogOpen(false);
        setRefreshPage(true);
    };

    const handleAddProductDialogOpen = () => {
        setAddProductDialogOpen(true);
    };

    const handleAddProductDialogClose = () => {
        setAddProductDialogOpen(false);
        setRefreshPage(true);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/inventory');
            const json = await response.json();

            if(response.ok){
              setProducts(json);
            } 
        };

        fetchProducts();
    }, [refreshPage]);

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
    }, [refreshPage]);

    // Function to count product categories
    const calculateCategories = () =>{
        let totalCategories = categories.length;  
        return totalCategories;
    };

    // Function to calculate total value
    const calculateTotalValue = () => {
        if (!products) {
            return 0;
        }
        let totalValue = 0;
        products.forEach(product => {
            if (!selectedCategory || product.category === selectedCategory) {
                totalValue += product.price * product.quantity;
            }
        });
        return totalValue;
    };

    // Function to calculate total products
    const calculateTotalProducts = () => {
        if (!products) {
            return 0;
        }
        let totalProducts = 0;
        products.forEach(product => {
            if (!selectedCategory || product.category === selectedCategory) {
                totalProducts += 1;
            }
        });
        return totalProducts;
    };

    // Function to check and find out of stock
    const calculateOutOfStock = () => {
        if (!products) {
            return 0;
        }
        let outOfStock = 0;
        let lowStockProducts = []; // Array to store low stock product data
    
        products.forEach(product => {
            if (!selectedCategory || product.category === selectedCategory) {
                if (product.quantity === 0) {
                    outOfStock += 1;
                } else if (product.quantity < product.quantityLimit) {
                    lowStockProducts.push({ product: product._id, name: product.name, category: product.category, quantity: product.quantity });
                }
            }
        });
    
        // Send low stock products to the backend
        sendLowStocktoBackend(lowStockProducts);
    
        return outOfStock;
    };
    
    // Function to send low stock data to backend
    const sendLowStocktoBackend = async (lowStockProducts) => {
        try {
            if (lowStockProducts.length > 0) {
                const response = await fetch('http://localhost:8000/supply-management/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( lowStockProducts ), // Pass low stock product data to backend
                });
                if (!response.ok) {
                    if (response.status === 400) {
                        console.log('data already exist');
                    } else {
                        throw new Error('failed to send data');
                    }
                } else {
                    console.log('data send successfully');
                }
            }
        } catch (error) {
            console.error('error sending data', error);
        }
    };    

    // Pagination variables
    const lastIndex = curPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredProducts = products ? products.filter(product =>
        (!selectedCategory || product.category === selectedCategory) &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : [];
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const noOfPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(noOfPage + 1).keys()].slice(1);

    // Pagination functions
    function previousPage(){
        if(curPage !== 1) {
            setCurPage(curPage - 1)
        }
     }

     function changeCurPage(id){
        setCurPage(id)
     }

     function nextPage(){
        if(curPage !== noOfPage) {
            setCurPage(curPage + 1)
        }
     }

    return ( 
        <div className="invhome"> 
            <div className='invMain'>
                <h2>Inventory</h2>
                <Status totalCategories={calculateCategories()} totalvalue={calculateTotalValue()} totalProducts={calculateTotalProducts()} outOfStock={calculateOutOfStock()}/>
                <div className="functionBar">
                    <div className='searchbar'>
                        <TextField label="Search by Name" value={searchQuery} onChange={handleSearch} fullWidth />
                    </div>
                    <div className="categoryBox">
                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">Select Category</InputLabel>
                            <Select labelId="category-select-label" value={selectedCategory} onChange={handleCategory} fullWidth >
                                <MenuItem value="">All</MenuItem>
                                    {categories.map(category => (
                                        <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                                    ))}                            
                            </Select>
                        </FormControl>
                    </div>
                    <Button className='add-buttons' onClick={handleAddCategoryDialogOpen} variant="contained" color="primary">Add New Category</Button>
                    <Button className='add-buttons' onClick={handleAddProductDialogOpen} variant="contained" color="primary">Add New Product</Button>
                </div>
                <table className="topicline">
                    <tbody>
                        <tr>
                            <th className='topic-photo'></th>
                            <th className='topic-name'>Name</th>
                            <th className='topic-price'>Price (Rs)</th>
                            <th className='topic-disPrice'>Discount Price</th>
                            <th className='tpoic-quantity'>Quantity</th>
                        </tr>
                    </tbody>
                </table>
                {records.map((Inventory) => (
                    <ProductDetails key={Inventory._id} Inventory={Inventory}/>
                ))}
                
                {/* button to navigate to report1 */}
                <div>
                    <Button href="/report1" variant="contained" color="primary">Inventory List Report</Button>
                </div>
                <br></br>

                {/* pagination */}
                <div className='pagination'>
                    <li className='page-item'>
                        <Button className='page-link' onClick={previousPage}>Prev</Button>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${curPage === n ? 'active': ''}`} key={i}>
                                <Button className='page-link' onClick={() => changeCurPage(n)}>{n}</Button>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <Button className='page-link' onClick={nextPage}>Next</Button>
                    </li>
                </div>

                {/* Add New Category Dialog */}
                <Dialog open={addCategoryDialogOpen} onClose={handleAddCategoryDialogClose} maxWidth="100px">
                    <DialogContent>
                        <AddNewCategoryForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddCategoryDialogClose} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/* Add New Product Dialog */}
                <Dialog open={addProductDialogOpen} onClose={handleAddProductDialogClose} maxWidth="1000px" >
                    <DialogTitle>
                        <h2>Add New Product</h2>
                    </DialogTitle>
                    <DialogContent>
                        <AddProductForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddProductDialogClose} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
     );
}

export default InventoryHome;
