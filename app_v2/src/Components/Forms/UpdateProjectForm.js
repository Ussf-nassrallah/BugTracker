import React, { useState } from 'react';
import Select from 'react-select'
// Icons
import { MdClose, MdAdd, MdDelete, MdEdit } from "react-icons/md";
// Styles
import './Forms.scss';

const CreateProjectForm = ({setUpdateProjectForm, updateProjectForm}) => {
  const users = [
    {
      value: 0,
      label: 'Youssef Nassrallah',
    },
    {
      value: 1,
      label: 'Redwan Ben Yechou',
    },
    {
      value: 2,
      label: 'Iliass Fokhar',
    },
    {
      value: 3,
      label: 'Hamza Nait',
    }
  ]

  const [members, setMembers] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [projectName, setProjectName] = useState("Fitness Tracker");
  const [projectDescription, setProjectDescription] = useState("Track your fitness journey with this app. Log your workouts, monitor your progress, and set fitness goals. Includes charts and graphs to visualize your achievements.");
  const [projectRepository, setProjectRepository] = useState("https://github.com/Ussf-nassrallah/BugTracker");


  return (
    <div className="project__form">
      <form className="form">
        <h2>Update Project Information</h2>
        {isSuccess && (
          <div className="successMessage">Project is Created Successfully</div>
        )}
        {/* project name */}
        <div>
          <label htmlFor="name" className="form__label">
            Project Title<span>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form__input"
            placeholder="Project Title"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        {/* project Description */}
        <div>
          <label htmlFor="description" className="form__label">
            Project Description<span>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            className="form__input"
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
        </div>

        {/* project collaborators */}
        <div>
          <label for="collaborators" className="form__label">
            Project Collaborators<span>*</span>
          </label>
          {users && (
            <Select
              options={users}
              isMulti
              placeholder='Select collaborators...'
              onChange={(e) => {
                const members = e.map((member) => member.value);
                setMembers(members);
              }}
            />
          )}
        </div>

        {/* project repo */}
        <div>
          <label for="repository" className="form__label">
            Project Repository<span>*</span>
          </label>
          <input
            id="repository"
            name="repository"
            type="text"
            className="form__input"
            placeholder="GitHub Repository link"
            value={projectRepository}
            onChange={(e) => setProjectRepository(e.target.value)}
          />
        </div>

        {/* submit */}
        <div className='submit-btn'>
          <button className='btn btn__secondary'>
            <MdEdit className='icon' />Update Project Info
          </button>
        </div>
        <div className="close-icon" onClick={() => setUpdateProjectForm(false)}>
          <MdClose />
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm