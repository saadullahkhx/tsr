import React, { useState } from "react";
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
    <form onSubmit={handleSearch} className="search-box">
      <CustomInput
        placeholder="Search products..."
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default Search;
