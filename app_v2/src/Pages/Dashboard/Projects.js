import React, { useState } from 'react';
// Icons
import { MdAdd } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
// Components
import Navbar from '../../Layout/Navbar/Navbar'
import ProjectsTable from '../../Components/Tables/ProjectsTable';
import EmptyProjectsMssg from '../../Components/AlertMessages/EmptyProjectsMssg';
import ZeroCollabMssg from '../../Components/AlertMessages/ZeroCollabMssg';
// Styles
import './Projects.scss'

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 0,
      title: 'Fitness Tracker',
      owner: 'Michael Brown',
      description: 'Track your fitness journey with this app. Log your workouts, monitor your progress, and set fitness goals. Includes charts and graphs to visualize your achievements.'
    },
    {
      id: 1,
      title: 'E-commerce Platform',
      owner: 'John Doe',
      description: 'An online shopping platform where users can browse products, add items to their cart, and complete the checkout process. Includes user accounts, product reviews, and order history.'
    },
  ]);

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

              <button className='btn btn__primary'>
                <MdAdd className='icon' />Create a new project
              </button>
            </div>
          </header>

          <ProjectsTable projects={projects} />
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
    </div>
  )
}

export default Projects