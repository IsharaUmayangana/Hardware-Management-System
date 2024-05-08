import React, { useEffect, useState } from 'react';

const AcceptedLeaveReq = () => {
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);

  useEffect(() => {
    const fetchAcceptedLeaves = async () => {
      try {
        const response = await fetch('http://localhost:8000/accleaves');
        const data = await response.json();
        setAcceptedLeaves(data);
      } catch (error) {
        console.error('Error fetching accepted leaves:', error);
      }
    };

    fetchAcceptedLeaves(); // Fetch accepted leaves on component mount
  }, []);

  return (
    <div className="accepted-leave-requests">
      <h2>Accepted Leave Requests</h2>
      {acceptedLeaves.length === 0 ? (
        <p>No accepted leave requests found.</p>
      ) : (
        <ul>
          {acceptedLeaves.map((leave) => (
            <li key={leave._id}>
              <strong>Employee ID:</strong> {leave.employeeid} <br />
              <strong>Email:</strong> {leave.email} <br />
              <strong>Leave Type:</strong> {leave.leaveType} <br />
              <strong>Start Date:</strong> {leave.startDate} <br />
              <strong>End Date:</strong> {leave.endDate} <br />
              <strong>Reason:</strong> {leave.reason} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcceptedLeaveReq;