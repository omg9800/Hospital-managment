import React, { Component } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";

class StaffMenu extends React.Component {
  render() {
    return (
      <div className="staff-parent">
        <div className="menu">
          <ul className="menu-ul">
            <li className="menu-item1">
              <NavLink
                className="nav-link "
                aria-current="page"
                to="/admin/staff-menu/add-staff"
              >
                Add Staff
              </NavLink>
            </li>
            <li className="menu-item2">
              <NavLink className="nav-link" to="/admin/staff-menu/view-staffs">
                View Staffs
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

export default StaffMenu;
