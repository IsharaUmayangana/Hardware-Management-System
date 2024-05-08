import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from "react-router-dom";

function CreateVehicle() {
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [millage, setMillage] = useState('');
    const [availability, setAvailability] = useState('available'); // Default value
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/CreateVehicle/CreateVehicle', { name, model, millage , availability })
            .then(res => {
                alert("Vehicle created successfully!");
                // Redirect to a different route after successful submission
                // navigate('/'); 
            })
            .catch(err => console.log(err));
    };

    const handleAvailabilityChange = (e) => {
        setAvailability(e.target.value);
    };

    return (
        <Container maxWidth="md" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={8} md={6}>
                    <div>
                        <Typography variant="h4" gutterBottom align="center">Add Vehicle</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Vehicle Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Vehicle Model"
                                variant="outlined"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Millage"
                                variant="outlined"
                                value={millage}
                                onChange={(e) => setMillage(e.target.value)}
                                margin="normal"
                                required
                            />
                            <FormControl component="fieldset" margin="normal" fullWidth>
                                <Typography variant="subtitle1" gutterBottom>Select Availability:</Typography>
                                <RadioGroup
                                    row
                                    aria-label="availability"
                                    name="availability"
                                     value={availability}
                                     onChange={handleAvailabilityChange}
                                >
                                    <FormControlLabel value="available" control={<Radio />} label="Available" />
                                    <FormControlLabel value="notAvailable" control={<Radio />} label="Not Available" />
                                </RadioGroup>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateVehicle;
