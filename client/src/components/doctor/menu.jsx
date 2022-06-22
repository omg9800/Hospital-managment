import React, { Component } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";

import DoctorProfile from "./doctorProfile";
import PatientList from "./../patientList";

class Menu extends React.Component {
  render() {
    return (
      <div className="staff-container">
        <div className="profile">
          <ul className="navbar-ul">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/doctor">
                Profile
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/doctor/view-patient">
                View Patients
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/doctor" component={DoctorProfile} />
            <Route path="/doctor/view-patient" exact component={PatientList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Menu;
