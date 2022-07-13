import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';

const LoginForm = ({person,setPerson}) => {

  const [otp, setOtp] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {

    try {
      
   let res=await fetch(`http://localhost:3000/api/patients/otp-generate`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({phone:person.phone})
  });
   
    res=await res.json();
    setOtp(res.otp);
    console.log(res);

     e.preventDefault();
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin=async()=>{
    try {

    let response=await fetch(`http://localhost:3000/api/auth`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(person)
  });
   
    response=await response.json();
    localStorage.setItem('patient-token',JSON.stringify(response.token))
       history.push("/patient");
    } catch (error) {
      console.log(error);
    }
  }


  return (
<div className="home-parent">
      <div className="form">
       { otp!=="" && <p style={{color:"white"}}>{`Your Otp is ${otp}.` }</p>}

        <li>
          <input
            placeholder="Phone"
            type="text"
            name="phone"
            value={person.phone}
            onChange={handleChange}
          />
        </li>
       {otp && <li>
          <input
            placeholder="Enter your Otp"
            type="password"
            name="password"
            value={person.password}
            onChange={handleChange}
          />
        </li>
       }

        {!otp && <li>
          <button className='btn otp' onClick={handleSubmit}>Request Otp</button>
        </li>}
       {otp && <li>
          <button className='btn' onClick={handleLogin}>Login</button>
        </li>
        }
      </div>
    </div>
  )
}

export default LoginForm