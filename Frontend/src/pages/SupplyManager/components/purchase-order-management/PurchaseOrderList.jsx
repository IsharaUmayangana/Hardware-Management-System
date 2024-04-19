import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Row({ row }) {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ padding: 0 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{ width: 50, height: 50 }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.orderNumber}
                </TableCell>
                <TableCell align="right">{row.supplier.name}</TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} sx={{ padding: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Purchase Order Items
                            </Typography>
                            <Table size="small" aria-label="purchase-order-items">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell component="th" scope="row">
                                                {item.item.name}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.unitPrice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

Row.propTypes = {
    row: PropTypes.shape({
        orderNumber: PropTypes.string.isRequired,
        supplier: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        totalAmount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                item: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
                quantity: PropTypes.number.isRequired,
                unitPrice: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};
//if(Row.propTypes) console.log(Row.propTypes.row.PropTypes.shape)
export default function PurchaseOrderList() {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = purchaseOrders.filter(purchaseOrder =>
        purchaseOrder.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchaseOrder.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/supply-management/purchase-orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch purchase orders');
                }
                const data = await response.json();
                setPurchaseOrders(data);

                console.log('purchase order:', data)
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };

        fetchPurchaseOrders();
    }, []);


    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add summary section
        doc.text('Purchase Order Report', 10, 10);
        doc.text('Summary:', 10, 20);
        doc.text(`Total Orders: ${filteredOrders.length}`, 10, 30);
        // Add more summary metrics as needed
        
        // Add order details section
        doc.text('Order Details:', 10, 50);
    
        const ordersData = [];
        filteredOrders.forEach((purchaseOrder) => {
            const orderSummary = {
                'Order Number': purchaseOrder.orderNumber,
                'Total Amount': purchaseOrder.totalAmount,
                'Supplier': purchaseOrder.supplier.name,
                'Status': purchaseOrder.status,
                'Order Date': new Date(purchaseOrder.createdAt).toLocaleDateString(),
            };
    
            /*const orderItems = purchaseOrder.items.map((item) => ({
                'Item': item.item.name,
                'Quantity': item.quantity,
                // Add more item details as needed
            }));*/
    
            ordersData.push([orderSummary]);
        });
    
        let startY = 60;
        ordersData.forEach((orderData) => {
            doc.autoTable({
                startY: startY,
                body: orderData,
                theme: 'plain',
                styles: { overflow: 'linebreak' },
                columnStyles: { 0: { fontStyle: 'bold' } },
            });
            startY = doc.autoTable.previous.finalY + 10;
        });
    
        doc.save('purchase_order_report.pdf');
    };
    
    // const generatePDF = () => {
    //     const doc = new jsPDF();

    //     doc.autoTable({
    //         head:[['Order Number','Toatal Amount','Supplier', 'Status', 'Date']],
    //         body: filteredOrders.map(order => [order.orderNumber, order.totalAmount, order.supplier.name, order.status,new Date(order.createdAt).toLocaleDateString()])
    //     })

    // }
    
    


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 10 }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px' , marginTop:'20px'}}
            />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table aria-label="collapsible table" sx={{ width: '100%' }} stickyHeader >
                    <TableHead>
                        <TableRow sx={{ borderBottom: 0 }}>
                            <TableCell sx={{ width: '5%' }} />
                            <TableCell  >Order Number</TableCell>
                            <TableCell align="right" >Supplier</TableCell>
                            <TableCell align="right" >Total Amount</TableCell>
                            <TableCell align="right" >Status</TableCell>
                            <TableCell align="right" >Order Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((purchaseOrder) => (
                            <Row key={purchaseOrder._id} row={purchaseOrder} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={purchaseOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <button onClick={generatePDF}>Generate PDF</button>
        </Paper>
    );
}
