import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

const EmployeeQRCode = () => {
  const { employeeid } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee details based on the employee ID from the QR code
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employees/${employeeid}`);
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
  }, [employeeid]);

  return (
    <div className="employeeQRCode">
      <p className='scan'>SCAN</p>
      <p className='here'>HERE</p>
      <p className='toGet'>TO GET MORE</p>
      <p className='info'>INFORMATION</p>
      
      {employee ? (
        <QRCode
          className='qrCodepic'
          value={JSON.stringify({
            employeeid: employee.employeeid,
            fullname: employee.fullname,
            address: employee.address,
            email: employee.email,
            jobPost: employee.jobPost,
            dateofhire: employee.dateofhire,
            employmenttype: employee.employmenttype,
            basicsalary: employee.basicsalary,
          })}
          size={400}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeQRCode;