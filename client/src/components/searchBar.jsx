import React from 'react'

const SearchBar = ({handleSearch,searchText}) => {

  return (
    <div className="search">
         {/* <input
            type="text"
            id="header-search"
            placeholder="Search..."
            name="s" 
            onChange={handleSearch}
        /> */}
         <input type="text" name="searchText" value={searchText} onChange={handleSearch}  placeholder="Search..."/>
      </div>
  )
}

export default SearchBar