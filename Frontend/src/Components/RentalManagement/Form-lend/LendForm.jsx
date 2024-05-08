// LendForm.jsx
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import Modal from "react-modal";
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
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Lend Form Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "auto",
          margin: "auto",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          position: "absolute",
        },
      }}
    >
      <div>
        <Typography variant="h5" gutterBottom>
          Rental Form
        </Typography>
        <TextField
          label="Item Name"
          value={selectedItemName}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Item ID"
          value={selectedItemId}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Lender Name"
          value={lenderName}
          onChange={(e) => setLenderName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Days for Lend"
          type="number"
          value={daysForLend}
          onChange={(e) => setDaysForLend(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="One Day Price"
          type="number"
          value={selectedItemOneDay}
          onChange={(e) => setOneDayPrice(e.target.value)}
          fullWidth
          disabled
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Total Pay"
          value={totalPay}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={formLendClick}>
          Lend
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginLeft: 2 }}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default LendForm;
