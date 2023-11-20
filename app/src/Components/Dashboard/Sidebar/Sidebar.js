import React from 'react'
import { Link } from 'react-router-dom'

import { FaRegFolder, FaTasks } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";

import Logo from '../../../assets/Logo.png'
import Avatar from '../../../assets/avatar.jpg'

import './Sidebar.scss'

const Sidebar = () => {
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