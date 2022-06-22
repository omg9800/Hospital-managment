import React, { useEffect,useState} from "react";
import userlogo from "../../styles/user.png";


const DoctorProfile = () => {

  const [doctor, setDoctor] = useState({
    name:"",
    age:"",
    phone:"",
    email:"",
    address:"",
    about:""
  });

  useEffect(() => {
    
  let doctor=JSON.parse(localStorage.getItem('doctor'));
  const {name,email,phone,address,about}=doctor;
  setDoctor({name,email,phone,address,about});
  
  }, [])
  

  return (
     <div className="App">
        <div className="myprofile">
          <img src={userlogo} />

          <ul>
          
              <li>{ doctor.name}</li>
              <li>{ doctor.phone}</li>
              <li>{ doctor.email}</li>
              <li>{ doctor.address}</li>
              <li>{ doctor.about}</li>
          
          </ul>
        </div>
      </div>
  )
}

export default DoctorProfile


