import React, { useState,useEffect } from "react";
import PatientCard from "./patientCard/PatientCard";
import SearchBar from './searchBar';

const PatientList=() =>{
 
  const [patients, setPatients] = useState([]);

let data=patients;

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
    console.log(res);
  }
     catch (error) {
      console.log(error);
    }

  }


    return (
      <div className="list-container">
        <SearchBar/>
       
      <div className="list">
        {patients.map((m) => (
          <PatientCard item={m}/>
        ))}
      </div>
      </div>
    );
  
}

export default PatientList;
