import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

function Home() {
  const [person, setPerson] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (person.role === "admin") history.push("/admin");
    else if (person.role === "doctor") history.push("/doctor");
    else if (person.role === "staff") history.push("/staff");
    e.preventDefault();
  };

  return (
    <div className="homeParent">
      <div className="form">
        <li>
          <select name="role" value={person.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
          </select>
        </li>
        <li>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={person.username}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={person.password}
            onChange={handleChange}
          />
        </li>
        <li>
          <button onClick={handleSubmit}>Login</button>
        </li>
      </div>
    </div>
  );
}

export default Home;
