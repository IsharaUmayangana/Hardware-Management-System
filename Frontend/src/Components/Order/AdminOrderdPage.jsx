import React, { useEffect, useState } from 'react';
import './order.css';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/order')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    const generateReport = () => {
        window.print();
    };

    return (
        <div>
            <h2 className="OrderH2"><strong>Order Details</strong></h2>
            
            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders available</p>
            ) : (
                <div className="Order">
                    {orders.map((order, index) => (
                        <div key={index}>
                            <h3>Order {index + 1}</h3>
                            <p className="Total">Total Price: {order.totalPrice}</p>
                            <table className="cart-table-head" >  
                                <thead>  
                                    <tr>                                   
                                        <th className='Product-h'>Product</th>
                                        <th className='Quantity-h'>Quantity</th>
                                        <th className='Price-h'>Price</th>
                                    </tr>
                                </thead> 
                            </table>
                            {/* </table> */}
                            {order.carts.map((cart, cartIndex) => (
                                <div key={cartIndex}>                      
                                    <table className="cart-table-body">
                                        <thead> 
                                        {cart.cartItems.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <td className='Product-b'>{item.product ? item.product.name : 'Product Name Not Available'}</td>
                                                    <td className='Quantity-b'>{item.quantity}</td>
                                                    <td className='Price-b'>{item.price}</td>
                                                </tr> 
                                            ))}    
                                        </thead>
                                    </table>
                                </div>
                            ))}
                            <hr className="bold-hr"/>
                        </div>
                    ))}
                </div>
            )}<button onClick={generateReport}>Generate Report</button>
        </div>
    );
};

export default OrderPage;
