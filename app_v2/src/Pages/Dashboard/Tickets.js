import React from 'react';
// Icons
import { FiSearch } from "react-icons/fi";
import TicketsIcon from '../../assets/tickets-icon.png';
// Components
import Navbar from '../../Layout/Navbar/Navbar'
import TicketsTable from '../../Components/Tables/TicketsTable';
// Styles
import './Tickets.scss';


const Tickets = () => {
  const ticketTasks = [
    {
      id: 1,
      name: "Style the table header to make it visually appealing.",
      assignedTo: "Youssef Nassrallah",
      type: "feature",
      status: "To Do",
      created_at: "2023-12-06T12:00:00Z", // Replace this with the actual creation date
    },
    {
      id: 2,
      name: "Implement sorting functionality for the 'Ticket owner' column.",
      assignedTo: "Redwan ben yecho",
      type: "bug",
      status: "In Progress",
      created_at: "2023-12-07T09:30:00Z", // Replace this with the actual creation date
    },
    {
      id: 3,
      name: "Add a confirmation dialog for delete actions.",
      assignedTo: "Youssef Nassrallah",
      type: "issue",
      status: "To Do",
      created_at: "2023-12-08T15:45:00Z", // Replace this with the actual creation date
    },
    {
      id: 4,
      name: "Create Edit functionality to update ticket information.",
      assignedTo: "Redwan ben yecho",
      type: "feature",
      status: "To Do",
      created_at: "2023-12-09T10:15:00Z", // Replace this with the actual creation date
    },
    {
      id: 5,
      name: "Apply formatting for the 'Created_at' column.",
      assignedTo: "Youssef Nassrallah",
      type: "issue",
      status: "In Progress",
      created_at: "2023-12-10T08:00:00Z", // Replace this with the actual creation date
    },
    {
      id: 6,
      name: "Add filtering options for the 'Ticket type' column.",
      assignedTo: "Redwan ben yecho",
      type: "feature",
      status: "To Do",
      created_at: "2023-12-11T14:20:00Z", // Replace this with the actual creation date
    },
  ];

  return (
    <div className='db__content bg__light tickets'>
      <Navbar />

      <h2 className='text__primary'>Tickets</h2>

      <div className='all__tickets'>
        <header className='tickets__header'>
          <h3 className='text__primary'>
            <img src={TicketsIcon} alt='tickets-icon' /> Assigned Tickets <span className='length-tag'>{ticketTasks.length} Tickets</span>
          </h3>

          <div>
            <div className='search'>
              <FiSearch className='search__icon' />
              <input className='search__input' placeholder='Search...' />
            </div>
          </div>
        </header>

        <TicketsTable tickets={ticketTasks} />
      </div>
    </div>
  )
}

export default Tickets