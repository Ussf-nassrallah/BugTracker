import React, { useState, useEffect } from 'react'
import { decodeToken } from "react-jwt";
import { Link } from 'react-router-dom'

import { FaRegFolder, FaTasks } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";

import Logo from '../../../assets/Logo.png'
import Avatar from '../../../assets/avatar.jpg'

import './Sidebar.scss'

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const myDecodedToken = decodeToken(token);
      setUser(myDecodedToken);
    } else {
      console.log("Token not found. User may need to log in.");
    }
  }, []);

  return (
    <div className='sidebar'>
      <div className='logo'>
        <Link to={'/'}>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>

      <ul className='sidebar__links'>
        <li className='active'><FaRegFolder className='icon' /> Projects</li>
        <li><FaTasks className='icon' /> Tasks</li>
        <li><MdSettings className='icon' /> Settings</li>
      </ul>

      <div className='profile'>
        <div className='profile__info'>
          <div className='profile__img'>
            <img src={Avatar} alt='avatar' />
          </div>
          <div className='profile__info__nr'>
            <h4>{user !== null ? user.username : ''}</h4>
            <p>{user !== null ? user.role : ''}</p>
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