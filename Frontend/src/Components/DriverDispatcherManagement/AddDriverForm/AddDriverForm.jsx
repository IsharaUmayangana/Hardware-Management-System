import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi'
import { ToastContainer, toast } from 'react-toastify';

export default function AddDriverForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    licenseNumber: '',
    vehicleType: '',
    availabilityStatus: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const schema = Joi.object({
    fullName: Joi.string().pattern(new RegExp('^[A-Za-z]+$')).required(),
    phoneNumber: Joi.string().length(10).required(),
    licenseNumber: Joi.string().length(12).required(),
    vehicleType: Joi.string().required(),
    availabilityStatus: Joi.string().required(),
    rating: Joi.number().integer().min(0).max(5).required(),
  });

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    const validationResult = schema.validate(formData, { abortEarly: false });
  if (validationResult.error) {
    // Handle validation errors, maybe display them to the user
    validationResult.error.details.map(error => {
      toast.error(error.message)

    })
    return;
  }

    try {
      const response = await axios.post('http://localhost:8000/driver-dispatcher', formData);
      console.log(response.data);
      navigate('/driver-dispatcher'); // Redirect to home page
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('License number already exists. Please add a new one.');
      } else {
        console.error(error);
      }
    }
  };

  const handleClick = () => {
    navigate('/driver-dispatcher'); // Navigate programmatically to '/drivers' route
  };

  return (
    <div className="container">
      <ToastContainer/>
      <form onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Phone Number Input */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* License Number Input */}
        <div className="mb-3">
          <label htmlFor="licenseNumber" className="form-label">License Number</label>
          <input
            type="text"
            className="form-control"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* Vehicle Type Select */}
        <div className="mb-3">
          <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
          <select
            className="form-select"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="bike">Bike</option>
            <option value="truk">Truk</option>
            <option value="lorry">Lorry</option>
          </select>
        </div>
        {/* Availability Status Select */}
        <div className="mb-3">
          <label htmlFor="availabilityStatus" className="form-label">Availability Status</label>
          <select
            className="form-select"
            id="availabilityStatus"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability Status</option>
            <option value="available">Available</option>
            <option value="notAvailable">Not Available</option>
          </select>
        </div>
        {/* Rating Select */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <select
            className="form-select"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

        <button
            type="submit"
            className="btn btn-primary submit_before_viewDrivers"
            style={{ marginRight: '10px' }}
          >
            Submit
          </button>

          <button
            type="button"
            className="btn btn-primary view_drivers"
            onClick={handleClick}
            style={{ marginLeft: '1000px' }}
          >
            View Drivers
          </button>
          
        </div>
      </form>
    </div>
  );
}