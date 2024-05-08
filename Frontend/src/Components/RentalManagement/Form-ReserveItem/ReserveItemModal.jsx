import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

const ReserveItemModal = ({ isOpen, onClose, item }) => {
  const [reservationData, setReservationData] = useState({
    itemName: item.itemName,
    itemId: item._id,
    buyerName: "",
    contactNo: "",
    oneDayPrice: item.oneDayPrice,
    daysToRent: 1,
    totalPay: item.oneDayPrice,
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newTotalPay = reservationData.totalPay;

    if (name === "oneDayPrice" || name === "daysToRent") {
      const oneDayPrice =
        name === "oneDayPrice" ? value : reservationData.oneDayPrice;
      const daysToRent =
        name === "daysToRent" ? value : reservationData.daysToRent;
      newTotalPay = oneDayPrice * daysToRent;
    }

    setReservationData({
      ...reservationData,
      [name]: value,
      totalPay: newTotalPay,
    });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setReservationData({ ...reservationData, agreed: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reservationData.agreed) {
      alert("Please agree to hire the item within 24 hours.");
      return;
    }

    try {
      // Send reservation data
      const response = await axios.post(
        "http://localhost:8000/reservedItems",
        reservationData
      );
      console.log("Reservation response:", response.data);

      // Reset the form after submission
      setReservationData({
        itemName: item.itemName,
        itemId: item._id,
        buyerName: "",
        contactNo: "",
        oneDayPrice: item.oneDayPrice,
        daysToRent: 1,
        totalPay: item.oneDayPrice,
        agreed: false,
      });

      onClose();
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          minWidth: "300px",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <h2>Reserve Item</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="itemName"
                label="Item Name"
                value={reservationData.itemName}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="itemId"
                label="Item ID"
                value={reservationData.itemId}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="buyerName"
                label="Buyer Name"
                value={reservationData.buyerName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactNo"
                label="Contact Number"
                value={reservationData.contactNo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="oneDayPrice"
                label="One Day Price"
                value={reservationData.oneDayPrice}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="daysToRent"
                label="Days to Rent"
                type="number"
                value={reservationData.daysToRent}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="totalPay"
                label="Total Pay"
                value={reservationData.totalPay}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reservationData.agreed}
                    onChange={handleCheckboxChange}
                    name="agreed"
                    color="primary"
                  />
                }
                label="I agree to hire the item within 24 hours."
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!reservationData.agreed}
            >
              Reserve
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReserveItemModal;
