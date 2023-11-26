import React, { useState, useEffect } from 'react'
import { decodeToken } from "react-jwt";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Icons
import { MdClose } from "react-icons/md";
// Components
import Sidebar from './Sidebar/Sidebar'
import ProjectsList from './Projects/ProjectsList';
import ProjectDetails from './Projects/ProjectDetails';
// styles
import './Dashboard.scss'

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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // project info
  const [projectName, setProjectName] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const [projectOwner, setProjectOwner] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const myDecodedToken = decodeToken(token);
      setUser(myDecodedToken);
      // setProjectOwner(user.id);
      // console.log('token', token);
      // console.log('DecodedToken', myDecodedToken);
    } else {
      console.log('Token not found. User may need to log in.');
    }
  }, []);


  // console.log(user);


  const handleProjects = async (e) => {
    e.preventDefault();

    const request = {
      created_by: user.id,
      name: projectName,
      description: projectDescription
    };

    await axios
      .post("http://127.0.0.1:5000/api/v1/projects", request)
      .then((data) => {
        // console.log(data);
        setIsSuccess(true);
        setSuccessMessage(data.data.message);
        setInterval(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 7000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='db'>
      <Sidebar />

      <div className='db__content'>
        <ProjectsList
          setForm={setForm}
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          projectsList={projectsList}
          setProjectsList={setProjectsList}
        />

        <ProjectDetails project={projects[activeProject]} setProjectsList={setProjectsList} projectsList={projectsList} />

        {form && <div className='project__form'>
          <form className='form' onSubmit={handleProjects}>
            <h2>Create a New Project</h2>
            {isSuccess && <div className='successMessage'>{successMessage}</div>}
            {/* project name */}
            <div>
              <label htmlFor='name' className='form__label'>Project Title<span>*</span></label>
              <input
                id='name'
                name='name'
                type='text'
                className='form__input'
                placeholder='Project Title'
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            {/* project Description */}
            <div>
              <label htmlFor='description' className='form__label'>Project Description<span>*</span></label>
              <textarea
                id='description'
                name='description'
                type='text'
                className='form__input'
                placeholder='Project Description'
                onChange={(e) => setProjectDescription(e.target.value)}
              >
              </textarea>
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