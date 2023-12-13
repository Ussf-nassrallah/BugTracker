import React, { useState } from 'react';
import axios from 'axios';
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import LoadingRoller from '../Loading/LoadingRoller';

const DeleteAlertMssg = ({ setDeleteAlertMessage, project }) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleProjectDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .delete(`http://127.0.0.1:5000/api/v1/projects/${project.id}`)
      .then((data) => {
        // console.log(data);
        setSuccessMessage(true);
        setInterval(() => {
          setDeleteAlertMessage(false);
          navigate('/dashboard/projects');
        }, 5000);
      })
      .catch((error) => {
        // setErrorMessage(error.response.data.error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <div className='alert__mssg'>
      <div className='alert__mssg__content'>
        <h5>Delete "{project.name}"!</h5>
        <p>Are you sure want to delete "{project.name}" ?</p>
        {successMessage && <small>✅ Project Deleted successfully</small>}
        <div className='buttons'>
          <button className='btn btn__light' onClick={() => setDeleteAlertMessage(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>

          <button className='btn btn__danger' onClick={handleProjectDelete}>
            {loading ? <LoadingRoller /> : <span><MdDelete className='icon' />Delete</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlertMssg