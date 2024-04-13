import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import DeliveryViewCss from './DeliveryView.module.css';
import jsPDF from 'jspdf';

function DeliveryView() {
    const [deliveries, setDeliveries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState(null); // Track the selected delivery
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

    useEffect(() => {
        axios.get("http://localhost:8000/DeliveryView/DeliveryView")
            .then(res => {
                setDeliveries(res.data);
            })
            .catch(err => console.log(err));
    }, []);



    const downloadAsPdf = (delivery) => {
        const pdf = new jsPDF();

        // Add background color
        pdf.setFillColor("#F0F0F0");
        pdf.rect(0, 0, 210, 297, 'F'); // A4 page size

        // Add title
        pdf.setTextColor("#000000");
        pdf.setFontSize(18);
        pdf.text("Delivery Details", 105, 20, { align: 'center' });

        // Add Delivery details
        pdf.setFontSize(12);
        pdf.text(`Delivery ID: ${delivery._id}`, 10, 40);
        pdf.text(`Shipping Address: ${delivery.shippingAddress}`, 10, 50);
        pdf.text(`Selected Vehicle: ${delivery.selectedVehicle}`, 10, 60);
        pdf.text(`Delivery Cost: ${delivery.deliveryCost}`, 10, 70);
        pdf.text(`Estimate Time: ${delivery.estimateTime}`, 10, 80);

        // Add footer
        pdf.setTextColor("#808080");
        pdf.setFontSize(10);
        pdf.text("Generated by YourApp", 105, 280, { align: 'center' });

        pdf.save("Delivery-Details.pdf");
    };


    const filteredDeliveries = deliveries.filter(delivery =>
        delivery.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.selectedVehicle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {

        axios.delete(`http://localhost:8001/DeliveryDelete/${selectedDelivery}`)
            .then(() => {
                setDeliveries(deliveries.filter(delivery => delivery._id !== id));
                //console.log(selectedDelivery)
                setOpenDialog(false); // Close the dialog after deletion
                window.location.reload(); // Reload the page

            })
            .catch(err => console.log(err));

    };

    return (
        <div className={DeliveryViewCss.body}>
            <Paper className={DeliveryViewCss.paper}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Delivery ID</TableCell>
                            <TableCell>Shipping Address</TableCell>
                            <TableCell>Selected Vehicle</TableCell>
                            <TableCell>Delivery Cost</TableCell>
                            <TableCell>Estimate Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDeliveries.map(delivery => (
                            <TableRow key={delivery._id}>
                                <TableCell>{delivery._id}</TableCell>
                                <TableCell>{delivery.shippingAddress}</TableCell>
                                <TableCell>{delivery.selectedVehicle}</TableCell>
                                <TableCell>{delivery.deliveryCost}</TableCell>
                                <TableCell>{delivery.estimateTime}</TableCell>
                                <TableCell style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Link to={`/DeliveryUpdateDelete/${delivery._id}`} style={{ textDecoration: 'none', marginRight: '10px'   }}>
                                        <Button style={{height: "50px" , width: "100px"}} variant="contained" color="primary">Update</Button>
                                    </Link>
                                    <Button
                                        style={{ textDecoration: 'none', marginRight: '5px', backgroundColor: "#D875C7" , height: "50px" , width: "100px" }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setSelectedDelivery(delivery._id); // Set the selected delivery
                                            setOpenDialog(true); // Open the dialog for confirmation
                                        }} 
                                    >
                                        Delete
                                    </Button>
                                    <Button style={{ textDecoration: 'none', marginRight: '5px', backgroundColor: "#6196A6"  , height: "50px" , width: "100px"}} variant="contained" onClick={() => downloadAsPdf(delivery)}>Download as PDF</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            {/* Confirmation dialog for delete action */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this delivery?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeliveryView;
