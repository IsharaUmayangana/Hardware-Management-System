import React, { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom'
 

import './order.css'

const DeliveryInfoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: ''
    });

    const [phoneNumberError, setPhoneNumberError] = useState('');

    const totalPrice = location.state.totalPrice || 0 ;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'phoneNumber' && value.length !== 10) {
            setPhoneNumberError('Phone number must be 10 digits');
        } else {
            setPhoneNumberError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate phone number
        if (formData.phoneNumber.length !== 10) {
            setPhoneNumberError('Phone number must be 10 digits');
            return;
        }
        // Send form data to backend
        fetch('http://localhost:8000/deliveryinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, totalPrice:location.state.totalPrice  }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Form data submitted successfully:', data);
            
            navigate('/payment',{ state: { totalPrice } });
        })
        .catch((error) => {
            console.error("Error submitting form data:", error);
            alert('Failed to submit form data');
        });
    };

    return (
        <div className="Billing">
            
            <h2>Billing Details</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                <p>Total Price: {totalPrice}</p>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    );
    
    
};

export default DeliveryInfoPage;