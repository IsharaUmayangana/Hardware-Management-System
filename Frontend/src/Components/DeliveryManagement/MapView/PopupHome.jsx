import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@mui/material';
import {
    BsFillArchiveFill, BsFillGrid3X2GapFill,
    BsPeopleFill, BsFillGearFill
    } from "react-icons/bs";

import {
    LineChart, Line , BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
    } from 'recharts';

function PopupHome() {

                    //To get count for dashboard
 //------------------------------------------------------------------------  

    const [deliveryCount, setDeliveryCount] = useState(0);
    const [vehicleCount, setVehicleCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/DeliveryView/DeliveryView")
            .then(res => {
                setDeliveryCount(res.data.length);
            })
            .catch(err => console.log(err));

        axios.get("http://localhost:8000/VehicleView/VehicleView")
            .then(res => {
                setVehicleCount(res.data.length);
            })
            .catch(err => console.log(err));
    }, []);

    const data = [
        { name: 'Deliveries', count: deliveryCount },
        { name: 'Vehicles', count: vehicleCount },
    ];

    //--------------------------------------------------------------

    return (
        <main className="main-container">
            <h3 style={{ color: 'black' , textAlign: 'center', fontSize: '53px' , fontWeight: 'normal' }}>Delivery Dashboard</h3> <br></br>
            <div className="main-title">
              
            </div>
          
            <div className="main-cards" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                
                <div className="card" style={{ width: '400px', height: '150px'  , marginLeft: "30px" , paddingRight: "100px"}}>
                    <div className="card-inner">
                        <h2>Deliveries</h2>
                        <BsFillArchiveFill className="cart_icon" style={{  fontSize: '40px' , alignItems: "inherit"} } />
                    </div>
                    <h1>{deliveryCount}</h1>
                </div>

                <div className="card" style={{ width: '400px', height: '150px'  , marginRight: "30px"}}>
                    <div className="card-inner">
                        <h2>Vehicles</h2>
                        <BsFillGrid3X2GapFill className="cart_icon" style={{  fontSize: '40px'  }}/>
                    </div>
                    <h1>{vehicleCount}</h1>
                </div>

               
            </div>

            <div className="charts">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default PopupHome;
