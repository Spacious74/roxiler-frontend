import React, {useState} from "react";
import "./Searchbar.css";

function Searchbar({onSearchChange}) {
  const [searchText, setSearchText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(searchText)
  };

  return (
    <div className="search-container">
      <form method="GET" className="flex" onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          id="search"
          className="search"
          placeholder="Search transactions by name, description and category ..."
        />
        <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>
        
    </div>
  );
}

export default Searchbar;
