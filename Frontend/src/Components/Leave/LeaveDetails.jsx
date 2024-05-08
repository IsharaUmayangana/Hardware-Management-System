import { useState } from "react";
import './leave.css';

const LeaveDetails = ({ leave, onDelete }) => {
  const [error, setError] = useState(null);

  const handleAcceptAndAccepted = async () => {
    try {
      // First, perform the original "accept" operation
      let response = await fetch(`http://localhost:8000/leaves/${leave._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update leave status');
      }

      // Now, perform the "accepted" operation that involves moving and deleting
      response = await fetch(`http://localhost:8000/leaves/${leave._id}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept leave request');
      }

      // Remove from the current list
      onDelete(leave._id);

      // Trigger success message or notification
      alert('Leave request accepted successfully');
    } catch (error) {
      console.error('Error accepting leave request:', error);
      alert('Failed to accept leave request');
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:8000/leaves/${leave._id}/reject`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reject leave request');
      }

      alert('Leave request rejected successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      alert('Failed to reject leave request');
    }
  };

  return (
    <div className="leaveDetails">
      <ul>
        <li className="levempId">{leave.employeeid}</li>
        <li className="leveemail">{leave.email}</li>
        <li className="levType">{leave.leaveType}</li>
        <li className="levSdate">{leave.startDate}</li>
        <li className="leveDate">{leave.endDate}</li>
        <li className="levRsn">{leave.reason}</li>
        <li>
          <button onClick={handleReject} className='levBtn'>Reject</button>
          <button onClick={handleAcceptAndAccepted} className='levBtn'>Accept</button>
        </li>
      </ul>
    </div>
  );
};

export default LeaveDetails;