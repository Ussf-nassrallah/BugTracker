import React, { useState } from 'react';

import { BsBoxArrowLeft, BsBoxArrowRight } from "react-icons/bs";

import './ProjectDetails.scss';

const ProjectDetails = ({ project, projectsList, setProjectsList }) => {
  // console.log(project);

  return (
    <div className='project__details'>
      <div className='project'>
        <div className='project__header'>
          <div className='project__header__info'>
            <div onClick={() => setProjectsList(!projectsList)}>
              {projectsList ? <BsBoxArrowRight className='icon' /> : <BsBoxArrowLeft className='icon' />}
            </div>
            <h2>#{project.id} {project.title}</h2>
          </div>
          <div className='project__header__buttons'>
            <button className='btn-primary'>Project Tickets</button>
            <button className='btn-secondary'>Edit Project</button>
          </div>
        </div>

        <div className='project__info'>
          <div className='project__owner'>
            <h3>Project Owner</h3>
            <p>{project.owner}</p>
          </div>

          <div className='project__desc'>
            <h3>Project Description</h3>
            <p>
              {project.description}
            </p>
          </div>

          <div className='project__collaborators'>
            <h3>Project Collaborators</h3>
            <ul>
              <li>Youssef Nassrallah</li>
              <li>Redwan Ben Yecho</li>
            </ul>
          </div>

          <div className='project__status'>
            <h3>Project Status</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails