import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import {Page, Text, View, Document} from '@react-pdf/renderer';

const EmployeeReport = () => {
    const { employeeid  } = useParams();
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);
  const [basicSalary, setBasicSalary] = useState(0);
  const [monthlySalary, setMonthlySalary] = useState(0);

  useEffect(() => {
    const fetchMonthlyAttendance = async () => {
      try {
        const response = await fetch(`http://localhost:8000/attendance/${employeeid}`);
        const data = await response.json();
        setMonthlyAttendance(data);
      } catch (error) {
        console.error('Error fetching monthly attendance:', error);
      }
    };

    const fetchBasicSalary = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employees/${employeeid}`);
        const data = await response.json();
        setBasicSalary(data.basicSalary);
      } catch (error) {
        console.error('Error fetching basic salary:', error);
      }
    };

    fetchMonthlyAttendance();
    fetchBasicSalary();
  }, [employeeid]);

  useEffect(() => {
    if (monthlyAttendance.length > 0 && basicSalary > 0) {
      const monthlySalary = ((basicSalary / 30) * monthlyAttendance.length).toFixed(2);
      setMonthlySalary(monthlySalary);
    }
  }, [monthlyAttendance, basicSalary]);

  const handleDownloadPDF = () => {

    window.print();
    // const doc = (
    //   <Document>
    //     <Page size="A4" style={styles.page}>
    //       <View>
    //         <Text>Employee ID: {employeeid}</Text>
    //         <Text>Monthly Attendance Dates: {monthlyAttendance.length}</Text>
    //         <Text>Monthly Salary: {monthlySalary}</Text>
    //       </View>
    //     </Page>
    //   </Document>
    // );
  
    // const asPdf = PDFDocument.create();
    // asPdf.addPages(doc);
    // const pdfBytes = asPdf.save();
  
    // saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'employee_report.pdf');
  };

  return (
    <div>
      <h1>Employee Report</h1>
      <div>
        <p>Monthly Attendance Dates: {monthlyAttendance.length}</p>
        <p>Monthly Salary: {monthlySalary}</p>
      </div>
      <button onClick={handleDownloadPDF}>Download Report</button>
    </div>
  );
};

export default EmployeeReport;