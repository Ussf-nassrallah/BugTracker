import React, { useState, useEffect } from 'react';
import axios from 'axios';
// icons
import { MdEdit, MdDelete } from 'react-icons/md';
import MenuIcon from '../../assets/solar_menu-dots-bold.png'
// Components
import UpdateTicketForm from '../Forms/UpdateTicketForm';
// styles
import './Ticket.scss';

const Ticket = ({ ticket, index }) => {
  const [dropDown, setDropDown] = useState(false);
  const [updateTicketForm, setUpdateTicketForm] = useState(false);
  const [members, setMembers] = useState([]);

  const handleTicketTypeColor = (type) => {
    if (type === 'feature') {
      return 'ticket__type blue'
    } else if (type === 'bug') {
      return 'ticket__type green'
    } else {
      return 'ticket__type red'
    }
  }

  useEffect(() => {
    const fetchMembers = async () => {
      // setLoading(true);
      await axios.get(`http://127.0.0.1:5000/api/v1/projects/${ticket.parent_id}/members`)
        .then((data) => {
          setMembers(data.data);
        })
        .catch((error) => {
          console.log(error);
        })
      // .finally(() => {
      //   setLoading(false);
      // });
    };

    fetchMembers();
  }, []);

  let ticketOwner = members.find(m => m.id === ticket.created_by);
  let username = ticketOwner ? ticketOwner.username : null;


  return (
    <>
      <div className='ticket'>
        <div className='ticket__header'>
          <div className={handleTicketTypeColor(ticket.ticket_type)}>
            <span></span>
            <small>{ticket.ticket_type}</small>
          </div>

          <div className='ticket__actions' onClick={() => setDropDown(!dropDown)}>
            <div>
              <img src={MenuIcon} alt='' />
            </div>
          </div>

          {dropDown && <div className='ticket__header__dropdown'>
            <ul>
              <li onClick={() => setUpdateTicketForm(true)}><MdEdit className='icon' /> <span>Edit</span></li>
              <li><MdDelete className='icon' /> <span>Delete</span></li>
            </ul>
          </div>}
        </div>

        <div className='ticket__dates'>
          <div className='ticket__created_at'>Created_at: <span>{ticket.created_at}</span></div>
          <div className='ticket__created_at'>Updated_at: <span>{ticket.updated_at}</span></div>
        </div>

        <h4 className='ticket__name'>{ticket.title}</h4>
        <p className='ticket__description'>{ticket.description}</p>
        <div className='ticket__owner'>
          <span><b>Owner: </b></span>
          <span className='tag'>{username}</span>
        </div>
      </div>

      {updateTicketForm && <UpdateTicketForm setUpdateTicketForm={setUpdateTicketForm} ticket={ticket} />}
    </>
  )
}

export default Ticket