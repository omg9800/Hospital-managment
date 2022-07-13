import React, { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';
import Card from "../doctorCard/DoctorCard";
import SearchBar from "../searchBar";

const DoctorDetails = () => {

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchText, setSearchText] = useState("")
  

  const location=useLocation();

  useEffect(() => {
   
    fetchDoctors();
  }, [])

  useEffect(() => {

   let filtered = doctors.filter((m) =>
        m.name.toLowerCase().startsWith(searchText.toLowerCase())
      );

    setFilteredDoctors(filtered);
    console.log(searchText,filtered);

  }, [searchText])
  

  const handleSearch=(e)=>{
    let val=e.target.value;
    setSearchText(val);
  }

  const fetchDoctors=async()=>{
   let token;
      if(location.pathname=='/staff/view-doctors')
     token=JSON.parse(localStorage.getItem('staff-token'));
     else
          token=JSON.parse(localStorage.getItem('admin-token'));


   let res=await fetch('http://localhost:3000/api/doctors',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token':token
    },
    });

    res=await res.json();
    setDoctors(res)
    setFilteredDoctors(res)
    
  }
  

  return (
    <div className="list-container">
       <SearchBar searchText={searchText} handleSearch={handleSearch}/>
       {/* <input type="text" name="searchText" value={searchText} onChange={handleSearch}/> */}
    
    <div className="list">
        {
          filteredDoctors.map(m=><Card item={m}/>)
        }
      
      </div>
      </div>
  )
}

export default DoctorDetails

