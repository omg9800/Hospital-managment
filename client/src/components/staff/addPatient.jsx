import React, { useState,useEffect } from "react";


const AddPatient = () => {

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    weight: 0,
    symptoms: "",
    address: "",
    phone:""

  })

 const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPatient(prev=>({...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log(this.state);

    e.preventDefault();
  };

  return (
    <div className="form-container">
        <div className="form">
          <li>
            <h1>Add Patient</h1>
          </li>
          <li>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Weight"
              type="number"
              name="weight"
              value={patient.weight}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Problem"
              type="text"
              name="problem"
              value={patient.problem}
              onChange={handleChange}
            />
          </li>
          <li>
            <textarea
              placeholder="Address"
              type="text"
              name="address"
              value={patient.address}
              onChange={handleChange}
            />
          </li>
          <li>
            <button onClick={handleSubmit}>ADD</button>
          </li>
        </div>
      </div>
  )
}

export default AddPatient;


