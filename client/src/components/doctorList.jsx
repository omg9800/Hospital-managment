import React, { Component } from "react";
import DoctorCard from "./doctorCard/DoctorCard";
import PatientCard from "./patientCard/PatientCard";
import SearchBar from "./searchBar";

const DoctorList=()=> {
 
    const data= [
      {
        Name: "Prakash Singh",
        Age: 21,
        Weight: 53,
        Symptoms: "Fever",
        Phone: "9987654321",
        Address: "Patna, Bihar",
      },
      {
        Name: "Naresh Singh",
        Age: 21,
        Weight: 53,
        Symptoms: "Fever",
        Phone: "9987654321",
        Address: "Patna, Bihar",
      },
      {
        Name: "Naresh Singh",
        Age: 21,
        Weight: 53,
        Symptoms: "Fever",
        Phone: "9987654321",
        Address: "Patna, Bihar",
      },
      {
        Name: "Naresh Singh",
        Age: 21,
        Weight: 53,
        Symptoms: "Fever",
        Phone: "9987654321",
        Address: "Patna, Bihar",
      },
    ]



   const handleSearch=(e)=>{
      const val=e.target.value;


   }




    return (
      <div className="list-container">
      <SearchBar/>
      <div className="list">
      
        {data.map((m) => (
          <DoctorCard />
        ))}
      </div>
      </div>
    );
  }


export default DoctorList;
