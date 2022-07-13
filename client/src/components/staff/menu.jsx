import React from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";

import ViewPatient from "../patientList";
import AddPatient from "./addPatient";
import Profile from "./staffProfile";
import DoctorList from "../admin/doctorDetails";

const Menu = ({doctor,socket}) => {

  return (
    <div className="staff-container">
        <div className="profile">
          <ul className="navbar-ul">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/staff">
                Profile
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/staff/add-patient">
                Add Patient
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/staff/view-patient">
                View Patients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/staff/view-doctors">
                View Doctors
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
            <Route exact path="/staff" component={Profile} />
            <Route path="/staff/view-patient" > <ViewPatient/></Route>
            <Route path="/staff/view-doctors"><DoctorList/> </Route> 
            <Route path="/staff/add-patient"><AddPatient doctor={doctor} socket={socket}/></Route>
          </Switch>
        </div>
      </div>
  )
}

export default Menu;