import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";

function Orders() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAge, setUpdatedAge] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);


//Delete Records
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(response => {
        console.log("User deleted successfully:", response.data);
        setUsers(users.filter(user => user._id !== id));
        setOpenDialog(false); // Close the dialog after deleting the user
      })
      .catch(err => console.log(err));
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedAge(user.age);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdate = () => {
    const updatedUser = {
      id: selectedUser._id,
      name: updatedName,
      email: updatedEmail,
      age: updatedAge
    };
    axios.put(`http://localhost:3001/updateUser/${selectedUser._id}`, updatedUser)
      .then(response => {
        console.log("User updated successfully:", response.data);
        // Update the user in the users state
        setUsers(users.map(user => user._id === selectedUser._id ? { ...user, name: updatedName, email: updatedEmail, age: updatedAge } : user));
        setOpenDialog(false); // Close the dialog after updating the user
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className='btn btn-success'>Add +</Link>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>#{user._id}</TableCell>
                <TableCell>
                  {/* <Link to={`/update/${user._id}`} className='btn btn-success'>Proceed Delivery</Link> */}
                  
                  <Button className="btn btn-info" onClick={() => handleOpenDialog(user)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog   open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent style={{ margin: 20 , padding: 10 }}>
            <TextField
              label="Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              fullWidth
            /><br/>
            <TextField
              label="Email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Age"
              value={updatedAge}
              onChange={(e) => setUpdatedAge(e.target.value)}
              fullWidth
            />
            {/* Add more details as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} color="primary">Update</Button>
            <Button onClick={() => handleDelete(selectedUser._id)} color="secondary">Delete</Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Orders;
