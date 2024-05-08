import React, { useEffect, useState } from 'react';
import ProductDetails from './Home-ProductDetails';
import { TextField, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import homeCss from "./home.module.css";
import { useSelector } from 'react-redux';

const CustomerSideHome = () => {
    const userId = useSelector(state => state.user.userId);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 10;
    const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close

    const handleCategory = (category) => {
        setSelectedCategory(category);
        setCurPage(1); // Reset page number when category changes
        setDrawerOpen(false); // Close drawer when category is selected
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurPage(1); // Reset page number when search query changes
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/inventory');
            const json = await response.json();

            if (response.ok) {
                setProducts(json);
            }
        };

        fetchProducts();
    }, []);

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

    const lastIndex = curPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredProducts = products ? products.filter(product =>
        (!selectedCategory || product.category === selectedCategory) &&
        (product.displayItem === true) &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : [];
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const noOfPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(noOfPage + 1).keys()].slice(1);

    //pagination function
    function previousPage() {
        if (curPage !== 1) {
            setCurPage(curPage - 1)
        }
    }

    function changeCurPage(id) {
        setCurPage(id)
    }

    function nextPage() {
        if (curPage !== noOfPage) {
            setCurPage(curPage + 1)
        }
    }

    return (
        <div className={homeCss.cusHomeView}>
            <div className={homeCss.homeContainer}>
                <div className={homeCss.categoryBox}>
                    <Button onClick={() => setDrawerOpen(true)}>BROWSE CATEGORIES</Button>
                    <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <List>
                            <ListItem button key="All" onClick={() => handleCategory('')}>
                                <ListItemText primary="All" />
                            </ListItem>
                            {categories.map(category => (
                                <ListItem button key={category._id} onClick={() => handleCategory(category.name)}>
                                    <ListItemText primary={category.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </div>
                <div className={homeCss.searchBox}>
                    <TextField label="Search Product by Name" value={searchQuery} onChange={handleSearch} fullWidth />
                </div>
            </div>
            <hr />

            {Array.from({ length: Math.ceil(records.length / 5) }).map((_id, index) => (
                <div className={homeCss.rowView} key={index}>
                    {records.slice(index * 5, (index + 1) * 5).map((Inventory) => (
                        <ProductDetails key={Inventory._id} Inventory={Inventory} />
                    ))}
                </div>
            ))}


            <div className={homeCss.pagination} style={{justifyContent:"center"}}>
                <li className='page-item'>
                    <button className='page-link' onClick={previousPage}> Prev </button>
                </li>
                {
                    numbers.map((n, i) => (
                        <li className={`page-item ${curPage === n ? 'active' : ''}`} key={i}>
                            <button className='page-link' onClick={() => changeCurPage(n)}> {n} </button>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <button className='page-link' onClick={nextPage}> Next </button>
                </li>
            </div>
        </div>
    );

}

export default CustomerSideHome;
