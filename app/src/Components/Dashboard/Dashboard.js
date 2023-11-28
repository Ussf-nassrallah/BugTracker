import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { TbStatusChange, TbSticker, TbUser } from "react-icons/tb";
import Sidebar from './Sidebar/Sidebar'

import ProjectsList from './Projects/ProjectsList';
import ProjectDetails from './Projects/ProjectDetails';

import './Dashboard.scss'
import Ticket from './Tickets/Ticket';

const projects = [
  {
    id: 1,
    title: 'Todo Web App',
    owner: 'Youssef Nasrallah',
    description: 'A simple and intuitive web application for managing your daily tasks. Keep track of your to-dos, set priorities, and mark tasks as completed.'
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    owner: 'John Doe',
    description: 'An online shopping platform where users can browse products, add items to their cart, and complete the checkout process. Includes user accounts, product reviews, and order history.'
  },
  {
    id: 3,
    title: 'Blog Application',
    owner: 'Jane Smith',
    description: 'Create, edit, and publish blog posts with this versatile blog application. Users can comment on posts, and there is an admin panel for managing content.'
  },
  {
    id: 4,
    title: 'Weather App',
    owner: 'Chris Johnson',
    description: 'Get real-time weather updates for your location or any city in the world. View current conditions, forecasts, and detailed weather information.'
  },
  {
    id: 5,
    title: 'Project Management Tool',
    owner: 'Alice Williams',
    description: 'A comprehensive project management tool for teams. Plan tasks, assign responsibilities, track progress, and collaborate seamlessly on projects.'
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    owner: 'Michael Brown',
    description: 'Track your fitness journey with this app. Log your workouts, monitor your progress, and set fitness goals. Includes charts and graphs to visualize your achievements.'
  },
];


const Dashboard = () => {
  const [form, setForm] = useState(false);
  const [activeProject, setActiveProject] = useState(0); // 0 represent the index of the project
  const [projectsList, setProjectsList] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(true);

  // console.log(projects[activeProject]);

  return (
    <div className='db'>
      <Sidebar />

      <div className='db__content'>
        {/* <ProjectsList
          setForm={setForm}
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          projectsList={projectsList}
          setProjectsList={setProjectsList}
        /> */}

        {/* <ProjectDetails project={projects[activeProject]} setProjectsList={setProjectsList} projectsList={projectsList} /> */}

        <div className='tickets'>
          <header className='tickets__header'>
            <h3>Todo Web App</h3>
          </header>
          <div className='tickets__list'>
            <div className='tickets__status'>
              <p className='status'>proposed</p>
              <div>
                <Ticket text={'Make demo of the project'} />
                <Ticket text={'Create presentation'} />
                <Ticket text={'Create project landing page'} />
                <Ticket text={'Write comprehensive README.md'} />
                <Ticket text={'Write blog post'} />
              </div>
            </div>

            <div className='tickets__status'>
              <p className='status'>in progress</p>
            </div>

            <div className='tickets__status'>
              <p className='status'>dev complete</p>
            </div>

            <div className='tickets__status'>
              <p className='status'>tested</p>
            </div>

            <div className='tickets__status'>
              <p className='status'>deployed</p>
            </div>
          </div>

          {ticketDetails && <div className='ticket__details'>
            <div className='ticket__details__info'>
              <div className='ticket__details__info__name'>
                <FaTicketAlt className='icon' />
                <h3>Todo Web Application</h3>
              </div>

              <div className='ticket__details__info__owner'>
                <h3><TbUser className='icon' /> Owner / </h3>
                <span>Youssef Nassrallah</span>
              </div>

              <div className='flex'>
                <div className='ticket__details__info__status'>
                  <h3><TbStatusChange className='icon' /> Ticket Status / </h3>
                  <span>proposed</span>
                </div>

                <div className='ticket__details__info__type'>
                  <h3><TbSticker className='icon' /> Type / </h3>
                  <span>Feature</span>
                </div>
              </div>

              <div className='ticket__details__info__description'>
                <h3><MdDescription className='icon' /> Description</h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className='close-icon'>
                <MdClose />
              </div>
            </div>
          </div>}
        </div>

        {form && <div className='project__form'>
          <form className='form'>
            <h2>Create a New Project</h2>

            {/* project name */}
            <div>
              <label for='name' className='form__label'>Project Title<span>*</span></label>
              <input id='name' name='name' type='text' className='form__input' placeholder='Project Title' />
            </div>

            {/* project Description */}
            <div>
              <label for='description' className='form__label'>Project Description<span>*</span></label>
              <textarea id='description' name='description' type='text' className='form__input' placeholder='Project Description'></textarea>
            </div>

            {/* project collaborators */}
            <div>
              <label for='collaborators' className='form__label'>Project Collaborators<span>*</span></label>
              <input id='collaborators' name='collaborators' type='text' className='form__input' placeholder='Add Collaborators' />
              <ul>
                <li>Youssef Nassrallah</li>
                <li>Redwan Ben Yecho</li>
              </ul>
            </div>

            {/* project collaborators */}
            <div>
              <label for='repository' className='form__label'>Project Repository<span>*</span></label>
              <input id='repository' name='repository' type='text' className='form__input' placeholder='GitHub Repository link' />
            </div>

            {/* submit */}
            <button type='submit' className='btn-primary'>Create Project</button>
            <div className='close-icon' onClick={() => setForm(false)}>
              <MdClose />
            </div>
          </form>
        </div>}
      </div>
    </div>
  )
}

export default Dashboard