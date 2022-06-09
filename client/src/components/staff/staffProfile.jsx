import React, { Component } from "react";
import userlogo from "../../styles/user.png";
class StaffProfile extends React.Component {
  state = {
    profile: [
      "Omprakash Kumar",
      "9929465066",
      "omg982000@gmail.com",
      "Patna, Bihar",
    ],
  };
  render() {
    return (
      <div className="App">
        <div className="myprofile">
          <img src={userlogo} />

          <ul>
            {this.state.profile.map((m) => (
              <li>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default StaffProfile;
