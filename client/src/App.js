import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";

import "./App.css";
import "./components/style.scss";

import Home from "./components/home";
import Menu from "./components/staff/menu";

import AdminMenu from "./components/admin/main";
import PatientCard from "./components/patientCard/PatientCard";
import PatientDetail from "./components/patientList";
import DoctorMenu from "./components/doctor/menu";
import LoginForm from "./components/patient/loginForm";
import PatientMenu from './components/patient/menu';
import DoctorList from "./components/admin/doctorDetails";

function App() {

  const [socket, setSocket] = useState(null);

  const [person, setPerson] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [patient, setPatient] = useState({
    phone: "",
    password: "",
    role: "patient",
  });

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/admin">
          <AdminMenu />
        </Route>
        <Route path="/staff">
          <Menu doctor={person} socket={socket} />
          {/* <PatientCard /> */}
        </Route>
        <Route path="/doctor">
          <DoctorMenu socket={socket} />
        </Route>

        <Route path="/patient">
          {/* <LoginForm socket={socket} /> */}
          <PatientMenu person={patient} socket={socket} />
        </Route>

        <Route path="/patientLogin">
          <LoginForm socket={socket} person={patient} setPerson={setPatient} />
          {/* <PatientMenu /> */}
        </Route>



        <Route path="/">
          <Home person={person} setPerson={setPerson} socket={socket} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
