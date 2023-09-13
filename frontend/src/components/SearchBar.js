import React, { useState } from "react";
import { Input } from "@mui/material";
import axios from "axios";

function SearchBar({ onSearch, onEmptySearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(`/search?query=${searchQuery}`);
        onSearch(response.data); // Pass search results to the parent component
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
    //   alert("Type something");
      onEmptySearch(); // Notify the parent that the search query is empty
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);

    // Automatically trigger search when the input changes
    if (e.target.value === "") {
      onEmptySearch(); // Notify the parent that the search query is empty
    } else {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <Input
        type="text"
        placeholder="Search questions"
        value={searchQuery}
        onChange={handleChange} // Trigger search on input change
      />
    </div>
  );
}

export default SearchBar;
