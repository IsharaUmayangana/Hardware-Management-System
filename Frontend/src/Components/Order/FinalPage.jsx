import React from 'react';
import './order.css';
import NavigationBar from '../Home/Home-Navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@mui/styles';



const FinalPage = () => {
  
  return (
    <div>
       
    <div className="thank">
        <div ><img className="check"src={`http://localhost:8000/logos/check.png`} alt="Check" /></div>
        <p>Thank you</p>
        <p>for your order</p>
    </div>
    </div>
  );
};

export default FinalPage;