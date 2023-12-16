import React, { useState } from 'react';
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

  const handleTicketTypeColor = (type) => {
    if (type === 'feature') {
      return 'ticket__type blue'
    } else if (type === 'bug') {
      return 'ticket__type green'
    } else {
      return 'ticket__type red'
    }
  }

  return (
    <>
      <div className='ticket'>
        <div className='ticket__header'>
          <div className={handleTicketTypeColor(ticket.type)}>
            <span></span>
            <small>{ticket.type}</small>
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
          <div className='ticket__created_at'>Updated_at: <span>{ticket.created_at}</span></div>
        </div>

        <h4 className='ticket__name'>{ticket.name}</h4>
        <p className='ticket__description'>{ticket.description}</p>
        <div className='ticket__owner'>
          <span><b>Owner: </b></span>
          <span className='tag'>Youssef Nasrallah</span>
        </div>
      </div>

      {updateTicketForm && <UpdateTicketForm setUpdateTicketForm={setUpdateTicketForm} ticket={ticket} />}
    </>
  )
}

export default Ticket