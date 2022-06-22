import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin"></Route>
          <Route path="/admin"></Route>
          <Route path="/admin"></Route>
        </Switch>
      </div>
    );
  }
}

export default Navbar;
