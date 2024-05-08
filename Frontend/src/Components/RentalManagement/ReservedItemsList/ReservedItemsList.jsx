import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, Modal } from "@mui/material";

const ReservedItemsList = () => {
  document.title = "Reserved Items";
  const [reservedItems, setReservedItems] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showRemoveConfirmationModal, setShowRemoveConfirmationModal] =
    useState(false);

  useEffect(() => {
    const fetchReservedItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/reservedItems");
        setReservedItems(response.data);
      } catch (error) {
        console.error("Error fetching reserved items:", error);
      }
    };

    fetchReservedItems();
  }, []);

  const handleRent = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmationModal(true);
  };

  const handleConfirmRent = async () => {
    try {
      const selectedItem = reservedItems.find(
        (item) => item._id === selectedItemId
      );

      if (!selectedItem) {
        console.error("Selected item not found");
        return;
      }

      const newRentedItem = {
        itemId: selectedItem.itemId,
        itemName: selectedItem.itemName,
        lenderName: selectedItem.buyerName,
        daysForLend: selectedItem.daysToRent,
        oneDayPrice: selectedItem.oneDayPrice,
        totalPay: selectedItem.totalPay,
      };

      await axios.post("http://localhost:8000/lendedItems", newRentedItem);
      await axios.delete(
        `http://localhost:8000/reservedItems/${selectedItemId}`
      );

      setReservedItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedItemId)
      );

      setShowConfirmationModal(false);

      console.log("Rented item added:", newRentedItem);
      console.log("Selected item removed from reserved items:", selectedItemId);
    } catch (error) {
      console.error("Error confirming rent:", error);
    }
  };

  const handleCancelRent = () => {
    setShowConfirmationModal(false);
  };

  const handleRemove = (itemId) => {
    setSelectedItemId(itemId);
    setShowRemoveConfirmationModal(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/reservedItems/${selectedItemId}`
      );
      setReservedItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedItemId)
      );
      setShowRemoveConfirmationModal(false);
    } catch (error) {
      console.error("Error removing reserved item:", error);
    }
  };

  const handleCancelRemove = () => {
    setShowRemoveConfirmationModal(false);
  };

  return (
    <>
      <h2>Reserved Items List</h2>
      {reservedItems.map((item) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "auto",
            width: "70%",
          }}
        >
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              marginBottom: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Item Name: {item.itemName}
              </Typography>
              <Typography variant="body1">Item ID: {item.itemId}</Typography>
              <Typography variant="body1">
                Buyer Name: {item.buyerName}
              </Typography>
              <Typography variant="body1">
                Contact No: {item.contactNo}
              </Typography>
              <Typography variant="body1">
                Days to Rent: {item.daysToRent}
              </Typography>
              <Typography variant="body1">
                One Day Price: {item.oneDayPrice}
              </Typography>
              <Typography variant="body1">
                Total Price: {item.totalPay}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRent(item._id)}
                style={{
                  backgroundColor: "black",
                  width: "48%",
                  margin: "2px",
                }}
              >
                Rent
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemove(item._id)}
                style={{
                  backgroundColor: "",
                  width: "50%",
                  margin: "2px",
                }}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}

      <Modal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        aria-labelledby="rent-confirmation-modal"
        aria-describedby="rent-confirmation-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            minWidth: "300px",
          }}
        >
          <h2 id="rent-confirmation-modal">Rent Confirmation</h2>
          <p id="rent-confirmation-description">
            Are you sure you want to rent this item?
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmRent}
            style={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelRent}
          >
            No
          </Button>
        </div>
      </Modal>

      <Modal
        open={showRemoveConfirmationModal}
        onClose={() => setShowRemoveConfirmationModal(false)}
        aria-labelledby="remove-confirmation-modal"
        aria-describedby="remove-confirmation-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            minWidth: "300px",
          }}
        >
          <h2 id="remove-confirmation-modal">Remove Confirmation</h2>
          <p id="remove-confirmation-description">
            Are you sure you want to remove this item?
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmRemove}
            style={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelRemove}
          >
            No
          </Button>
        </div>
      </Modal>

      <Link to="/rentalService">
        <Button variant="contained" color="primary">
          Go to Item List
        </Button>
      </Link>
    </>
  );
};

export default ReservedItemsList;
