import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';
import axios from 'axios';
// import { decodeToken } from 'react-jwt';
import LoadingRoller from '../Loading/LoadingRoller';
// Icons
import { MdClose, MdOutlineCancel, MdEdit, MdOutlineWarning } from "react-icons/md";
// Styles
import './Forms.scss';

const UpdateProjectForm = ({ setUpdateProjectForm, project }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  // project Data
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const [projectRepository, setProjectRepository] = useState(project.link_repo);
  // list of all users
  // const [users, setUsers] = useState([]);
  // project members
  // const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const handleProjectUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const request = {
      name: projectName,
      description: projectDescription,
      link_repo: projectRepository
    };

    await axios
      .put(`http://127.0.0.1:5000/api/v1/projects/${project.id}`, request)
      .then((data) => {
        // console.log(data);
        setSuccessMessage(true);
        setErrorMessage({});
        setInterval(() => {
          setUpdateProjectForm(false);
          navigate('/dashboard/projects');
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  // useEffect(() => { fetchUsers() }, []);


  return (
    <div className="project__form">
      <form className="form" onSubmit={handleProjectUpdate}>
        <h2>Update Project Information</h2>
        <p>
          For the purpose of industry regulation, your details are required.
        </p>
        {successMessage && <small>✅ Project Updated successfully</small>}
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
            value={projectName}
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
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          {errorMessage.description && <small className='error__message'>{errorMessage.description}</small>}
        </div>

        {/* project collaborators */}
        <div className={errorMessage.members ? "error form__div" : "form__div"}>
          {/* <label htmlFor="collaborators" className="form__label">
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
          {errorMessage.members && <small className='error__message'>{errorMessage.members}</small>} */}
          <p className='form__div__warning'><MdOutlineWarning className='icon' />stay tuned: in a few days you can update project collaborators</p>
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
            value={projectRepository}
            onChange={(e) => setProjectRepository(e.target.value)}
          />
          {errorMessage.link_repo && <small className='error__message'>{errorMessage.link_repo}</small>}
        </div>

        {/* submit */}
        <div className='submit-btn'>
          <button className='btn btn__light' onClick={() => setUpdateProjectForm(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>
          <button className='btn btn__secondary'>
            {loading ? <LoadingRoller /> : <span><MdEdit className='icon' />Update project</span>}
          </button>
        </div>
        <div className="close-icon" onClick={() => setUpdateProjectForm(false)}>
          <MdClose />
        </div>
      </form>
    </div>
  )
}

export default UpdateProjectForm