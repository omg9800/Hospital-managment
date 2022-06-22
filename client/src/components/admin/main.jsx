

import React, { Component } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import Profile from "./adminMenu";
import AdminMenu from "./adminMenu";
import DoctorMenu from "./doctorsMenu";
import StaffMenu from "./staffMenu";
import ViewStaff from "./staffDetails";
import ViewDoctor from "./doctorDetails";
import ViewAdmin from "./adminDetails";
import AddAdmin from "./addAdmin";
import AddDoctor from "./addDoctor";
import AddStaff from "./addStaff";
import AdminProfile from "./adminProfile";

const Menu=()=>  {

    return (
      <div className="staff-container">
        <div className="profile">
          <ul className="navbar-ul">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/admin"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/doctor-menu">
                Doctors
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/staff-menu">
                Staffs
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
            <Route exact path="/admin" component={AdminProfile} />
            <Route exact path="/admin/admin-menu" component={AdminMenu} />
            <Route exact path="/admin/doctor-menu" component={DoctorMenu} />
            <Route exact path="/admin/staff-menu" component={StaffMenu} />
            <Route
              exact
              path="/admin/doctor-menu/view-doctors"
              component={ViewDoctor}
            />
            <Route
              exact
              path="/admin/admin-menu/view-admins"
              component={ViewAdmin}
            />
            <Route
              exact
              path="/admin/staff-menu/view-staffs"
              component={ViewStaff}
            />
            <Route
              exact
              path="/admin/doctor-menu/add-doctor"
              component={AddDoctor}
            />
            <Route
              exact
              path="/admin/admin-menu/add-admin"
              component={AddAdmin}
            />
            <Route
              exact
              path="/admin/staff-menu/add-staff"
              component={AddStaff}
            />
            {/* <Route exact path="/admin/admin-profile" component={AdminProfile} /> */}
          </Switch>
        </div>
      </div>
    );
  }


export default Menu;
