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


   
    const handleAccept = async (acceptedLeaveId) => {
        try {
            const response = await fetch(`http://localhost:8000/leaves/${acceptedLeaveId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'accepted' }),
            });
            if (!response.ok) {
                throw new Error('Failed to accept leave');
            }
            // Remove the accepted leave from the list
            setLeaves(prevLeaves => prevLeaves.filter(leave => leave._id !== acceptedLeaveId));
        } catch (error) {
            console.error('Error accepting leave:', error);
        }
    };

    return (
        <div className="home">
           <Navibar/>
           <div className="titles">
                <ul>
                    <li><strong>Employee id</strong></li>
                    <li><strong>Email</strong></li>
                    <li><strong>Leave Type</strong></li>
                    <li><strong>Start Date</strong></li>
                    <li><strong>End Date</strong></li>
                    <li><strong>Reason</strong></li>
                   
                </ul>
                
            </div>
           <div className="leaves">
            {leaves && leaves.map((leave) => (
                   
                <LeaveDetails key={leave._id} leave={leave} onAccept={handleAccept}/>
            ))}
             
           </div>
           

           
        </div>
    )
}

export default LeaveHome