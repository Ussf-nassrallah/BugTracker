import React, { useState } from 'react'
import Project from './Project';

import "./ProjectsList.scss";

const ProjectsList = ({ handleModal, projects, activeProject, setActiveProject, projectsList, setProjectsList }) => {
  const [isActive, setActive] = useState(0);

  const handleToggleActive = (index) => {
    // console.log(index);
    setActive(index === isActive ? 0 : index);
    setActiveProject(index);
  }

  return (
    <div className={projectsList ? 'projects hide' : 'projects'}>
      <header className='projects__header'>
        <div className='new__project'>
          <h2>Projects</h2>
          <button className='btn-primary' onClick={handleModal}>New Project</button>
        </div>

        <div className='projects__header__search'>
          <input type='text' placeholder='Search' className='form__input' />
          <button className='btn-secondary'>Search</button>
        </div>
      </header>

      {
        projects.map((project, index) =>
          <Project
            key={index}
            project={project}
            handleToggleActive={handleToggleActive}
            idx={index}
            isActive={isActive}
          />)
      }
    </div>
  )
}

export default ProjectsList