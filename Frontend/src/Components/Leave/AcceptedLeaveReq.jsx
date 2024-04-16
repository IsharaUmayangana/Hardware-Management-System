import React, { useState, useEffect } from "react";

const AcceptedLeaveReq = () => {
    const [acceptedLeaves, setAcceptedLeaves] = useState([]);

    useEffect(() => {
        const fetchAcceptedLeaves = async () => {
            try {
                const response = await fetch('http://localhost:8000/leaves?status=accepted');
                if (!response.ok) {
                    throw new Error('Failed to fetch accepted leaves');
                }
                const json = await response.json();
                setAcceptedLeaves(json);
            } catch (error) {
                console.error('Error fetching accepted leaves:', error);
            }
        };

        fetchAcceptedLeaves();
    }, []);

    return (
        <div className="accepted-leave-req">
            <h2>Accepted Leave Requests</h2>
            <ul>
                {acceptedLeaves.map(leave => (
                    <li key={leave._id}>
                        <p>Employee ID: {leave.employeeid}</p>
                        <p>Email: {leave.email}</p>
                        <p>Leave Type: {leave.leaveType}</p>
                        <p>Start Date: {leave.startDate}</p>
                        <p>End Date: {leave.endDate}</p>
                        <p>Reason: {leave.reason}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AcceptedLeaveReq;