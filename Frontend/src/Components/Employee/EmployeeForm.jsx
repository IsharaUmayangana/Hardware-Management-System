import  { useState } from "react"
import './employee.css'

const EmployeeForm = () => {
    const [employeeid, setEmployeeid] = useState('')
    const [fullname, setFullname] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [jobPost, setJobPost] = useState('')
    const [dateofhire, setDateofhire] = useState('')
    const [employmenttype, setEmploymenttype] = useState('')
    const [basicsalary, setBasicsalary] = useState('')
    const [error, setError] = useState(null)

    const handleEmployeeForm = async (e) => {

        e.preventDefault()

        const employee = {employeeid,fullname,address,email,jobPost,dateofhire,employmenttype,basicsalary}

        const response = await fetch('http://localhost:8000/employees', {
            method: 'POST',
            body: JSON.stringify(employee),
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
            setFullname('')
            setAddress('')
            setEmail('')
            setJobPost('')
            setDateofhire('')
            setEmploymenttype('')
            setBasicsalary('')
            setError(null)
            console.log('new employee added', json)
        }
    }



    return (
        <div className="AddImage">
        <div className="AddEmpForm">
        <form onSubmit={handleEmployeeForm}>
            <h3>Add a New Employee</h3>

            <lable>Employee ID:(EmXXX)</lable>
            <input type="text" onChange={(e) => setEmployeeid(e.target.value)} value={employeeid}/>

            <lable>Full Name:</lable>
            <input type="text" onChange={(e) => setFullname(e.target.value)} value={fullname}/>

            <lable>Address:</lable>
            <input type="text" onChange={(e) => setAddress(e.target.value)} value={address}/>

            <lable>Email:</lable>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <lable>Job Post:</lable>
            <input type="text" onChange={(e) => setJobPost(e.target.value)} value={jobPost}/>

            <lable>Date of Hire:</lable>
            <input type="date" onChange={(e) => setDateofhire(e.target.value)} value={dateofhire}/>

            <lable>Employment Type(permanent/temporary):</lable>
            <input type="text" onChange={(e) => setEmploymenttype(e.target.value)} value={employmenttype}/>

            <lable>Basic Salary:</lable>
            <input type="number" onChange={(e) => setBasicsalary(e.target.value)} value={basicsalary}/>

            <button className="adBtn">Add Employee</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
        </div>
    );
}

export default EmployeeForm