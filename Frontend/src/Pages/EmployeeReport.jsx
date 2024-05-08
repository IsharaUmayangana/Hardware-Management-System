import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../Components/Employee/employee.css";
import { useReactToPrint } from "react-to-print";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";
import { BorderColor } from "@mui/icons-material";

const EmployeeReport = () => {
  const { employeeid } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Fetch employee details
        const employeeResponse = await fetch(`http://localhost:8000/employees/${employeeid}`);
        if (employeeResponse.ok) {
          const employeeJson = await employeeResponse.json();

          // Fetch attendance data and filter by employee ID
          const attendanceResponse = await fetch(`http://localhost:8000/attendance/`);
          const attendanceJson = await attendanceResponse.json();
          const attendanceCount = attendanceJson.filter(
            (attendance) => attendance.employeeid === employeeid
          ).length;

          // Fetch leaves data for the same employee ID
          const accleaveResponse = await fetch(`http://localhost:8000/accleaves`);
          const accleaveJson = accleaveResponse.ok ? await accleaveResponse.json() : [];
          const accleaveCount = accleaveJson.filter(
            (leave) => leave.employeeid === employeeid
          ).length;

          // Adjust accleaveCount if it's greater than 5
          const adjustedAccleaveCount = accleaveCount > 2 ? accleaveCount - 2 : 0;

          // Calculate monthly salary based on filtered attendance
          const dailyWage = employeeJson.basicsalary / 30;
          const monthlySalary = ((dailyWage * attendanceCount)-(dailyWage * adjustedAccleaveCount)).toFixed(2);

          // Combine data
          const data = {
            employeeid: employeeJson.employeeid,
            attendanceCount,
            accleaveCount: adjustedAccleaveCount,
            basicSalary: employeeJson.basicsalary,
            monthlySalary,
          };


          setEmployeeData(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [employeeid]); // `employeeid` as a dependency

  const componentPDF = useRef();

  const generateReport = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Employee Report',
    onAfterPrint: () => alert('Report downloaded successfully!'),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', margin: '20px 60px' }}>
      <div ref={componentPDF} style={{ width: '60%', padding: '10px', alignSelf: 'center' }}>
        <Typography variant="h4">Employee Report</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>{employeeData.employeeid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Attendance Count</TableCell>
              <TableCell>{employeeData.attendanceCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>No-Pay Leave Count</TableCell>
              <TableCell>{employeeData.accleaveCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Basic Salary (LKR)</TableCell>
              <TableCell>{employeeData.basicSalary}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Monthly Salary (LKR)</TableCell>
              <TableCell>{employeeData.monthlySalary}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button variant="contained" onClick={generateReport}>
        Download
      </Button>
    </div>
  );
};

export default EmployeeReport;
