import './employee.css'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";



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
            alert('Failed to delete employee');
        }
    };

    return(
       
        <div className="employeeDetails">
            <ul>
            <li>{employee.employeeid}</li>
            <li>{employee.fullname}</li>
            <li>{employee.email}</li>
            <li>{employee.jobPost}</li>
            <li>{employee.employmenttype}</li>
            <li><button className="qr"><Link to={`/employee/${employee._id}/qr`}>QR</Link></button></li>
            <li><button className='editBtn'><Link to={`/updateEmployee/${employee._id}`}>Update</Link></button></li>
            <li><button className='genarate'><Link to={`/employee/${employee.id}/report`}>Generate Report</Link></button></li>

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


