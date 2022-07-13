import React, { useState,useEffect } from "react";
import PatientCard from "./patientCard/PatientCard";
import SearchBar from './searchBar';

const PatientList=() =>{
 
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredpatients] = useState([]);
  const [searchText, setSearchText] = useState("")
  
  useEffect(() => {

   let filtered = patients.filter((m) =>
        m.name.toLowerCase().startsWith(searchText.toLowerCase())
      );

    setFilteredpatients(filtered);
    console.log(searchText,filtered);

  }, [searchText])

    const handleSearch=(e)=>{
    let val=e.target.value;
    setSearchText(val);
  }


useEffect(() => {
 getPatients()
}, [])


  const getPatients=async()=>{

    try {
      let token=JSON.parse(localStorage.getItem('staff-token'))
      let res=await fetch('http://localhost:3000/api/patients',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'x-auth-token':token
      }
    });

    res=await res.json();
    setPatients(res);
    setFilteredpatients(res)
    console.log(res);
  }
     catch (error) {
      console.log(error);
    }

  }


    return (
      <div className="list-container">
        <SearchBar searchText={searchText} handleSearch={handleSearch}/>
       
      <div className="list">
        {filteredPatients.map((m) => (
          <PatientCard item={m}/>
        ))}
      </div>
      </div>
    );
  
}

export default PatientList;
