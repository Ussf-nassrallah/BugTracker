import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";
import { useParams } from 'react-router-dom';

// Icons
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
// Components
import Navbar from '../../Layout/Navbar/Navbar';
import UpdateProjectForm from '../../Components/Forms/UpdateProjectForm'
import DeleteAlertMssg from '../../Components/AlertMessages/DeleteAlertMssg';
import LoadingRoller from '../../Components/Loading/LoadingRoller';
import CreateTicketForm from '../../Components/Forms/CreateTicketForm';
// Styles
import './ProjectDetails.scss'
import MembersTable from '../../Components/Tables/MembersTable';
import ProjectTicketsTable from '../../Components/Tables/ProjectTicketsTable';

const ProjectDetails = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateProjectForm, setUpdateProjectForm] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState(false);
  const [members, setMembers] = useState([]);
  const [createTicketForm, setCreateTicketForm] = useState(false);
  // Access the id parameter using useParams
  let { id } = useParams();

  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  const fetchProject = async () => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/v1/projects/${id}`)
      .then((data) => {
        setProject(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMembers = async () => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/v1/projects/${id}/members`)
      .then((data) => {
        setMembers(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProject();
    fetchMembers();
  }, []);

  const username = project.created_by ? project.created_by.username : null;
  const userId = project.created_by ? project.created_by.id : null;

  if (loading) {
    return (
      <div className='db__content bg__light project__detail'>
        <Navbar />
        <div className='project__detail__loading'>
          <LoadingRoller />
        </div>
      </div>
    )
  }

  return (
    <div className='db__content bg__light project__detail'>
      <Navbar />

      <header className='projects__header'>
        <h3 className='text__primary'>
          {project.name}
        </h3>

        {user.id === userId && <div>
          <button className='btn btn__primary' onClick={() => setCreateTicketForm(true)}>
            <MdAdd className='icon' />Create a new ticket
          </button>

          <button className='btn btn__secondary' onClick={() => setUpdateProjectForm(true)}>
            <MdEdit className='icon' />Update project info
          </button>

          <button className='btn btn__danger' onClick={() => setDeleteAlertMessage(true)}>
            <MdDelete className='icon' />Delete
          </button>
        </div>}
      </header>

      <div className='project project__owner'>
        <p>Project created by : </p>
        <span className='tag'>{username}</span>
      </div>

      <div className='project project__description'>
        <h3 className='text__primary'>
          Description
        </h3>
        <p>
          {project.description}
        </p>
      </div>

      <div className='project project__repo'>
        <h3 className='text__primary'>
          GitHub URL
        </h3>

        <div>
          <p>github repository link : </p>
          <span className='tag'>
            <a href={project.link_repo} target="_blank">{project.link_repo}</a>
          </span>
        </div>
      </div>

      <div className='project project__members'>
        <div className='project__members__header'>
          <h3 className='text__primary'>
            Members
          </h3>
          <span className='length-tag'>{members && members.length} Members</span>
        </div>
        <MembersTable members={members} />
      </div>

      <div className='project project__tickets'>
        <div className='project__tickets__header'>
          <h3 className='text__primary'>
            Tickets
          </h3>
          <span className='length-tag'>{project && project.tickets.length} Tickets</span>
        </div>
        {project && project.tickets && <ProjectTicketsTable tickets={project.tickets} members={members} />}
      </div>

      {createTicketForm && <CreateTicketForm setCreateTicketForm={setCreateTicketForm} project={project} />}

      {updateProjectForm && <UpdateProjectForm
        updateProjectForm={updateProjectForm}
        setUpdateProjectForm={setUpdateProjectForm}
        project={project}
      />}

      {deleteAlertMessage && <DeleteAlertMssg setDeleteAlertMessage={setDeleteAlertMessage} project={project} />}
    </div>
  )
}

export default ProjectDetails