import homeCss from "./home.module.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../ReduxTool/userSlice";
import { BsPersonCircle } from "react-icons/bs";

function NavHome() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout with route
  //clear cookie data and locatstorage data
  //clear store data from redux tool kit
  const handleLogout = () => {
    axios.get("http://localhost:3001/logout").then((res) => {
      if (res.data.Status) {
        navigate("/login");
      }
    });
    dispatch(clearUser());
    navigate("/login"); // Redirect to the login page after logout
  };

  // Navigate to user item list
  const handleCheckRentalItems = () => {
    navigate("/userItemList");
  };

  return (
    <div className={homeCss.body}>
      <div className={homeCss.navbar}>
        <div className={homeCss.logo}>Logo</div>
        <ul className={homeCss.navLinks}>
          <li>
            <a href="#">Payment Card details</a>
          </li>
          <li>
            <a href="#">Order management </a>
          </li>
          <li>
            <a href="#">Feedback management</a>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
        {/* Add a div for the "Check Rental Items" button */}

        {/* Add the button with a small size */}
      </div>
      <div className={homeCss.navIcons}>
        <BsPersonCircle className="iconHeader" />
        <span className={homeCss.span}>Welcome {user.name}</span>
        <span className={homeCss.span}>
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </span>
        <span className={homeCss.span}>
          <button
            onClick={handleCheckRentalItems}
            className="btn btn-primary"
            style={{
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "#003049",
              backgroundColor: "#b8c0ff",
              border: "none",
              padding: "10px",
            }}
          >
            Check Rental Items Availability
          </button>
        </span>
      </div>
    </div>
  );
}

export default NavHome;
