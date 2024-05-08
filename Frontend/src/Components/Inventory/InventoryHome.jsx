import { useState, useEffect } from 'react';
import ProductDetails from './Inventory-ProductDetails';
import Status from './Inventory-Status';
import Sidebar from "../Dashboard/Dashboard_Sidebar";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const InventoryHome = () => {
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 5;

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        setCurPage(1); // Reset page number when category change
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurPage(1); // Reset page number when search query change
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
    }, []);

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
        <div className="home" style={{ display: 'flex', flexDirection: 'row',minHeight: '100vh'}}> 
        <div style={{ width: '20%'}}><Sidebar/></div>
        <div style={{ width: '70%',margin: '5px 60px'}} >
            <h2>Inventory</h2>
            <br></br>
            <Status totalvalue={calculateTotalValue()} totalProducts={calculateTotalProducts()} outOfStock={calculateOutOfStock()}/>
            <div className="functionBar">
                <div>
                    <TextField label="Search by Name" value={searchQuery} onChange={handleSearch} fullWidth />
                </div>
                <div className="categoryBox">
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Select Category</InputLabel>
                        <Select labelId="category-select-label" value={selectedCategory} onChange={handleCategory} fullWidth >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Hand Tools">Hand Tools</MenuItem>
                            <MenuItem value="Power Tools">Power Tools</MenuItem>
                            <MenuItem value="Building Materials">Building Materials</MenuItem>
                            <MenuItem value="Paint and Painting Supplies">Paint and Painting Supplies</MenuItem>
                            <MenuItem value="Plumbing Supplies">Plumbing Supplies</MenuItem>
                            <MenuItem value="Electrical Supplies">Electrical Supplies</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>                             
                        </Select>
                    </FormControl>
                </div>
                <Button href="/addnewItem" variant="contained" color="primary">Add New Product</Button>
            </div>
            <div className="topicline">
                <table>
                    <th className='topic-photo'></th>
                    <th className='topic-name'>Name</th>
                    <th className='topic-price'>Price (Rs)</th>
                    <th className='topic-disPrice'>Discount Price</th>
                    <th className='tpoic-quantity'>Quantity</th>
                </table>
            </div>
            {records.map((Inventory) => (
                <ProductDetails key={Inventory._id} Inventory={Inventory}/>
            ))}
            <br></br>
            <div>
                <Button href="/report1" variant="contained" color="primary">Inventory List Report</Button>
            </div>
            <br></br>
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
        </div>
        </div>
     );
}

export default InventoryHome;
