import React from 'react';
// icons
import MenuIcon from '../../assets/solar_menu-dots-bold.png'
// styles
import './Ticket.scss';

const Ticket = ({ ticket, index }) => {

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
    <div className='ticket'>
      <div className='ticket__header'>
        <div className={handleTicketTypeColor(ticket.type)}>
          <span></span>
          <small>{ticket.type}</small>
        </div>

        <div className='ticket__actions'>
          <div>
            <img src={MenuIcon} alt='' />
          </div>
        </div>
      </div>
      <h4 className='ticket__name'>{ticket.name}</h4>
      <p className='ticket__description'>{ticket.description}</p>
      <span className='ticket__owner teg'>Youssef Nasrallah</span>
    </div>
  )
}

export default Ticket