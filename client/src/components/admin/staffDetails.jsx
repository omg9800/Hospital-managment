import React, { useState,useEffect } from "react";
import Card from '../staffCard/StaffCard';

const StaffList = () => {

  const [staffs, setStaffs] = useState([]);


  useEffect(() => {
   
    fetchStaffs();

  }, [])

  const fetchStaffs=async()=>{

    const token=JSON.parse(localStorage.getItem('admin-token'));

   let res=await fetch('http://localhost:3000/api/staffs',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token':token
    },
    });

    res=await res.json();
    setStaffs(res)
    
  }


  return (
    <div className="list">
       {staffs.map(m=><Card item={m}/>)}
      </div>
  )
}

export default StaffList
