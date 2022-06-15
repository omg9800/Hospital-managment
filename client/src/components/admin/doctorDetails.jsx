import React, { useState,useEffect } from "react";
// import Card from '../doctorCard';
import Card from "../doctorCard/DoctorCard";

const DoctorDetails = () => {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
   
    fetchDoctors();

  }, [])

  const fetchDoctors=async()=>{

    const token=JSON.parse(localStorage.getItem('admin-token'));

   let res=await fetch('http://localhost:3000/api/doctors',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token':token
    },
    });

    res=await res.json();
    setDoctors(res)
    
  }
  

  return (
    <div className="list">
        {
          doctors.map(m=><Card item={m}/>)
        }
      
      </div>
  )
}

export default DoctorDetails

