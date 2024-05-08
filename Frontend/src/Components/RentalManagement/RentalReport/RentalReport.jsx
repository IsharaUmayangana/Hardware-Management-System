import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  CardActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function RentalReport() {
  document.title = "Rental Report";
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/rentalReport`);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching rental report data:", error);
    }
  };

  const calculateTotalTimesHired = (itemName) => {
    return reportData.filter((item) => item.itemName === itemName).length;
  };

  const calculateTotalTimePeriod = (itemName) => {
    return reportData
      .filter((item) => item.itemName === itemName)
      .reduce((total, item) => total + item.daysForLend, 0);
  };

  const calculateTotalRevenue = (itemName) => {
    return reportData
      .filter((item) => item.itemName === itemName)
      .reduce((total, item) => total + item.totalPay, 0);
  };

  const uniqueItemNames = [...new Set(reportData.map((item) => item.itemName))];

  const mostlyHiringItems = uniqueItemNames.filter(
    (itemName) => calculateTotalTimesHired(itemName) > 4
  );

  const leastHiringItems = uniqueItemNames.filter(
    (itemName) => calculateTotalTimesHired(itemName) < 4
  );

  // Calculate total income
  const totalIncome = reportData.reduce(
    (total, item) => total + item.totalPay,
    0
  );

  const printPage = () => {
    window.print();
  };

  const goItemList = () => {
    window.location.href = "/rentalService";
  };

  return (
    <div>
      <h1>Rental Report</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Item Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                No of Times Hired
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Total Time Period (Days)
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Total Revenue
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueItemNames.map((itemName, index) => (
              <TableRow key={index}>
                <TableCell>{itemName}</TableCell>
                <TableCell>{calculateTotalTimesHired(itemName)}</TableCell>
                <TableCell>{calculateTotalTimePeriod(itemName)}</TableCell>
                <TableCell>{calculateTotalRevenue(itemName)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Mostly Hiring Items
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Item Name</TableCell>
              <TableCell colSpan={1}>No of Times Hired</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mostlyHiringItems.map((itemName, index) => (
              <TableRow key={index}>
                <TableCell colSpan={3}>{itemName}</TableCell>
                <TableCell colSpan={1}>
                  {calculateTotalTimesHired(itemName)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Least Hiring Items
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Item Name</TableCell>
              <TableCell colSpan={1}>No of Times Hired</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leastHiringItems.map((itemName, index) => (
              <TableRow key={index}>
                <TableCell colSpan={3}>{itemName}</TableCell>
                <TableCell colSpan={1}>
                  {calculateTotalTimesHired(itemName)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Total Income - Rs. {totalIncome}.00</h2>
      <CardActions>
        <Button variant="contained" color="primary" onClick={goItemList}>
          Go to Item List
        </Button>

        <Button variant="contained" onClick={printPage}>
          Print Report
        </Button>
      </CardActions>
    </div>
  );
}

export default RentalReport;
