import React, { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom'
import axios from "axios";
import img from "../../img/profile.png"
import { validateAppointment } from "../../utils";
// import '../../components/style.scss';

const AddPatient = ({socket,doctor:staff,person}) => {

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    weight: "",
    symptoms: "",
    address: "",
    phone:person? person.phone : staff.phone,
    doctorId:"",
  
  })
  

  const location=useLocation();


 const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPatient(prev=>({...prev, [name]: value }));
  };


  const initPayment = (data) => {
		const options = {
			key: "rzp_test_jp686rc60z0bCh",
			amount: "1000",
			currency: "IND",
			name: "HOSPITAL+",
			description: "Test Transaction",
			image: img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:3000/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};


  const handleSubmit = async(e) => {
   
    const staffToken=JSON.parse(localStorage.getItem('staff-token'))
    try {

    //   let res=await fetch('http://localhost:3000/api/appointments',{
    //   method:"POST",
    //   headers:{
    //     'Content-Type':'application/json',
    //     'x-auth-token':staffToken
    //   },
    //   body:JSON.stringify(patient)

    // })
   
    // res=await res.json();
    // console.log(res);

 
    // socket.emit("sendNotification", {
    //   senderName: staff.email,
    //   receiverName: location.state.doctor.email,
     
    // });

    // const orderUrl = "http://localhost:3000/api/payments/orders";
		// 	const { data } = await axios.post(orderUrl, { amount: 1000 });
		// 	console.log(data);
		// 	initPayment(data.data);

    //   e.preventDefault();
    // } catch (error) {
    //   console.log(error);
    // }

    let res=validateAppointment(patient);
    if(res!=='success') 
    {
      alert(res);
      return;
    }

        const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        const result = await axios.post('http://localhost:3000/api/payments/create-order', {
          amount: "1000",
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('http://localhost:3000/api/payments/get-razorpay-key');

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            try{
            const result = await axios.post('http://localhost:3000/api/payments/pay-order', {
              amount: amount,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              patient
            });
            alert("Payments Successful");
          }
          catch(error){
            alert(error);
          }
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '1111112345',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
      }
    };
    document.body.appendChild(script);
  }
  catch(error) {
    console.log(error);
  }
  };


  useEffect(() => {
    console.log(location.state,location.state.doctor);
    const { _id:doctorId,name:doctorName}=location.state.doctor;
    console.log(location.state.doctor,'doctor==========');
    setPatient(prev=>({...prev,doctorId:doctorId}))
  }, [])

  console.log(patient);
  

  return (
    <div className="form-container">
        <div className="form">
          <li>
            <h1>Add Patient</h1>
          </li>
          <li>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={patient.phone}
              // onChange={handleChange}
            />
          </li>
            <li>
            <input
              placeholder="Doctor Name"
              type="text"
              name="doctorName"
              value={location.state.doctor.name}
              // onChange={handleChange}
            />
          </li>
           {/* <li>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
            />
          </li>
           <li>
            <input
              placeholder="Password"
              type="Password"
              name="password"
              value={patient.password}
              onChange={handleChange}
            />
          </li> */}
          <li>
            <input
              placeholder="Age"
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Weight"
              type="text"
              name="weight"
              value={patient.weight}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              placeholder="Symptoms"
              type="text"
              name="symptoms"
              value={patient.symptoms}
              onChange={handleChange}
            />
          </li>
          <li>
            <textarea
              placeholder="Address"
              type="text"
              name="address"
              value={patient.address}
              onChange={handleChange}
            />
          </li>
          <li>
            <button className="btn-add" onClick={handleSubmit}>ADD</button>
          </li>
        </div>
      </div>
  )
}

export default AddPatient;


