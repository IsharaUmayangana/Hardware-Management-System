import React, { useState } from "react";
import { TextField, Button, Grid, Modal, Paper } from "@mui/material";
import axios from "axios";

const LendForm = ({
  isOpen,
  onClose,
  onSave,
  selectedItemId,
  selectedItemName,
  selectedItemOneDay,
}) => {
  const [lenderName, setLenderName] = useState("");
  const [daysForLend, setDaysForLend] = useState("");
  const [oneDayPrice, setOneDayPrice] = useState("");

  // Calculate total pay
  const totalPay = daysForLend * selectedItemOneDay;

  const formLendClick = async () => {
    //validating
    if (!lenderName || !daysForLend) {
      // Display an error message
      alert("Please fill out all fields");
      return;
    }

    const lendingData = {
      itemId: selectedItemId,
      itemName: selectedItemName,
      lenderName,
      daysForLend,
      oneDayPrice: selectedItemOneDay,
      totalPay,
    };

    try {
      //save lending data
      const response = await axios.post(
        `http://localhost:8000/lendedItems`,
        lendingData
      );

      console.log("Lending data saved:", response.data);

      onSave(lendingData);
    } catch (error) {
      console.error("Error saving lending data:", error);
    }

    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          padding: "20px",
          minWidth: "300px",
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "white",
          margin: 0,
        }}
      >
        <h2 id="lend-form-title">Rental Form</h2>
        <form onSubmit={formLendClick}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Item Name"
                value={selectedItemName}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Item ID"
                value={selectedItemId}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Lender Name"
                value={lenderName}
                onChange={(e) => setLenderName(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Days for Lend"
                type="number"
                value={daysForLend}
                onChange={(e) => setDaysForLend(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="One Day Price"
                type="number"
                value={selectedItemOneDay}
                onChange={(e) => setOneDayPrice(e.target.value)}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total Pay"
                value={totalPay}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" color="primary" type="submit">
              Lend
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginTop: "2px" }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LendForm;
