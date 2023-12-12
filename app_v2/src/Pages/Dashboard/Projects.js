import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
// Icons
import { MdAdd } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
// Components
import Navbar from '../../Layout/Navbar/Navbar'
import ProjectsTable from '../../Components/Tables/ProjectsTable';
import EmptyProjectsMssg from '../../Components/AlertMessages/EmptyProjectsMssg';
import ZeroCollabMssg from '../../Components/AlertMessages/ZeroCollabMssg';
import CreateProjectForm from '../../Components/Forms/CreateProjectForm';
import UpdateProjectForm from '../../Components/Forms/UpdateProjectForm';
import LoadingRoller from '../../Components/Loading/LoadingRoller';
// Styles
import './Projects.scss'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [emptyProjectsList, setEmptyProjectsList] = useState(true);
  const [loading, setLoading] = useState(false);
  const [createProjectForm, setCreateProjectForm] = useState(false);
  const [updateProjectForm, setUpdateProjectForm] = useState(false);

  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  const fetchProjects = async () => {
    setLoading(true);

    await axios.get(`http://127.0.0.1:5000/api/v1/users/${user.id}/projects`)
      .then((data) => {
        setProjects(data.data);
        if (projects.length === 0) {
          setEmptyProjectsList(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <div className='db__content bg__light projects'>
      <Navbar />

      <h2 className='text__primary'>Projects</h2>

      <div className='all__projects'>
        <div className='my__projects'>
          <header className='projects__header'>
            <h3 className='text__primary'>
              Projects I've Made <span className='length-tag'>0 Project</span>
            </h3>

            <div>
              <div className='search'>
                <FiSearch className='search__icon' />
                <input className='search__input' placeholder='Search...' />
              </div>

              <button className='btn btn__primary' onClick={() => setCreateProjectForm(true)}>
                <MdAdd className='icon' />Create a new project
              </button>
            </div>
          </header>

          {loading && <div className='projects__loading'>
            <LoadingRoller />
          </div>}
          {emptyProjectsList ? <EmptyProjectsMssg /> : <ProjectsTable projects={projects} setUpdateProjectForm={setUpdateProjectForm} />}
        </div>

        <div className='my__collab'>
          <header className='projects__header'>
            <h3 className='text__primary'>
              My Collaborations <span className='length-tag'>0 Collab</span>
            </h3>
          </header>

          <ZeroCollabMssg />
        </div>
      </div>

      {createProjectForm && <CreateProjectForm setCreateProjectForm={setCreateProjectForm} />}
      {updateProjectForm && <UpdateProjectForm
        updateProjectForm={updateProjectForm}
        setUpdateProjectForm={setUpdateProjectForm}
      />}
    </div>
  )
}

export default Projects