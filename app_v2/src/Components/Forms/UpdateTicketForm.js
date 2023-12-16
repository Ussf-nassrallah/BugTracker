import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import LoadingRoller from '../Loading/LoadingRoller';
// Icons
import { MdClose, MdOutlineCancel, MdEdit, MdOutlineWarning } from "react-icons/md";
// Styles
import './Forms.scss';

const UpdateTicketForm = ({ setUpdateTicketForm, ticket }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  // Ticket Data
  const [ticketName, setTicketName] = useState(ticket.title);
  const [ticketDescription, setTicketDescription] = useState(ticket.description);
  const [ticketType, setTicketType] = useState(ticket.type);
  const [ticketStatus, setTicketStatus] = useState(ticket.status);
  // get user information : decodetoken
  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setTicketType(value);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setTicketStatus(value);
  };

  // const navigate = useNavigate();

  const handleTicketUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const request = {
      created_by: user.id,
      parent_id: ticket.parent_id,
      title: ticketName,
      description: ticketDescription,
      ticket_type: ticketType,
      status: ticketStatus,
    };

    await axios
      .put(`http://127.0.0.1:5000/api/v1/tickets/${ticket.id}`, request)
      .then((data) => {
        // console.log(data);
        setSuccessMessage(true);
        setErrorMessage({});
        setInterval(() => {
          setUpdateTicketForm(false);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  // useEffect(() => { fetchUsers() }, []);


  return (
    <div className="project__form">
      <form className="form" onSubmit={handleTicketUpdate}>
        <h2>Update Ticket Information</h2>
        <p>
          For the purpose of industry regulation, your details are required.
        </p>
        {successMessage && <small>✅ Ticket Updated successfully</small>}
        {/* ticket name */}
        <div className={errorMessage.name ? "error form__div" : "form__div"}>
          <label htmlFor="name" className="form__label">
            Ticket Title<span>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form__input"
            placeholder="Ticket Title"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
          />
          {errorMessage.name && <small className='error__message'>{errorMessage.name}</small>}
        </div>

        {/* ticket Description */}
        <div className={errorMessage.description ? "error form__div" : "form__div"}>
          <label htmlFor="description" className="form__label">
            Ticket Description<span>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            className="form__input"
            placeholder="Ticket Description"
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
          ></textarea>
          {errorMessage.description && <small className='error__message'>{errorMessage.description}</small>}
        </div>

        {/* project collaborators */}
        <div className={errorMessage.members ? "error form__div" : "form__div"}>
          {/* <label htmlFor="collaborators" className="form__label">
            Project Collaborators<span>*</span>
          </label>
          {users && (
            <Select
              options={users}
              isMulti
              placeholder='Select collaborators...'
              onChange={(e) => {
                const members = e.map((member) => member.value);
                setMembers(members);
              }}
            />
          )}
          {errorMessage.members && <small className='error__message'>{errorMessage.members}</small>} */}
          <p className='form__div__warning'><MdOutlineWarning className='icon' />stay tuned: in a few days you can assign the project Ticket to a specific project member</p>
        </div>

        {/* Ticket type */}
        <div className={errorMessage.type ? "error form__div" : "form__div"}>
          <label htmlFor='type' className='form__label'>Ticket Type<span>*</span></label>
          <select id='type' className="form__input" value={ticketType} onChange={handleTypeChange}>
            <option value='feature'>feature</option>
            <option value='issue'>issue</option>
            <option value='bug'>bug</option>
          </select>
          {errorMessage.role && <small className='error__message'>{errorMessage.role}</small>}
        </div>

        {/* Ticket status */}
        <div className={errorMessage.status ? "error form__div" : "form__div"}>
          <label htmlFor='status' className='form__label'>Ticket Status<span>*</span></label>
          <select id='status' className="form__input" value={ticketStatus} onChange={handleStatusChange}>
            <option value='Proposed'>Proposed</option>
            <option value='In Progress'>In Progress</option>
            <option value='Dev Complete'>Dev Complete</option>
          </select>
          {errorMessage.status && <small className='error__message'>{errorMessage.status}</small>}
        </div>

        {/* submit */}
        <div className='submit-btn'>
          <button className='btn btn__light' onClick={() => setUpdateTicketForm(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>
          <button className='btn btn__secondary'>
            {loading ? <LoadingRoller /> : <span><MdEdit className='icon' />Update Ticket</span>}
          </button>
        </div>
        <div className="close-icon" onClick={() => setUpdateTicketForm(false)}>
          <MdClose />
        </div>
      </form>
    </div>
  )
}

export default UpdateTicketForm