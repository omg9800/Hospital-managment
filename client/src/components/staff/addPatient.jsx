import React, { Component } from "react";

class Staff extends React.Component {
  state = {
    name: "",
    age: "",
    weight: 0,
    problem: "",
    address: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    console.log(this.state);

    e.preventDefault();
  };

  render() {
    return (
      <div className="form-container">
        <form>
          <li>
            <h1>Add Patient</h1>
          </li>
          <li>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Weight"
              type="number"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Problem"
              type="text"
              name="problem"
              value={this.state.problem}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <textarea
              placeholder="Address"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <button onClick={this.handleSubmit}>ADD</button>
          </li>
        </form>
      </div>
    );
  }
}

export default Staff;
