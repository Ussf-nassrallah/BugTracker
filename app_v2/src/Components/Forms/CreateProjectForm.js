import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { decodeToken } from "react-jwt";
import axios from 'axios';
// Icons
import { MdClose, MdOutlineCancel } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import LoadingRoller from '../Loading/LoadingRoller';
// Styles
import './Forms.scss';

const CreateProjectForm = ({setCreateProjectForm}) => {
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  // project Data
  const [projectName, setProjectName] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [projectRepository, setProjectRepository] = useState(null);
  // list of all users
  const [users, setUsers] = useState([]);
  // project members
  const [members, setMembers] = useState([]);
  // get user information : decodetoken
  const token = localStorage.getItem("token");
  const user = decodeToken(token);


  const fetchUsers = async () => {
    await axios
      .get(`http://127.0.0.1:5000/api/v1/users`)
      .then((data) => {
        const transformedData = data.data.map((user) => {
          return {
            value: user.id,
            label: user.username,
          };
        })
        setUsers(transformedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => { fetchUsers() }, []);

  const handleProjects = async (e) => {
    e.preventDefault();
    setLoading(true);

    function handleProjectRequest(obj) {
      const keys = Object.keys(obj);
      for (const keyIdx in keys) {
        if (obj[keys[keyIdx]] === '' || obj[keys[keyIdx]] === null || obj[keys[keyIdx]].length === 0) {
          delete obj[keys[keyIdx]];
        }
      }
      return obj;
    }

    const request = handleProjectRequest({
      created_by: user.id,
      name: projectName,
      description: projectDescription,
      link_repo: projectRepository,
      members: members,
    });

    await axios
      .post("http://127.0.0.1:5000/api/v1/projects", request)
      .then((data) => {
        // console.log(data);
        setSuccessMessage(true);
        setErrorMessage({});
        setInterval(() => {
          setCreateProjectForm(false);
        }, 7000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })
  };


  return (
    <div className="project__form">
      <form className="form" onSubmit={handleProjects}>
        <h2>Create a New Project</h2>
        <p>
          For the purpose of industry regulation, your details are required.
        </p>
        {successMessage && <small>✅ Project created successfully</small>}
        {/* project name */}
        <div className={errorMessage.name ? "error form__div" : "form__div"}>
          <label htmlFor="name" className="form__label">
            Project Title<span>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form__input"
            placeholder="Project Title"
            onChange={(e) => setProjectName(e.target.value)}
          />
          {errorMessage.name && <small className='error__message'>{errorMessage.name}</small>}
        </div>

        {/* project Description */}
        <div className={errorMessage.description ? "error form__div" : "form__div"}>
          <label htmlFor="description" className="form__label">
            Project Description<span>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            className="form__input"
            placeholder="Project Description"
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          {errorMessage.description && <small className='error__message'>{errorMessage.description}</small>}
        </div>

        {/* project collaborators */}
        <div className={errorMessage.members ? "error form__div" : "form__div"}>
          <label htmlFor="collaborators" className="form__label">
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
          {errorMessage.members && <small className='error__message'>{errorMessage.members}</small>}
        </div>

        {/* project repo */}
        <div className={errorMessage.link_repo ? "error form__div" : "form__div"}>
          <label htmlFor="repository" className="form__label">
            Project Repository<span>*</span>
          </label>
          <input
            id="repository"
            name="repository"
            type="text"
            className="form__input"
            placeholder="GitHub Repository link"
            onChange={(e) => setProjectRepository(e.target.value)}
          />
          {errorMessage.link_repo && <small className='error__message'>{errorMessage.link_repo}</small>}
        </div>

        {/* submit */}
        <div className='submit-btn'>
          <button className='btn btn__light' onClick={() => setCreateProjectForm(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>
          <button className='btn btn__primary'>
            {loading ? <LoadingRoller /> : <span><MdAdd className='icon' />Create a new project</span>}
          </button>
        </div>
        <div className="close-icon" onClick={() => setCreateProjectForm(false)}>
          <MdClose />
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm