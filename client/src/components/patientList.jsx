import React, { Component } from "react";
import PatientCard from "./patientCard/PatientCard";
import SearchBar from './searchBar';

const PatientList=() =>{
 
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
    ];


    return (
      <div className="list-container">
        <SearchBar/>
       
      <div className="list">
        {data.map((m) => (
          <PatientCard />
        ))}
      </div>
      </div>
    );
  
}

export default PatientList;
