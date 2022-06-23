import { useEffect } from "react";
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

function App() {

  useEffect(() => {
    const socket = io("http://localhost:5000");
    console.log(socket);
  }, []);



  return (
    <div>
      <Switch>
        <Route path="/admin">
          <AdminMenu />
        </Route>
        <Route path="/staff">
          <Menu />
          {/* <PatientCard /> */}
        </Route>
        <Route path="/doctor">
          <DoctorMenu />
        </Route>
        <Route path="/patient">
          <LoginForm />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
