import React, { Component } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import ViewAdmin from "./adminDetails";
class AdminMenu extends React.Component {
  render() {
    return (
      <div className="staff-container">
        <div className="menu">
          <ul className="menu-ul">
            <li className="menu-item1">
              <NavLink
                className="nav-link "
                aria-current="page"
                to="/admin/admin-menu/add-admin"
              >
                Add Admin
              </NavLink>
            </li>
            <li className="menu-item2">
              <NavLink className="nav-link" to="/admin/admin-menu/view-admins">
                View Admins
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route
              exact
              path="/admin/admin-menu/view-admins"
              component={ViewAdmin}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AdminMenu;
