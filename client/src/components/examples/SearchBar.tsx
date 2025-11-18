import { useState } from "react";
import SearchBar from "../SearchBar";

export default function SearchBarExample() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SearchBar 
        value={searchValue} 
        onChange={(val) => {
          console.log("Search value:", val);
          setSearchValue(val);
        }} 
      />
    </div>
  );
}
