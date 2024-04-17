import React,{ useEffect, useState } from "react";
import { useParams,Link, useNavigate   } from "react-router-dom";


const HomeSelectedItem = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const Url = `http://localhost:8000/inventory/${id}`;

    setLoading(true);

    // Fetch inventory details
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  
const handleAddToCart = async () => {
  try {
    const response = await fetch('http://localhost:8000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: [{
          product: product._id,
          quantity: 1, 
          price: product.price,
        }],
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    alert('Product added to cart successfully');
    
  } catch (error) {
    console.error('Error adding item to cart:', error);
    alert('Failed to add item to cart');
  }
};

  return (
    <div className="selectedProduct">
      {loading && <p>Loading...</p>}
      {!loading && !product && <p>No product found</p>}
      {!loading && product && (

        <div className="detailsBox">
          <div className="productImage">
          
          <img src={`http://localhost:8000/images/${product.img_URL}`} alt={product.name} />
          
          </div>
    
        <div className="productDetails">
          <p className="productName">Product Name : {product.name}</p>
          <p className="unitPrice">Unit Price : {product.price}</p>
          <p className="availableAmount">Available Amount : {product.quantity}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <Link to="/cart">
              <button>View Cart</button>
            </Link>
        </div>
      </div>
      )}
        

    </div>
  );
};

export default HomeSelectedItem;
