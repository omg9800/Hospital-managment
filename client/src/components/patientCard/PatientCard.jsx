import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./patientCard.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { deleteSchool } from "../../services/service";

const PatientCard = ({ item,role}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("./edit", { state: { item } });
  };

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

  return (
    <div className="card">
      <div className="school-details">
        <div className="col">
          <div className="group2">
            <div>
              <p className="bold">Name</p>
              <p>{"Namiata Saxen"}</p>
            </div>
            <div>
              <p className="bold">Age</p>
              <p>{"21"}</p>
            </div>
          </div>
          <div className="group2">
            <div>
              <p className="bold">Weight</p>
              <p>{"50"}</p>
            </div>
            <div>
              <p className="bold">Symptoms</p>
              <p>{"Fever"}</p>
            </div>
          </div>
        </div>
        <div className="long-text">
          <div className="about">
            <p className="bold">Address</p>
            <p>{"Patna, Bihar"}</p>
          </div>
        </div>
      </div>
      { 
      role=='staff' &&
      <div className="buttons">
       
        <div className="delete" onClick={handleDelete}>
          <button className="edit-btn">
            Assign
          </button>
        </div>
      </div>
      }

      {
        role=='doctor' && 
        <div className="buttons">
       
        <div className="delete" onClick={handleDelete}>
          <button className="edit-btn">
            <MdDelete />
          </button>
        </div>
      </div>
      }
    </div>
  );
};

export default PatientCard;
