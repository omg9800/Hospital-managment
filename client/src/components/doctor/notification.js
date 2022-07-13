import React, { useState, useEffect } from 'react'
import { MdNotificationsNone } from 'react-icons/md'


const Notification = ({ socket }) => {

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
    }, []);

    console.log(notifications, "notification=====");
    console.log(not, 'not=======');


    const displayNotification = ({ senderName }) => {
        return (
            <span className="notification">{`${senderName} liked your post.`}</span>
        );
    };

    const handleRead = () => {
        // setNotifications([]);
        setOpen(false);
    };



    return (
        <div className="navbar">
            <span className="logo">Lama App</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    {/* <img src={Notification} className="iconImg" alt="" /> */}
                    <MdNotificationsNone />
                    {
                        notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon" onClick={() => setOpen(!open)}>
                    {/* <img src={Message} className="iconImg" alt="" /> */}
                    <MdNotificationsNone />
                </div>
                {/* <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Settings} className="iconImg" alt="" />
                </div> */}
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                        Mark as read
                    </button>
                </div>
            )}
        </div>
    )
}

export default Notification