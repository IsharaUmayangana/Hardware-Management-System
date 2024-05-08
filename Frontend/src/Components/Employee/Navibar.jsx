import { Link } from "react-router-dom";

import './employee.css'
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";


const Navibar = () => {
  return (
   
    <header className="photo">
      <div className="empDet"><h2>Employee Details</h2></div>
      <div className="notify">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" component={ Link } to="/leaveRequest">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
    </header>
   
  );
};

export default Navibar;
