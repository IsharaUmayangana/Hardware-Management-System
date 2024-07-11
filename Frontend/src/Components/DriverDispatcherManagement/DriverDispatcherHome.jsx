import React from 'react';
import { useNavigate } from 'react-router-dom';
import DriverDetailsTable from './DriverDetailsTable';
import Footer from '../DeliveryManagement/MapView/Footer';
import Header from '../Home/Header';

export default function DriverDispatcherHome() {
    const navigate = useNavigate(); // Hook to get access to the navigate function

    // This function will be called when the "Create Driver" button is clicked
    const handleClick = () => {
        navigate('/driver-dispatcher/AddDriver'); // Navigate programmatically to the create driver page
    };

    // This function will be called when the "Go to Report Page" button is clicked
    const reportHandleClick = () => {
        navigate('/driver-dispatcher/report'); // Navigate programmatically to the report page
    };

    return (
        <>
        <Header/>
        <div>
            <button type="button" className="btn btn-primary" onClick={handleClick} style={{ marginLeft: '100px', width: "200px" }}>
                Add Driver
            </button>
            <button type="button" className="btn btn-primary" onClick={reportHandleClick} style={{ marginLeft: '100px', width: "200px" }}>
                Go to Report Page
            </button>
            <br /><br />
            <DriverDetailsTable />
        </div>
        <Footer/>
        </>
    );
}
