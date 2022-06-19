import React, { useEffect,useState } from "react";

const AddStaff = () => {

  const [staff, setStaff] = useState({
    name: "",
    age: "",
    phone:"",
    email: "",
    address: "",
    password:"",
    role:"staff",
    password:""
  });

   const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setStaff(prev=>({...prev, [name]: value }));
  };

  const addStaff = async(e) => {
     try {
      
   let res=await fetch('http://localhost:3000/api/users',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff)});
   
    res=await res.json();

    // const {staff,token}=res;

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
            <h1>Add Staff</h1>
          </li>
          <li>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={staff.name}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={staff.age}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={staff.phone}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={staff.email}
              onChange={handleChange}
            />
          </li>

           <li>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={staff.password}
              onChange={handleChange}
            />
          </li>

          <li>
            <textarea
              placeholder="Address"
              type="text"
              name="address"
              value={staff.address}
              onChange={handleChange}
            />
          </li>

            <li>
            <button onClick={addStaff}>ADD</button>
          </li>

</div>
         
        
      </div>
  )
}

export default AddStaff;


