import React, { useState } from 'react';
// Icons
import { MdAdd, MdArrowDownward } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
// Components
import Navbar from '../../Layout/Navbar/Navbar'
// Styles
import './Projects.scss'

const Projects = () => {
  const [zeroProjectsMssg, setZeroProjectsMssg] = useState(true);
  const [zeroCollabMssg, setZeroCollabMssg] = useState(true);
  return (
    <div className='db__content bg__light projects'>
      <Navbar />

      <h2 className='text__primary'>Projects</h2>

      <div className='all__projects'>
        <div className='my__projects'>
          <header className='projects__header'>
            <h3 className='text__primary'>
              Projects I've Made <span className='length-tag'>0 Project</span>
            </h3>

            <div>
              <div className='search'>
                <FiSearch className='search__icon' />
                <input className='search__input' placeholder='Search...' />
              </div>

              <button className='btn btn__primary'>
                <MdAdd className='icon' />Create a new project
              </button>
            </div>
          </header>

          {zeroProjectsMssg && <div className='message'>
            <p>Looks like you're starting with a clean slate! You currently have 0 projects. Ready to kick off something new? Click on <span className='text__primary'>"Create a new Project"</span> to get started and organize your tasks efficiently.</p>
          </div>}
        </div>

        <div className='my__collab'>
          <header className='projects__header'>
            <h3 className='text__primary'>
              My Collaborations <span className='length-tag'>0 Collab</span>
            </h3>
          </header>

          {zeroCollabMssg && <div className='message'>
            <p>You currently have no collaborations. If you have projects to work on with others, invite them to join and start collaborating. Teamwork makes the dream work!</p>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Projects