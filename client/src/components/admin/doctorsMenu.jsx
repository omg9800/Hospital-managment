import React, { Component } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";

class DoctorMenu extends React.Component {
  render() {
    return (
      <div className="doctor-container">
        <div className="menu">
          <ul className="menu-ul">
            <li className="menu-item1">
              <NavLink
                className="nav-link "
                aria-current="page"
                to="/admin/doctor-menu/add-doctor"
              >
                Add Doctor
              </NavLink>
            </li>
            <li className="menu-item2">
              <NavLink
                className="nav-link"
                to="/admin/doctor-menu/view-doctors"
              >
                View Doctors
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          {/* <Switch>
            <Route path="/admin-profile" component={Profile} />
            <Route path="/doctors-details" component={Profile} />
            <Route path="/admins-details" component={ViewPatient} />
            <Route path="/staffs-details" component={AddPatient} />
          </Switch> */}
        </div>
      </div>
    );
  }
}

export default DoctorMenu;
