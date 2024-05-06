import homeCss from "./home.module.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../ReduxTool/userSlice";

import NavigationBar from "./Home-Navigation";
import HomeComponent from "./Home-Products";
import Footer from "./Footer";

import { BsPersonCircle } from "react-icons/bs";

function NavHome() {
  const user = useSelector((state) => state.user.user);
  console.log(user.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItemCount, setCartItemCount] = useState(0);


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
      <NavigationBar />

      <div style={{ display: "flex" }}>
        <div className={homeCss.navIcons}>
          <BsPersonCircle className="iconHeader" />
          <span className={homeCss.span}>Welcome {user.name}</span>

          <span className={homeCss.span}>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </span>
        </div>
      </div>
      <div>
        <HomeComponent />
      </div>
      <Footer />
    </div>
  );
}

export default NavHome;
