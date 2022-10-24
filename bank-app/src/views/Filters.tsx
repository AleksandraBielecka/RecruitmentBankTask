import React, { ChangeEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface IFilters {
  handleSearch: (value?: string) => void;
}

const Filters: React.FC<IFilters> = ({ handleSearch }) => {
  const [filterValue, setFilterValue] = useState("");

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    if (!event.target.value) {
      onSearchClick("");
      setFilterValue("")
    }
  };

  const onSearchClick = (filterVal: string) => {
   
    handleSearch(filterVal);
  };

  return (
    <div className="mg-tp30">
      <h4>Filter:</h4>
      <div className="filter">
        <input
          name="filter"
          placeholder="Enter name and surname of beneficiary"
          type="text"
          onChange={onFilterChange}
          className="filterInput"
        />
        <BsSearch
          onClick={() => onSearchClick(filterValue)}
          style={{ marginTop: "6px" }}
        ></BsSearch>
      </div>
    </div>
  );
};

export default Filters;
