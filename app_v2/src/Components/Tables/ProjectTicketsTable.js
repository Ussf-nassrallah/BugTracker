import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { MdArrowDownward } from "react-icons/md";
// Styles
import './Table.scss'

const TicketsTable = ({tickets}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ticket owner <MdArrowDownward className='icon' /></th>
          <th>Ticket name <MdArrowDownward className='icon' /></th>
          <th>Ticket type <MdArrowDownward className='icon' /></th>
          <th>Ticket status <MdArrowDownward className='icon' /></th>
          <th>Created_at <MdArrowDownward className='icon' /></th>
          <th>Actions <MdArrowDownward className='icon' /></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, index) => <tr key={index}>
          <td>{ticket.assignedTo}</td>
          <td>{ticket.name}</td>
          <td>{ticket.type}</td>
          <td>{ticket.status}</td>
          <td>{ticket.created_at}</td>
          <td className='action__btns'>
            <button className='action__btns__edit'>Edit</button>
            <button className='action__btns__delete'>Delete</button>
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default TicketsTable