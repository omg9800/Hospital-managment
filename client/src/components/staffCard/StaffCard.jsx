import React from "react";
import { Link, useHistory } from "react-router-dom";
import '../doctorCard/doctorCard.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { deleteSchool } from "../../services/service";

const Card = ({ item }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("./add-patient", { state: { item } });
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
              <p>{item.name}</p>
            </div>
            <div>
              <p className="bold">Phone</p>
              <p>{item.phone}</p>
            </div>
          </div>
          <div className="group2">
            <div>
              <p className="bold">Age</p>
              <p>{item.age}</p>
            </div>
            <div>
              <p className="bold">Address</p>
              <p>{item.address}</p>
            </div>
          </div>
        </div>
      
      </div>
      <div className="buttons">
        <div className="edit">
          <button className="edit-btn" onClick={handleClick}>
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
