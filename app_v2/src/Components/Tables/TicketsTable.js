import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { MdArrowDownward } from "react-icons/md";

const TicketsTable = ({ tickets, projects }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project <MdArrowDownward className='icon' /></th>
          <th>Features <MdArrowDownward className='icon' /></th>
          <th>Issues <MdArrowDownward className='icon' /></th>
          <th>Bugs <MdArrowDownward className='icon' /></th>
          <th>Total <MdArrowDownward className='icon' /></th>
        </tr>
      </thead>
      <tbody>
        {projects && projects.map((project, index) => <tr key={index}>
          <td>
            <Link to={`/dashboard/tickets/${project.id}`}>{project.name}</Link>
          </td>

          <td className='ft'>
            <span className='tag'>
              {project.tickets.filter((ticket) => ticket.ticket_type === 'feature').length} Tickets
            </span>
          </td>

          <td className='it'>
            <span className='tag'>
              {project.tickets.filter((ticket) => ticket.ticket_type === 'issue').length} Tickets
            </span>
          </td>

          <td className='bt'>
            <span className='tag'>
              {project.tickets.filter((ticket) => ticket.ticket_type === 'bug').length} Tickets
            </span>
          </td>

          <td className='tt'><span className='tag'>{project.tickets.length} Tickets</span></td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default TicketsTable