import React from "react";
import { Link, useHistory } from "react-router-dom";
import './doctorCard.css';
import { FaEdit,FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { deleteSchool } from "../../services/service";

const DoctorCard = ({ item}) => {
  const history = useHistory();

  const handleClick = () => {
    const role=getStaffRole();
    const path=(role=="staff"?"./add-patient":"./edit");
    

    history.push(path, { state: { item } });
  };

  const getStaffRole=()=>{
    const staf=JSON.parse(localStorage.getItem('staff'));
    return staf.role;
  }

  const handleDelete = async () => {
    // let token = JSON.parse(localStorage.getItem("token"));
    // deleteSchool(token, schoolId)
    //   .then((res) => res.json())
    //   .then(() => {
    //     let updatedSchools = schools.filter(
    //       (school) => school._id !== schoolId
    //     );
    //     setSchools(updatedSchools);
    //   });
  };

  console.log(item,"=========");

  return (
    <div className="card">
      <div className="school-details">
        <div className="col">
          <div className="group2">
            <div>
              <p className="bold">Name</p>
              <p>{item.name}</p>
            </div>
            <div>
              <p className="bold">Age</p>
              <p>{item.age}</p>
            </div>
          </div>
          <div className="group2">
            <div>
              <p className="bold">Speciality</p>
              <p>{item.specialization}</p>
            </div>
            <div>
              <p className="bold">About</p>
              <p>{item.about}</p>
            </div>
          </div>
        </div>
        <div className="long-text">
          <div className="about">
            <p className="bold">Address</p>
            <p>{item.address}</p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="edit">
          <button className="edit-btn" onClick={handleClick}>
           {getStaffRole()=="staff" ?<FaPlusCircle />:<FaEdit/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
