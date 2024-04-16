import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

const EmployeeQRCode = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee details based on the employee ID from the QR code
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employees/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="employeeQRCode">
      <h2>Employee QR Code</h2>
      <div className="employeeInfo">
        {/* Display employee information if available */}
        {employee && (
          <>
            <p><strong>Employee ID:</strong> {employee.employeeid}</p>
            <p><strong>Full Name:</strong> {employee.fullname}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Job Post:</strong> {employee.jobPost}</p>
            <p><strong>Date of Hire:</strong> {employee.dateofhire}</p>
            <p><strong>Employment Type:</strong> {employee.employmenttype}</p>
            <p><strong>Basic Salary:</strong> {employee.basicsalary}</p>
           
          </>
        )}
      </div>
   
      <QRCode value={JSON.stringify(employee)} /> {/* Generate QR code */}
    </div>
  );
};

export default EmployeeQRCode;