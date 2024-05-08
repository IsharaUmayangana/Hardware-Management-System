import { useEffect , useState} from "react"


//components 
import LeaveDetails from "../Components/Leave/LeaveDetails"
import Navibar from "../Components/Leave/Navibar"
import '../Components/Leave/leave.css'



const LeaveHome = () => {
    const [leaves, setLeaves] = useState(null)
    
    useEffect(() =>  {
            const fetchLeaves = async () => {
            const response = await fetch('http://localhost:8000/leaves')
            const json = await response.json()

            if (response.ok){
                setLeaves(json)
            }
        }

        fetchLeaves()
    }, [])

    const handleDelete = (id) => {
        setLeaves(leaves.filter((leave) => leave._id !== id)); // Remove from the list
      };
    

    return (
        <div className="home">
           <Navibar/>
          
           <div className="titles">
                <ul>
                    <li className="levList"><strong>Employee id</strong></li>
                    <li className="levList"><strong>Email</strong></li>
                    <li className="levList"><strong>Leave Type</strong></li>
                    <li className="levList"><strong>Start Date</strong></li>
                    <li className="levList"><strong>End Date</strong></li>
                    <li className="levList"><strong>Reason</strong></li>
                   
                </ul>
                
            </div>
           <div className="leaves">
            {leaves && leaves.map((leave) => (
                   
                <LeaveDetails key={leave._id} leave={leave}  onDelete={handleDelete}/>
            ))}
             
           </div>
           

           
        </div>
    )
}

export default LeaveHome