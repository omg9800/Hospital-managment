import React from 'react'

const SearchBar = () => {
  return (
    <div className="search">
         <input
            type="text"
            id="header-search"
            placeholder="Search..."
            name="s" 
            // onChange={handleSearch}
        />
      </div>
  )
}

export default SearchBar