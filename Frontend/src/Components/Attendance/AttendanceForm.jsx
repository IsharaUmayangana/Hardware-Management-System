

import React, { useState } from 'react';




const AttendanceForm = () => {
    const [employeeid, setEmployeeid] = useState('');
    const [status, setStatus] = useState('');
    const [timeIn, setTimeIn] = useState('');
    const [timeOut, setTimeOut] = useState('');
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const attendance = {employeeid,status,timeIn,timeOut}

        const response = await fetch('http://localhost:8000/attendance', {
            method: 'POST',
            body: JSON.stringify(attendance),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setEmployeeid('')
            setStatus('')
            setTimeIn('')
            setTimeOut('')
            setError(null)
            console.log('new attendance added', json)
        }
    };


    return (
    
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Employee ID" value={employeeid} onChange={(e) => setEmployeeid(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
            </select>
            <label>
        Time In:
        <input type="datetime-local" value={timeIn} onChange={(e) => setTimeIn(e.target.value)} />
      </label>
      <label>
        Time Out:
        <input type="datetime-local" value={timeOut} onChange={(e) => setTimeOut(e.target.value)} />
      </label>
            <button type="submit">Submit</button>
        </form>
    );
};


export default AttendanceForm;