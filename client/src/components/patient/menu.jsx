import React from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";


import Profile from "../staff/staffProfile";
import DoctorList from "../admin/doctorDetails";
import AddPatient from './../staff/addPatient';
import Appointment from "./appointment/appointment";

const Menu = ({doctor,socket,person}) => {

  return (
    <div className="staff-container">
        <div className="profile">
          <ul className="navbar-ul">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/patient/profile">
                Profile
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/staff/add-patient">
                Add Patient
              </NavLink>
            </li> */}
         
            <li className="nav-item">
              <NavLink className="nav-link" to="/patient/view-doctors">
                View Doctors
              </NavLink>
            </li>
               <li className="nav-item">
              <NavLink className="nav-link" to="/patient/appointments">
                Appointments
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
            <Route  path="/patient/appointments" > <Appointment person={person}/> </Route>
            <Route path="/patient/profile" component={Profile} />
           
            <Route  path="/patient/view-doctors"><DoctorList/> </Route> 
            <Route path="/patient/add-patient"><AddPatient doctor={doctor} socket={socket} person={person}/></Route>
          </Switch>
        </div>
      </div>
  )
}

export default Menu;