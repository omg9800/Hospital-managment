import React,{useState,useEffect} from 'react'


const Appointment = ({person}) => {

    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        fetchAppointments();
    },[]);

   const fetchAppointments=async()=>{
 
    let token=JSON.parse(localStorage.getItem('staff-token'));
 
   let res=await fetch('http://localhost:3000/api/appointments/appointment',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token':token
    },
    body:JSON.stringify(person)

    });

    res=await res.json();
    setAppointment(res)
    console.log(res);
  }

  return (
    <div>
     <h1>Appointment</h1>
     {}
    </div>
  )
}

export default Appointment