import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
// Icons
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
// Components
import Navbar from '../../Layout/Navbar/Navbar';
import UpdateProjectForm from '../../Components/Forms/UpdateProjectForm'
import DeleteAlertMssg from '../../Components/AlertMessages/DeleteAlertMssg';
// Styles
import './ProjectDetails.scss'
import MembersTable from '../../Components/Tables/MembersTable';
import ProjectTicketsTable from '../../Components/Tables/ProjectTicketsTable';

const ProjectDetails = () => {
  const [updateProjectForm, setUpdateProjectForm] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState(false);

  // Access the id parameter using useParams
  let { id } = useParams();

  const [members, setMembers] = useState([
    {
      id: 0,
      username: 'Youssef Nassrallah',
      phone: '0641141524',
      email: 'youssefnassrallah@gmail.com',
      role: 'Full-stack Web Developer'
    },
    {
      id: 1,
      username: 'Redwan Ben Yechou',
      phone: '0612336514',
      email: 'redwanriyo@gmail.com',
      role: 'Software Engineer'
    }
  ]);

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
  
  console.log(id);

  return (
    <div className='db__content bg__light project__detail'>
      <Navbar />

      <header className='projects__header'>
        <h3 className='text__primary'>
          Fitness Tracker
        </h3>

        <div>
          <button className='btn btn__primary'>
            <MdAdd className='icon' />Create a new ticket
          </button>

          <button className='btn btn__secondary' onClick={() => setUpdateProjectForm(true)}>
            <MdEdit className='icon' />Update project info
          </button>

          <button className='btn btn__danger' onClick={() => setDeleteAlertMessage(true)}>
            <MdDelete className='icon' />Delete
          </button>
        </div>
      </header>

      <div className='project project__owner'>
        <p>Project created by : </p>
        <span className='tag'>Youssef Nassrallah</span>
      </div>

      <div className='project project__description'>
        <h3 className='text__primary'>
          Description
        </h3>
        <p>
          Track your fitness journey with this app. Log your workouts, monitor your progress, and set fitness goals. Includes charts and graphs to visualize your achievements.
        </p>
      </div>

      <div className='project project__repo'>
        <h3 className='text__primary'>
          GitHub URL
        </h3>

        <div>
          <p>github repository link : </p>
          <span className='tag'>
            <a>https://github.com/Ussf-nassrallah/BugTracker</a>
          </span>
        </div>
      </div>

      <div className='project project__members'>
        <div className='project__members__header'>
          <h3 className='text__primary'>
            Members
          </h3>
          <span className='length-tag'>3 Members</span>
        </div>
        <MembersTable members={members} />
      </div>

      <div className='project project__tickets'>
        <div className='project__tickets__header'>
          <h3 className='text__primary'>
            Tickets
          </h3>
          <span className='length-tag'>6 Tickets</span>
        </div>
        <ProjectTicketsTable tickets={ticketTasks} />
      </div>

      {updateProjectForm && <UpdateProjectForm
        updateProjectForm={updateProjectForm}
        setUpdateProjectForm={setUpdateProjectForm}
      />}

      {deleteAlertMessage && <DeleteAlertMssg setDeleteAlertMessage={setDeleteAlertMessage} />}
    </div>
  )
}

export default ProjectDetails