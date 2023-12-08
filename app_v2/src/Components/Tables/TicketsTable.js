import React from 'react';
// Icons
import { MdArrowDownward } from "react-icons/md";

const TicketsTable = ({tickets}) => {
  // Filter tickets
  const featureTickets = tickets.filter((ticket) => ticket.type === 'feature');
  const issueTickets = tickets.filter((ticket) => ticket.type === 'issue');
  const bugTickets = tickets.filter((ticket) => ticket.type === 'bug');


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
        <tr>
          <td>Fitness Tracking App</td>
          <td className='ft'><span className='tag'>{featureTickets.length} Tickets</span></td>
          <td className='it'><span className='tag'>{issueTickets.length} Tickets</span></td>
          <td className='bt'><span className='tag'>{bugTickets.length} Tickets</span></td>
          <td className='tt'><span className='tag'>{tickets.length} Tickets</span></td>
        </tr>

        <tr>
          <td>Fitness Tracking App</td>
          <td className='ft'><span className='tag'>{featureTickets.length} Tickets</span></td>
          <td className='it'><span className='tag'>{issueTickets.length} Tickets</span></td>
          <td className='bt'><span className='tag'>{bugTickets.length} Tickets</span></td>
          <td className='tt'><span className='tag'>{tickets.length} Tickets</span></td>
        </tr>

        <tr>
          <td>Fitness Tracking App</td>
          <td className='ft'><span className='tag'>{featureTickets.length} Tickets</span></td>
          <td className='it'><span className='tag'>{issueTickets.length} Tickets</span></td>
          <td className='bt'><span className='tag'>{bugTickets.length} Tickets</span></td>
          <td className='tt'><span className='tag'>{tickets.length} Tickets</span></td>
        </tr>
      </tbody>
    </table>
  )
}

export default TicketsTable