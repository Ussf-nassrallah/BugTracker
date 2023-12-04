import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Icons
import { FaFolder, FaTicketAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdSettings, MdLogout } from "react-icons/md";
// Images
import Logo from '../../assets/Logo.png'
import Avatar from '../../assets/avatar.jpg'
// Styles
import './Sidebar.scss'

const Sidebar = () => {
  const links = [
    {
      id: 0,
      path: '/dashboard',
      name: 'Dashboard',
      icon: <MdDashboard className='icon' />
    },
    {
      id: 1,
      path: '/dashboard/projects',
      name: 'Projects',
      icon: <FaFolder className='icon folder' />
    },
    {
      id: 2,
      path: '/dashboard/tickets',
      name: 'Tickets',
      icon: <FaTicketAlt className='icon' />
    },
    {
      id: 3,
      path: '/dashboard/settings',
      name: 'Settings',
      icon: <MdSettings className='icon' />
    }
  ];

  const [activeLink, setActiveLink] = useState(
    localStorage.getItem('linkIndex') || 0
  );

  const handleActiveLinkChange = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    localStorage.setItem('linkIndex', activeLink);
  }, [activeLink]);

  return (
    <div className='sidebar'>
      <div className='logo'>
        <Link to={'/'}>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>

      <ul className='sidebar__links'>
        {links.map((link, index) => <li key={index} onClick={() => handleActiveLinkChange(index)}>
          <Link
            className={index == activeLink ? 'sidebar__links__ele active' : 'sidebar__links__ele'}
            to={link.path}
          >
            {link.icon} {link.name}
          </Link>
        </li>)}
      </ul>

      <div className='profile'>
        <div className='profile__info'>
          <div className='profile__img'>
            <img src={Avatar} alt='avatar' />
          </div>
          <div className='profile__info__nr'>
            <h4>Youssef Nasrallah</h4>
            <p>Full-stack Web developer</p>
          </div>
        </div>
        <div className='logout'>
          <MdLogout className='icon' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar