import React, { useState } from 'react'
import { MdBugReport, MdLightbulb, MdReportProblem, MdClose } from "react-icons/md";
import Sidebar from './Sidebar/Sidebar'

import './Dashboard.scss'

const projects = [
  {
    id: 1,
    titie: 'todo web app',
    owner: 'Youssef Nasrallah',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
];

const Dashboard = () => {
  const [form, setForm] = useState(false);

  return (
    <div className='db'>
      <Sidebar />
      <div className='db__content'>
        <div className='projects'>

          <header className='projects__header'>
            <div className='new__project'>
              <h2>Projects</h2>
              <button className='btn-primary' onClick={() => setForm(true)}>New Project</button>
            </div>

            <div className='projects__header__search'>
              <input type='text' placeholder='Search' className='form__input' />
              <button className='btn-secondary'>Search</button>
            </div>
          </header>

          <div className='project active'>
            <h2 className='project__name'>{projects[0].titie}</h2>
            <p className='project__owner'><b>Owner: </b>{projects[0].owner}</p>
            <p className='project__desc'>{projects[0].description}</p>
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

          <div className='project'>
            <h2 className='project__name'>{projects[0].titie}</h2>
            <p className='project__owner'><b>Owner: </b>{projects[0].owner}</p>
            <p className='project__desc'>{projects[0].description}</p>
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

          <div className='project'>
            <h2 className='project__name'>{projects[0].titie}</h2>
            <p className='project__owner'><b>Owner: </b>{projects[0].owner}</p>
            <p className='project__desc'>{projects[0].description}</p>
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

          <div className='project'>
            <h2 className='project__name'>{projects[0].titie}</h2>
            <p className='project__owner'><b>Owner: </b>{projects[0].owner}</p>
            <p className='project__desc'>{projects[0].description}</p>
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
        </div>

        <div className='project__details'>
          <div className='project'>
            <div className='project__header'>
              <h2>{projects[0].titie}</h2>
              <div className='project__header__buttons'>
                <button className='btn-primary'>Project Tickets</button>
                <button className='btn-secondary'>Edit Project</button>
              </div>
            </div>

            <div className='project__info'>
              <div className='project__owner'>
                <h3>Project Owner</h3>
                <p>Youssef Nasrallah</p>
              </div>

              <div className='project__desc'>
                <h3>Project Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

        {form && <div className='project__form'>
          <form className='form'>
            <h2>Create a New Project</h2>

            {/* project name */}
            <div>
              <label for='name' className='form__label'>Project Title<span>*</span></label>
              <input id='name' name='name' type='text' className='form__input' placeholder='Project Title' />
            </div>

            {/* project Description */}
            <div>
              <label for='description' className='form__label'>Project Description<span>*</span></label>
              <textarea id='description' name='description' type='text' className='form__input' placeholder='Project Description'></textarea>
            </div>

            {/* project collaborators */}
            <div>
              <label for='collaborators' className='form__label'>Project Collaborators<span>*</span></label>
              <input id='collaborators' name='collaborators' type='text' className='form__input' placeholder='Add Collaborators' />
              <ul>
                <li>Youssef Nassrallah</li>
                <li>Redwan Ben Yecho</li>
              </ul>
            </div>

            {/* project collaborators */}
            <div>
              <label for='repository' className='form__label'>Project Repository<span>*</span></label>
              <input id='repository' name='repository' type='text' className='form__input' placeholder='GitHub Repository link' />
            </div>

            {/* submit */}
            <button type='submit' className='btn-primary'>Create Project</button>
            <div className='close-icon' onClick={() => setForm(false)}>
              <MdClose />
            </div>
          </form>
        </div>}
      </div>
    </div>
  )
}

export default Dashboard