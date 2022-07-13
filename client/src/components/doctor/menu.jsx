import React, { useState,useEffect } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";

import DoctorProfile from "./doctorProfile";
import PatientList from "./../patientList";
import Notification from "./notification";


const Menu = ({socket}) => {

  const [notifications, setNotifications] = useState([]);
    const [not, setNot] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("in Useeffect");
        socket.on("getNotification", (data) => {
            //console.log(data, "data");
            // console.log("data678");
            setNotifications((prev) => ([...prev, data]));
        });

        setNot([2, 3, 5]);
    }, [socket]);


     const displayNotification = ({ senderName }) => {
        return (
            <span className="notification">{`${senderName} liked your post.`}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };




  return (
    <div>
 <div className="staff-container">
        <div className="profile">
          <ul className="navbar-ul">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/doctor">
                Profile
              </NavLink>
            </li>
             <li className="nav-item">
              {/* <NavLink className="nav-link" to="/doctor/notification">
              
              </NavLink> */}
              <button onClick={()=>{setOpen(!open)}}> Notifications{notifications?notifications.length:"00"}</button>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/doctor/view-patient">
                View Patients
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/doctor" component={DoctorProfile} />
            <Route path="/doctor/view-patient"><PatientList/></Route> 
             <Route path="/doctor/notification"><Notification socket={socket}/></Route> 
          </Switch>
           {open && (
                <div className="notifications">
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                        Mark as read
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Menu;


