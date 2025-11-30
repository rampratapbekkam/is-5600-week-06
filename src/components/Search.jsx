import React from 'react'

export default function Search({handleSearch}) {



   const onSearchChange = (event) => {
    handleSearch(event.target.value);
  };

   return (
    <div className="pa2">
      <input
        type="search"
        placeholder="Search by tags..."
        onChange={onSearchChange}
        className="pa2 input-reset ba b--black-20 br2 w-100 w-50-ns"
      />
    </div>
  );
  
}
