import React, { useEffect,useState} from "react";
import userlogo from "../../styles/user.png";


const AdminProfile = () => {

  const [staff, setStaff] = useState({
    name:"",
    age:"",
    phone:"",
    email:"",
    address:"",
    about:""
  });

  useEffect(() => {
    
  let staff=JSON.parse(localStorage.getItem('staff'));
  const {name,email,phone,address,about}=staff;
  setStaff({name,email,phone,address,about});
  
  }, [])
  

  return (
     <div className="App">
        <div className="myprofile">
          <img src={userlogo} />

          <ul>
          
              <li>{ staff.name}</li>
              <li>{ staff.phone}</li>
              <li>{ staff.email}</li>
              <li>{ staff.address}</li>
              <li>{ staff.about}</li>
          
          </ul>
        </div>
      </div>
  )
}

export default AdminProfile


