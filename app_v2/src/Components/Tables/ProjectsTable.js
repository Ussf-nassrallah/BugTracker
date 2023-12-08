import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { MdArrowDownward } from "react-icons/md";
// Styles
import './Table.scss'

const ProjectsTable = ({projects}) => {
  return (
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
            <Link to={`/dashboard/projects/${project.id}`}>{project.title}</Link>
          </td>
          <td>
            <Link to={`/dashboard/projects/${project.id}`}>
              {project.description.length > 60 ? `${project.description.slice(0, 60)}...` : project.description}
            </Link>
          </td>
          <td>Youssef Nasrallah, Redwan Ben Yecho</td>
          <td>12/5/2023 3:44</td>
          <td className='action__btns'>
            <button className='action__btns__edit'>Edit</button>
            <button className='action__btns__delete'>Delete</button>
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default ProjectsTable