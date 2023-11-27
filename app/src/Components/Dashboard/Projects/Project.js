import React, { useState } from 'react'
import { MdBugReport, MdLightbulb, MdReportProblem } from "react-icons/md";

import './Project.scss';


const Project = ({ project, handleToggleActive, idx, isActive }) => {
  return (
    <div className={idx === isActive ? 'project active' : 'project'} onClick={() => handleToggleActive(idx)}>
      <h2 className='project__name'>{project.name}</h2>
      <p className='project__owner'><b>Owner: </b>{project.created_by.username}</p>
      <p className='project__desc'>{project.description}</p>
      <ul className='project__reports'>
        <li className='bugs'>
          <MdBugReport className='icon' />Bugs (3)
        </li>
        <li className='issues'>
          <MdReportProblem className='icon' />Issues (14)
        </li>
        <li className='features'>
          <MdLightbulb className='icon' />Features (14)
        </li>
      </ul>
    </div>
  )
}

export default Project