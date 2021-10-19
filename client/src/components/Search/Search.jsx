import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import CustomInput from "../CustomInput/CustomInput";
import { useHistory } from "react-router";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <CustomInput
        placeholder="Search products..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <BiSearch className="search-icon" onClick={handleSearch} />
    </form>
  );
};

export default Search;
