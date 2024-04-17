import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarCode from './Inventory-Barcode';
import formatNumber from 'format-number';
import './InventoryStyles.css'
import EditForm from './EditInventoryItems';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const SelectedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Define options for formatting
  const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

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

  //Dialog functions
  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  //handle barcode Print function
  const handlePrint = () => {
    const printContents = document.querySelector('.barcode-section').innerHTML;
    const originalContents = document.body.innerHTML;

    // get the number of barcode copies from the user
    const input = parseInt(prompt("Enter the number of copies:", "1"));

    // check if the user canceled or entered a non-numeric value
    if (input === null || isNaN(parseInt(input))) {
      return; 
    }

    const numberOfCopies = parseInt(input);

    // generate multiple copies 
    let allPrintContents = "";
    for (let i = 0; i < numberOfCopies; i++) {
      allPrintContents += printContents;
    }

    // replace the body content 
    document.body.innerHTML = allPrintContents;
    window.print();
    
    // restore the original body content
    document.body.innerHTML = originalContents;
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
          <div className="detailsBox" style={{color: 'black'}}>
            <h2>{product.name}</h2><br></br>
            <span><a href='http://localhost:5173/inventory' className="back-button">Back</a></span>

            <div style={{ display: "flex"}}>
              <div style={{ marginRight:"50px"}}>
                <img src={`http://localhost:8000/images/`+ product.img_URL} alt="Product" style={{ maxWidth: "500px" ,height:"300px"}}/>
                <p style={{ maxWidth: "500px" ,height:"200px"}}>Description : {product.description}</p>
              </div>
              <div>
                <table style={{margin:"10px 0px"}}>
                  <tbody>
                    <tr>
                      <td>Product Id:</td>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <td>Product Category:</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td>Price Before Discount:</td>
                      <td>{product.pricebeforeDiscount && formatNumber(options)(parseFloat(product.pricebeforeDiscount))}</td>
                    </tr>
                    <tr>
                      <td>Discount :</td>
                      <td>{product.discount}%</td>
                    </tr>
                    <tr>
                      <td>Price After Discount:</td>
                      <td>{product.price && formatNumber(options)(parseFloat(product.price))}</td>
                    </tr>
                    <tr>
                      <td>Unit Buying Price:</td>
                      <td>{product.buyingPrice && formatNumber(options)(parseFloat(product.buyingPrice))}</td>
                    </tr>
                    <tr>
                      <td>Profit:</td>
                      <td>{product.price && product.buyingPrice && formatNumber(options)(parseFloat(product.price) - parseFloat(product.buyingPrice))}</td>
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
                      <td>Total Value of Available Quantity:</td>
                      <td>{product.price && product.quantity && formatNumber(options)(parseFloat(product.price) * parseFloat(product.quantity))}</td>
                    </tr>
                    <tr>
                      <td>Display on home page:</td>
                      <td>{product.displayItem === true ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="barcode-section">
                  <BarCode id={id} />
                </div>
                <button onClick={handlePrint}>Print this barcode</button>
              </div>
            </div> 
          </div>
        )}

        <button onClick={handleEditDialogOpen}>Edit</button>
        <button onClick={handleDelete}>Delete</button>

        {/* Edit Product Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="1000px">
          <DialogTitle><h2>Edit Product</h2></DialogTitle>
          <DialogContent>  
            {product && <EditForm product={product} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SelectedItem;
