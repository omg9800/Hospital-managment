import React, { useEffect,useState } from "react";



const AddAdmin = () => {

  const [admin, setAdmin] = useState({
    name: "",
    age: "",
    phone:"",
    email: "",
    address: "",
    password:"",
    role:"admin"
  });

   const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAdmin({ [name]: value });
  };

  const addDoctor = async(e) => {
     try {
      
   let res=await fetch('http://localhost:3000/api/users',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin)});
   
    res=await res.json();

    const {staff,token}=res;

    localStorage.setItem('admin',JSON.stringify(staff));
    localStorage.setItem('token',token);

    // if (person.role === "admin") history.push("/admin");
   

     e.preventDefault();
      
    } catch (error) {
      console.log(error);
    }
   

  };

 return (
      <div className="form-container">
        <form>
          <li>
            <h1>Add Admin</h1>
          </li>
          <li>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </li>

               <li>
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </li>

          <li>
            <textarea
              placeholder="Address"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </li>

          <li>
            <button onClick={this.handleSubmit}>ADD</button>
          </li>
        </form>
      </div>
  )
}

export default AddAdmin;


