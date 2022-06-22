import React, { Component } from "react";
import DoctorCard from "./doctorCard/DoctorCard";
import PatientCard from "./patientCard/PatientCard";

class DoctorList extends React.Component {
  state = {
    data: [
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
    ],
  };
  render() {
    return (
      <div className="list">
      
        {this.state.data.map((m) => (
          <DoctorCard />
        ))}
      </div>
    );
  }
}

export default DoctorList;
