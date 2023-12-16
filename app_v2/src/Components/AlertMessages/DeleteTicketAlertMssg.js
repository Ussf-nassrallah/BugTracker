import React, { useState } from 'react';
import axios from 'axios';
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import LoadingRoller from '../Loading/LoadingRoller';

const DeleteTicketAlertMssg = ({ setDeleteTicketAlertMssg, ticket }) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTicketDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .delete(`http://127.0.0.1:5000/api/v1/tickets/${ticket.id}`)
      .then((data) => {
        // console.log(data);
        setSuccessMessage(true);
        setInterval(() => {
          setDeleteTicketAlertMssg(false);
          // navigate('/dashboard/projects');
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
        <h5>Delete "{ticket.title}"!</h5>
        <p>Are you sure want to delete "{ticket.title}" ?</p>
        {successMessage && <small>✅ Ticket Deleted successfully</small>}
        <div className='buttons'>
          <button className='btn btn__light' onClick={() => setDeleteTicketAlertMssg(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>

          <button className='btn btn__danger' onClick={handleTicketDelete}>
            {loading ? <LoadingRoller /> : <span><MdDelete className='icon' />Delete</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTicketAlertMssg