import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Icons
import { MdArrowDownward } from "react-icons/md";
// Components
import DeleteAlertMssg from '../AlertMessages/DeleteAlertMssg';
// Styles
import './Table.scss'

const ProjectsTable = ({projects, setUpdateProjectForm}) => {
  const [deleteAlertMessage, setDeleteAlertMessage] = useState(false);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Project Name <MdArrowDownward className='icon' /></th>
            <th>Project Description <MdArrowDownward className='icon' /></th>
            <th>Project Members <MdArrowDownward className='icon' /></th>
            <th>Created_at <MdArrowDownward className='icon' /></th>
            <th>Actions <MdArrowDownward className='icon' /></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => <tr key={index}>
            <td>
              <Link to={`/dashboard/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
              <Link to={`/dashboard/projects/${project.id}`}>
                {project.description.length > 60 ? `${project.description.slice(0, 60)}...` : project.description}
              </Link>
            </td>
            <td>{project.members.map((m, idx) => <span className='member-tag' key={idx}>{m.username}</span>)}</td>
            <td>12/5/2023 3:44</td>
            <td className='action__btns'>
              <button className='action__btns__edit' onClick={() => setUpdateProjectForm(true)}>Edit</button>
              <button className='action__btns__delete' onClick={() => setDeleteAlertMessage(true)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>

      {deleteAlertMessage && <DeleteAlertMssg setDeleteAlertMessage={setDeleteAlertMessage} />}
    </div>
  )
}

export default ProjectsTable