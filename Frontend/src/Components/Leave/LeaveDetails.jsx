
import { useState } from "react";

import './leave.css'

const LeaveDetails = ({ leave , onAccept}) => {


    const [error, setError] = useState(null);
    
    const handleAccept = async () => {
        try {
            const response = await fetch(`http://localhost:8000/leaves/${leave._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'accepted' }),
            });
            if (!response.ok) {
                throw new Error('Failed to accept leave');
            }
            // Call the onAccept callback to remove the accepted leave from LeaveHome.jsx
            onAccept(leave._id);
        } catch (error) {
            console.error('Error accepting leave:', error);
            setError('Failed to accept leave');
        }
    };

    
    const handleReject = async () => {
        try {
            const response = await fetch(`http://localhost:8000/leaves/${leave._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to reject leave Requests');
            }
            // Call onDelete callback to update employee list
            onDelete(leave._id);
            alert('Leave Request Rejected successfully');
        } catch (error) {
            console.error('Error Rejectinging leave request:', error);
            alert('Failed to delete leave Request');
        }
    };
    
    return(
        <div className="leaveDetails">
        <ul>
        <li>{leave.employeeid}</li>
        <li>{leave.email}</li>
        <li>{leave.leaveType}</li>
        <li>{leave.startDate}</li>
        <li>{leave.endDate}</li>
        <li>{leave.reason}</li>
        <li><button onClick={handleReject} className='levBtn'>Reject</button></li>
        <li><button onClick={handleAccept} className='levBtn'>Accept</button></li>
        </ul>
        </div>
    )
}

export default LeaveDetails 