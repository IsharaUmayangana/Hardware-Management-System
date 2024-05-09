import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import CartCount from "../Order/CartCount";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUser } from "../ReduxTool/userSlice";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import {
  TextField,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const StyledHeader = styled.header`
  background-color: #74c0fc;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 4px;
    }
  }

  .profile-info {
    display: flex;
    align-items: center;
  }

  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  console.log(user.name);
  const dispatch = useDispatch();

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleCategoriesClick = (event) => {
    event.preventDefault();
    setDrawerOpen(true);
  };

  const handleLogout = () => {
    axios.get("http://localhost:8000/logout").then((res) => {
      if (res.data.Status) {
        dispatch(clearUser());
        navigate("/login");
      }
    });
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setDrawerOpen(false);
    setCurPage(1);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Apply the styled header */}
      <StyledHeader>
        <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
            <img
              src={`./logo_laksiri.png`}
              alt="Product"
              width={"100px"}
              height={"50px"}
            />
          </Link>
        </div>

        {/* Use FaBars icon for toggle */}
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
        {/* Apply the styled navigation menu */}
        <NavManu isToggleOpen={isToggleOpen}>
          <li>
            <Link to={"/"} className="nav-menu-list">
              Home
            </Link>
          </li>

          <li>
            <Link
              to={"/projects"}
              className="nav-menu-list"
              onClick={handleCategoriesClick}
            >
              Categories
            </Link>
          </li>

          <li>
            <Link to={"/userItemList"} className="nav-menu-list">
              Rental Items
            </Link>
          </li>

          <li>
            <Link to={"/Cart"} className="nav-menu-list">
              <div className="profile-info">
                <span>Cart</span>
                <CartCount />
              </div>
            </Link>
          </li>

          <li>
            <Link
              to={"/login"}
              className="nav-menu-list"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </li>
          <li>
            <Link to={"/"} className="nav-menu-list">
              <BsPersonCircle className="iconHeader" />
              Hello, {user.name}
            </Link>
          </li>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List>
              <ListItem button key="All" onClick={() => handleCategory("")}>
                <ListItemText primary="All" />
              </ListItem>
              {categories.map((category) => (
                <ListItem
                  button
                  key={category._id}
                  onClick={() => handleCategory(category.name)}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </NavManu>
      </StyledHeader>
    </>
  );
};

export default Header;
