import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';

const LoginForm = () => {

    const [person, setPerson] = useState({
    phone: "",
    password: "",
    role: "patient",
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
      
      let tok=JSON.parse(localStorage.getItem('staff-token'));
      console.log(tok);
   let res=await fetch('http://localhost:3000/api/auth',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token":tok
    },
    body: JSON.stringify(person)});
   
    res=await res.json();

    console.log(res);
    const {doctor,token,staff}=res;
    
    if(doctor)
    {
    localStorage.setItem('doctor',JSON.stringify(doctor));
    }
    else{
      localStorage.setItem('staff',JSON.stringify(staff));
    }
    localStorage.setItem(`${person.role}-token`,JSON.stringify(token));

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
          <input
            placeholder="phone"
            type="text"
            name="phone"
            value={person.phone}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={person.password}
            onChange={handleChange}
          />
        </li>
         <li>
          <button onClick={()=>{}}>Request Otp</button>
        </li>
        <li>
          <button onClick={()=>{}}>Login</button>
        </li>
        
      </div>
    </div>
  )
}

export default LoginForm