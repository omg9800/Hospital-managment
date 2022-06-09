import React, { Component } from "react";

class AddStaff extends React.Component {
  state = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
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
            <h1>Add Staff</h1>
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
              placeholder="Phone"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={this.state.email}
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

export default AddStaff;
