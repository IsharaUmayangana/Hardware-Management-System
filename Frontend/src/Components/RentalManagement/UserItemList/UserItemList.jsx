import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../searchBar/searchBar";
import UserItemCard from "../UserItemCard/UserItemCard";

function UserItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // get items
    axios
      .get(`http://localhost:8000/items`)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  // handle search
  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <>
      <h1>Item List (Customer side)</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SearchBar onSearch={handleSearch} />{" "}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredItems.map((item) => (
          <UserItemCard key={item._id} item={item} style={{ margin: "10px" }} />
        ))}
      </div>
    </>
  );
}

export default UserItemList;
