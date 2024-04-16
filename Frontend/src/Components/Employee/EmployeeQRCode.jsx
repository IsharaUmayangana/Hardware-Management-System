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
      
      <p className='scan'>SCAN</p>
      <p className='here'>HERE</p>
      <p className='toGet'>TO GET MORE</p>
      <p className='info'>INFORMATION</p>
   
      <QRCode className='qrCodepic' value={JSON.stringify(employee)} size={400}/> {/* Generate QR code */}
    </div>
  );
};

export default EmployeeQRCode;