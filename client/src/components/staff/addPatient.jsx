import React, { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom'



const AddPatient = () => {

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    weight: "",
    symptoms: "",
    address: "",
    phone:"",
    email:"",
    password:"",
    doctorId:"",
    role:"staff"
  })

  // const [doctorName, setDoctorName] = useState(second)

  const location=useLocation();


 const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPatient(prev=>({...prev, [name]: value }));
  };



  const handleSubmit = async(e) => {
   
    const staffToken=JSON.parse(localStorage.getItem('staff-token'))
    try {
      let res=await fetch('http://localhost:3000/api/appointments',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'x-auth-token':staffToken
      },
      body:JSON.stringify(patient)

    })
   
    res=await res.json();
    console.log(res);
 
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
   
  };


  useEffect(() => {
    console.log(location.state,location.state.doctor);
    const { _id:doctorId,name:doctorName}=location.state.doctor;
    setPatient(prev=>({...prev,doctorId:doctorId}))
  }, [])

  console.log(patient);
  

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
              placeholder="Phone"
              type="text"
              name="phone"
              value={patient.phone}
              onChange={handleChange}
            />
          </li>
            <li>
            <input
              placeholder="Doctor Name"
              type="text"
              name="doctorName"
              value={location.state.doctor.name}
              // onChange={handleChange}
            />
          </li>
           <li>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
            />
          </li>
           <li>
            <input
              placeholder="Password"
              type="Password"
              name="password"
              value={patient.password}
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
              type="text"
              name="weight"
              value={patient.weight}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Symptoms"
              type="text"
              name="symptoms"
              value={patient.symptoms}
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


