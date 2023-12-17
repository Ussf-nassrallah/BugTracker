import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
// Icons
import { FiSearch } from "react-icons/fi";
import TicketsIcon from '../../assets/tickets-icon.png';
// Components
import Navbar from '../../Layout/Navbar/Navbar'
import TicketsTable from '../../Components/Tables/TicketsTable';
// Styles
import './Tickets.scss';


const Tickets = () => {
  // const ticketTasks = [
  // {
  //   id: 1,
  //   name: "Style the table header to make it visually appealing.",
  //   description: "Improve the visual appearance of the table header using modern styling.",
  //   assignedTo: "Youssef Nassrallah",
  //   type: "feature",
  //   status: "Proposed",
  //   created_at: "2023-12-06T12:00:00Z", // Replace this with the actual creation date
  // },
  // {
  //   id: 2,
  //   name: "Implement sorting functionality for the 'Ticket owner' column.",
  //   description: "Enable users to sort the table based on the 'Ticket owner' column.",
  //   assignedTo: "Redwan ben yecho",
  //   type: "bug",
  //   status: "In Progress",
  //   created_at: "2023-12-07T09:30:00Z", // Replace this with the actual creation date
  // },
  // {
  //   id: 3,
  //   name: "Add a confirmation dialog for delete actions.",
  //   description: "Prompt users with a confirmation dialog before deleting a ticket.",
  //   assignedTo: "Youssef Nassrallah",
  //   type: "issue",
  //   status: "In Progress",
  //   created_at: "2023-12-08T15:45:00Z", // Replace this with the actual creation date
  // },
  // {
  //   id: 4,
  //   name: "Create Edit functionality to update ticket information.",
  //   description: "Implement the ability to edit and update ticket information.",
  //   assignedTo: "Redwan ben yecho",
  //   type: "feature",
  //   status: "Proposed",
  //   created_at: "2023-12-09T10:15:00Z", // Replace this with the actual creation date
  // },
  // {
  //   id: 5,
  //   name: "Apply formatting for the 'Created_at' column.",
  //   description: "Format the 'Created_at' column to display dates in a user-friendly manner.",
  //   assignedTo: "Youssef Nassrallah",
  //   type: "issue",
  //   status: "In Progress",
  //   created_at: "2023-12-10T08:00:00Z", // Replace this with the actual creation date
  // },
  // {
  //   id: 6,
  //   name: "Add filtering options for the 'Ticket type' column.",
  //   description: "Allow users to filter the table based on different 'Ticket type' values.",
  //   assignedTo: "Redwan ben yecho",
  //   type: "feature",
  //   status: "Dev Complete",
  //   created_at: "2023-12-11T14:20:00Z", // Replace this with the actual creation date
  // },
  // ];

  const [projects, setProjects] = useState([]);
  const [ticketsList, setTicketsList] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get user information : decodetoken
    const token = localStorage.getItem("token");
    const user = decodeToken(token);
    setUser(user);

    const fetchProjects = async () => {
      setLoading(true);
      await axios.get(`http://127.0.0.1:5000/api/v1/users/${user.id}/projects`)
        .then((data) => {
          setProjects(data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const fetchTickets = async () => {
      setLoading(true);
      await axios.get(`http://127.0.0.1:5000/api/v1/users/${user.id}/tickets`)
        .then((data) => {
          setTicketsList(data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchProjects();
    fetchTickets();
  }, []);

  // const userProjects = projects.filter(project => project.created_by.id === user.id);
  const uniqueIds = new Set();

  const uniqueUserProjects = projects.filter(item => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true;
    }
    return false;
  });

  return (
    <div className='db__content bg__light tickets'>
      <Navbar />

      <h2 className='text__primary'>Tickets</h2>

      <div className='all__tickets'>
        <header className='tickets__header'>
          <h3 className='text__primary'>
            <img src={TicketsIcon} alt='tickets-icon' /> Assigned Tickets <span className='length-tag'>{ticketsList.length} Tickets</span>
          </h3>

          <div>
            <div className='search'>
              <FiSearch className='search__icon' />
              <input className='search__input' placeholder='Search...' />
            </div>
          </div>
        </header>

        <TicketsTable projects={uniqueUserProjects} />
      </div>
    </div>
  )
}

export default Tickets