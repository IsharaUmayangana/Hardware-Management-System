import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Sales() {
    const [sales, setSales] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        item: '',
        unitPrice: '',
        quantity: '',
    });

    const [updateFormData, setUpdateFormData] = useState({
        _id: '',
        date: '',
        time: '',
        item: '',
        unitPrice: '',
        quantity: '',
    });

    const handleUpdateSale = (sale) => {
        setOpenUpdateDialog(true);
        setUpdateFormData({
            _id: sale._id,
            date: sale.date,
            time: sale.time,
            item: sale.item,
            unitPrice: sale.unitPrice,
            quantity: sale.quantity,
        });
    };

    const handleAddDialogOpen = () => {
        setOpenAddDialog(true);
    };

    const handleCreateSale = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleDialogClose = () => {
        setOpenAddDialog(false);
        setOpenUpdateDialog(false);
        setFormData({
            date: '',
            time: '',
            item: '',
            unitPrice: '',
            quantity: '',
        });
    };

    const handleSubmit = async () => {
        try {
            const result = await authAxios.post(`${apiUrl}/sale/`, formData);
            if (result) {
                toast.success('Sale created successfully!');
            }
            getSales();
            setOpenAddDialog(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const result = await authAxios.put(`${apiUrl}/sale/${updateFormData._id}`, updateFormData);
            if (result) {
                getSales();
                toast.success('Sale updated successfully!');
                handleDialogClose();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleDeleteSale = async (id) => {
        try {
            const result = await authAxios.delete(`${apiUrl}/sale/${id}`);
            if (result) {
                getSales();
                toast.warning('Sale deleted successfully!');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getSales = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/sale/`);
            setSales(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('Sales not found');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred while getting sales data!');
            }
        }
    };

    useEffect(() => {
        getSales();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Sale ID', 'Date', 'Time', 'Item', 'Unit Price', 'Quantity', 'Total Price']],
            body: sales.map(sale => [sale.saleId, sale.date, sale.time, sale.item, sale.unitPrice, sale.quantity, sale.totalPrice]),
            startY: 20,
            theme: 'grid',
        });
        doc.text('Sales Done', 14, 15);
        doc.save('sales.pdf');
    };

    // Calculate total sales
    const totalSales = sales.reduce((total, sale) => total + parseFloat(sale.totalPrice), 0);

    return (
        <>
            <div className="bg-gray-100 py-4">
                <h2 className="text-2xl text-center my-2" style={{ fontWeight: 'bold', fontSize: '2.25rem' }}>Manage Sales</h2>
                <div className="flex justify-between items-center px-8">
                    <div className="flex">
           
                        <Button variant="contained" color="secondary" onClick={generatePDF}>Generate PDF</Button>
                    </div>
                    <TextField
                        label="Search"
                        variant="outlined"
                        margin="normal"
                        className="ml-auto"
                        onChange={(e) => {
                            const keyword = e.target.value.toLowerCase();
                            const filteredSales = sales.filter(sale =>
                                sale.saleId.toLowerCase().includes(keyword) ||
                                sale.date.toLowerCase().includes(keyword) ||
                                sale.time.toLowerCase().includes(keyword) ||
                                sale.item.toLowerCase().includes(keyword) ||
                                sale.unitPrice.toString().toLowerCase().includes(keyword) ||
                                sale.quantity.toString().toLowerCase().includes(keyword) ||
                                sale.totalPrice.toString().toLowerCase().includes(keyword)
                            );
                            setSales(filteredSales);
                        }}
                    />
                </div>
                {!isLoading ? (
                    <TableContainer component={Paper} className="max-w-screen-xl mx-auto mt-8">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sale ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(sales) && sales.map(sale => (
                                    <TableRow key={sale._id}>
                                        <TableCell>{sale.saleId}</TableCell>
                                        <TableCell>{`${new Date(sale.date).getFullYear()}-${String(new Date(sale.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(sale.date).getDate()).padStart(2, '0')}`}</TableCell>
                                        <TableCell>{sale.time}</TableCell>
                                        <TableCell>{sale.item}</TableCell>
                                        <TableCell>{parseFloat(sale.unitPrice).toFixed(2)}</TableCell>
                                        <TableCell>{sale.quantity}</TableCell>
                                        <TableCell>{parseFloat(sale.totalPrice).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <div className="flex">
                                                <Button size='small' variant="outlined" color="primary" className="mr-2" onClick={() => handleUpdateSale(sale)}>Update</Button>
                                                <Button size='small' variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteSale(sale._id)}>Delete</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={6} align="right"><strong>Total Sales upto Now:</strong></TableCell>
                                    <TableCell><strong>{totalSales.toFixed(2)}</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Loader />
                )}
                
                <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
                    <DialogTitle>Update Sale</DialogTitle>
                    <DialogContent>
                        <form>
                            {/* <TextField required label="Date" type="date" margin="normal" name="date" value={updateFormData.date} onChange={(e) => setUpdateFormData({ ...updateFormData, date: e.target.value })} fullWidth />
                            <TextField required label="Time" type="time" margin="normal" name="time" value={updateFormData.time} onChange={(e) => setUpdateFormData({ ...updateFormData, time: e.target.value })} fullWidth /> */}
                            <TextField required label="Item" margin="normal" name="item" value={updateFormData.item} onChange={(e) => setUpdateFormData({ ...updateFormData, item: e.target.value })} fullWidth />
                            <TextField required label="Unit Price" type="number" margin="normal" name="unitPrice" value={updateFormData.unitPrice} onChange={(e) => setUpdateFormData({ ...updateFormData, unitPrice: e.target.value })} fullWidth />
                            <TextField required label="Quantity" type="number" margin="normal" name="quantity" value={updateFormData.quantity} onChange={(e) => setUpdateFormData({ ...updateFormData, quantity: e.target.value })} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUpdate} color="primary">Submit</Button>
                        <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
