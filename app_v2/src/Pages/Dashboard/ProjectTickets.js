import React from 'react';
// Components
import Navbar from '../../Layout/Navbar/Navbar';
import KanbanBoard from '../../Components/Tickets/KanbanBoard';
// Icons
import { FiSearch } from "react-icons/fi";
import TicketsIcon from '../../assets/tickets-icon.png';
// styles
import './ProjectTickets.scss';

const ProjectTickets = () => {
  return (
    <div className='db__content project__tickets'>
      <Navbar />

      <header className='tickets__header'>
        <h3 className='text__primary'>
          <img src={TicketsIcon} alt='tickets-icon' /> Fitness tracking app - Progress Board <span className='length-tag'>9 Tickets</span>
        </h3>

        <div>
          <div className='search'>
            <FiSearch className='search__icon' />
            <input className='search__input' placeholder='Search...' />
          </div>
        </div>
      </header>

      <div className='project__tickets__board'>
        <KanbanBoard />
      </div>
    </div>
  )
}

export default ProjectTickets