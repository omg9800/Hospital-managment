import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

function Home() {
  const [person, setPerson] = useState({
    email: "",
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

  const handleSubmit = async(e) => {

    try {
      
   let res=await fetch('http://localhost:3000/api/auth',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person)});
   
    res=await res.json();

    const {doctor,token}=res;

    localStorage.setItem('doctor',JSON.stringify(doctor));
    localStorage.setItem('token',token);

    if (person.role === "admin") history.push("/admin");
    else if (person.role === "doctor") history.push("/doctor");
    else if (person.role === "staff") history.push("/staff");

     e.preventDefault();
      
    } catch (error) {
      console.log(error);
    }
   

   
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
            placeholder="Email"
            type="text"
            name="email"
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
