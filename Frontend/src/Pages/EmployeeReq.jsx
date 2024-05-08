import { useEffect , useState} from "react"
import '../Components/Employee/employee.css'



const EmployeeReq = () => {

    return (
        <div className="empimg">
        <div className="empBody">
            <p className="empTitle">Employee DashBoard</p>
            <button className="AddNewLeaves"><a href="/addNewLeave" className="addReq">Send a leave Request</a></button>
            <button className="AddNewAttendances"><a href="/addAttendance" className="addAttend">Send Attendance</a></button>
        </div>
        </div>
    )
}


export default EmployeeReq