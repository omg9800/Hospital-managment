import React, { useEffect,useState } from "react";
import '../../components/style.scss'


const AddDoctor = () => {

  const [doctor, setDoctor] = useState({
    name: "",
    age: "",
    phone:"",
    email: "",
    address: "",
    password:"",
    specialization:"",
    about:"",
    role:"doctor",
    password:""
  });

   const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setDoctor(prev=>({...prev, [name]: value }));
  };

  const addDoctor = async(e) => {
     try {
      
   let res=await fetch('http://localhost:3000/api/users',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor)});
   
    res=await res.json();

    const {staff,token}=res;

    console.log(res);

    // localStorage.setItem('admin',JSON.stringify(staff));
    // localStorage.setItem('token',token);

    // if (person.role === "admin") history.push("/admin");
   

     e.preventDefault();
      
    } catch (error) {
      console.log(error);
    }
   

  };

 return (
      <div className="form-container">
        
        <div className="form">
          <li>
            <h1>Add Doctor</h1>
          </li>
          <li>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={doctor.age}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={doctor.phone}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
            />
          </li>

           <li>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
            />
          </li>

               <li>
            <input
              placeholder="Specialization"
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
            />
          </li>

          <li>
            <textarea
              placeholder="Address"
              type="text"
              name="address"
              value={doctor.address}
              onChange={handleChange}
            />
          </li>

           <li>
            <textarea
              placeholder="About"
              type="text"
              name="about"
              value={doctor.about}
              onChange={handleChange}
            />
          </li>
           <li>
            <button className="btn-add" onClick={addDoctor}>ADD</button>
          </li>

</div>
         
        
      </div>
  )
}

export default AddDoctor;


