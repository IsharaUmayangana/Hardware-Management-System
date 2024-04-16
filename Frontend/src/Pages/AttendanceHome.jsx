import { useEffect , useState} from "react"

//components 
import AttendanceDetails from "../Components/Attendance/AttendanceDetails"
// import Navibar from "../Components/Leave/Navibar"
// import '../Components/Leave/leave.css'


const AttendanceHome = () => {
    const [attendances, setAttendances] = useState(null)
    useEffect(() =>  {
            const fetchAttendances = async () => {
            const response = await fetch('http://localhost:8000/attendance')
            const json = await response.json()

            if (response.ok){
                setAttendances(json)
            }
        }

        fetchAttendances()
    }, [])
    return (
        <div className="Atthome">
         
           <div className="titles">
                <ul>
                    <li><strong>Employee id</strong></li>
                    <li><strong>Status</strong></li>
                    <li><strong>Time In</strong></li>
                    <li><strong>Time Out</strong></li>
                    <li><strong>Date</strong></li>
                   
                </ul>
                
            </div>
           <div className="attendances">
            {attendances && attendances.map((attendance) => (
                   
                <AttendanceDetails key={attendance._id} attendance={attendance}/>
            ))}
             
           </div>
           

           
        </div>
    )
}

export default AttendanceHome