import React from 'react';
import { FaEdit } from "react-icons/fa";


const Ticket = ({ text }) => {
  return (
    <div className='ticket'>
      <div className='ticket__header'>
        <p className='ticket__name'>{text}</p>
        <div className='ticket__cta'>
          <FaEdit className='icon' />
        </div>
      </div>
    </div>
  )
}

export default Ticket