import React, { useState } from 'react';
import Select from 'react-select'
// Icons
import { MdClose } from "react-icons/md";
import { MdAdd } from "react-icons/md";
// Styles
import './Forms.scss';

const CreateProjectForm = ({setForm}) => {
  const users = [
    {
      value: 0,
      label: 'Youssef Nassrallah',
    },
    {
      value: 1,
      label: 'Redwan Ben Yechou',
    }
  ]

  const [members, setMembers] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="project__form">
      <form className="form">
        <h2>Create a New Project</h2>
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
            // onChange={(e) => setProjectName(e.target.value)}
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
            // onChange={(e) => setProjectDescription(e.target.value)}
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
            // onChange={(e) => setProjectRepository(e.target.value)}
          />
        </div>

        {/* submit */}
        <div className='submit-btn'>
          <button className='btn btn__primary'>
            <MdAdd className='icon' />Create a new project
          </button>
        </div>
        <div className="close-icon" onClick={() => setForm(false)}>
          <MdClose />
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm