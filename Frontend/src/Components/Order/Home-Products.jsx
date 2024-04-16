import React, { useEffect, useState } from 'react';
import ProductDetails from './Home-ProductDetails';

const CustomerSideHome = () => {
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 15;
    

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        setCurPage(1); 
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

    

    const lastIndex = curPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredProducts = products ? products.filter(product => !selectedCategory || product.category === selectedCategory) : [];
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const noOfPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(noOfPage + 1).keys()].slice(1);

    //pagination function
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

        <div className="cusHomeView">
            <div className="searchbar">
                <h2>Our Products</h2>
                <div className="searchbox">
                    <select onChange={handleCategory} value={selectedCategory || ''} >
                        <option value=""> All </option>
                        <option value="Hand Tools"> Hand Tools </option>
                        <option value="Power Tools"> Power Tools </option>
                        <option value="Building Materials"> Building Materials </option>
                        <option value="Paint and Painting Supplies"> Paint and Painting Supplies </option>
                        <option value="Plumbing Supplies"> Plumbing Supplies </option>
                        <option value="Electrical Supplies"> Electrical Supplies </option>
                        <option value="Other"> Other </option>
                    </select>
                </div>
            </div>
            <hr/>

            {Array.from({ length: Math.ceil(records.length / 5) }).map((_id, index) => (
              <div className="rowView" key={index}>
                {records.slice(index * 5, (index + 1) * 5).map((Inventory) => (
                  <ProductDetails  key={Inventory._id} Inventory={Inventory} />
                ))}
              </div>
            ))}

            
            <div className='pagination'>
                <li className='page-item'>
                    <button className='page-link' onClick={previousPage}> Prev </button>
                </li>
                {
                    numbers.map((n, i) => (
                        <li className={`page-item ${curPage === n ? 'active': ''}`} key={i}>
                            <button className='page-link' onClick={() => changeCurPage(n)}> {n} </button>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <button className='page-link'onClick={nextPage}> Next </button>
                </li>
                
            </div>
            
        </div>
        
        

     );
     

}

export default CustomerSideHome;
