import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Components
import Navbar from '../../Layout/Navbar/Navbar';
import KanbanBoard from '../../Components/Tickets/KanbanBoard';
import LoadingRoller from '../../Components/Loading/LoadingRoller';
// Icons
import { FiSearch } from "react-icons/fi";
import TicketsIcon from '../../assets/tickets-icon.png';
// styles
import './ProjectTickets.scss';

const ProjectTickets = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      await axios.get(`http://127.0.0.1:5000/api/v1/projects/${id}`)
        .then((data) => {
          setProject(data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchProject();
  }, []);

  if (loading) {
    return (
      <div className='db__content bg__light project__detail'>
        <Navbar />
        <div className='project__detail__loading'>
          <LoadingRoller />
        </div>
      </div>
    )
  }

  return (
    <div className='db__content project__tickets'>
      <Navbar />

      <header className='tickets__header'>
        <h3 className='text__primary'>
          <img src={TicketsIcon} alt='tickets-icon' /> {project.name} - Progress Board <span className='length-tag'>9 Tickets</span>
        </h3>

        <div>
          <div className='search'>
            <FiSearch className='search__icon' />
            <input className='search__input' placeholder='Search...' />
          </div>
        </div>
      </header>

      <div className='project__tickets__board'>
        <KanbanBoard tickets={project.tickets} />
      </div>
    </div>
  )
}

export default ProjectTickets