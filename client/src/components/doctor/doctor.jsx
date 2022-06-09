import React, { Component } from "react";
import DoctorList from "../doctorList";
import PatientDetail from "../patientList";
class Doctor extends React.Component {
  render() {
    return (
      <div>
        <div className="doctor-main">
          <DoctorList />
        </div>
      </div>
    );
  }
}

export default Doctor;
