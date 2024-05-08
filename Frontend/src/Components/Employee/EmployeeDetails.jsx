import './employee.css'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import React, { useState } from 'react';



const EmployeeDetails = ({ employee, onDelete  }) => {

   

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/employees/${employee._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            // Call onDelete callback to update employee list
            onDelete(employee._id);
            alert('Employee deleted successfully');
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Employee deleted successfully');
        }
    };

    return(
       
        <div className="employeeDetails">
            <ul>
            <li><div className='emplId'>{employee.employeeid}</div></li>
            <li><div className='emplName'>{employee.fullname}</div></li>
            <li><div className='emplMail'>{employee.email}</div></li>
            <li><div className='emplJob'>{employee.jobPost}</div></li>
            <li><div className='emplType'>{employee.employmenttype}</div></li>
            <li><button className="qr"><Link to={`/employee/${employee.employeeid}/qr`}>QR</Link></button></li>
            <li><button className='editBtn'><Link to={`/updateEmployee/${employee._id}`}>Update</Link></button></li>
            <li><button className='genarate'>
                <Link to={`/employee/${employee.employeeid}/report`}>Generate Report</Link>
            </button></li>

        <div className='dltBtn'> <li>
        <IconButton size="large"  color="inherit" onClick={handleDelete}>
          <Badge  color="error">
            <DeleteIcon/>
          </Badge>
        </IconButton></li></div>
        
            </ul>
           
        </div>
       
      
    )
}

export default EmployeeDetails 


