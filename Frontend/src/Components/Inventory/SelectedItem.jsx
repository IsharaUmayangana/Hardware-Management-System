import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarCode from './Inventory-Barcode';
import './InventoryStyles.css'
import { Margin } from "@mui/icons-material";

const SelectedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //handleDelete function
  const handleDelete = async () => {
    // Confirm message
    const userConfirmedDelete = window.confirm("Are you sure to delete this item?");

    if (userConfirmedDelete) {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        navigate('/inventory');
      } else {
        const json = await response.json();
        console.error("Error deleting product:", json.error);
      }
    }
  }

  //handleEdit function
  const handleEdit = () => {
    navigate(`/editItem/${id}`);
  }

  useEffect(() => {
    const Url = `http://localhost:8000/inventory/${id}`;

    setLoading(true);

    // Fetch inventory details
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="selectedProduct" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && !product && <p>No product found</p>}
        {!loading && product && (

          <div className="detailsBox">
            <h2>{product.name}
            </h2><br></br>
            <div style={{ display: "flex"}}>
              <div style={{ marginRight:"50px"}}>
                <img src={`http://localhost:8000/images/`+product.img_URL} alt="Product" style={{ maxWidth: "500px" ,height:"300px"}}/>
                <p style={{ maxWidth: "500px" ,height:"200px"}}>Description : {product.description}</p>
              </div>
              <div>
              <table style={{margin:"10px 0px"}}>
                <tr>
                  <td>Product Id:</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>Product Category:</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>Unit Selling Price:</td>
                  <td>{product.price}</td>
                </tr>
                <tr>
                  <td>Discount :</td>
                  <td>{product.discount}%</td>
                </tr>
                <tr>
                  <td>Discounted Price:</td>
                  <td>{product.price-(product.price*(product.discount/100))}</td>
                </tr>
                <tr>
                  <td>Unit Buying Price:</td>
                  <td>{product.buyingPrice}</td>
                </tr>
                <tr>
                  <td>Profit:</td>
                  <td>{product.price-(product.price*(product.discount/100)) - product.buyingPrice}</td>
                </tr>
                <tr>
                  <td>Available Amount:</td>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <td>Quantity Limit:</td>
                  <td>{product.quantityLimit}</td>
                </tr>
                <tr>
                  <td>Total Value of product:</td>
                  <td>{product.price * product.quantity}</td>
                </tr>
                <tr>
                  <td>Total Profit of product:</td>
                  <td>{(product.price-(product.price*(product.discount/100)) - product.buyingPrice) * product.quantity}</td>
                </tr>
                <tr>
                  <td>Display on home page:</td>
                  <td>{product.displayItem === true ? "Yes" : "No"}</td>
                </tr>
            </table>
                <BarCode id={id} />
              </div>
            </div> 
          </div>
        )}

        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default SelectedItem;
