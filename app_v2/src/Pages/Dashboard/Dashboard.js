import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
// Components
import Navbar from '../../Layout/Navbar/Navbar'
import ProjectsCards from '../../Components/Cards/ProjectsCards';
import ProjectTicketsCards from '../../Components/Cards/ProjectTicketsCards';
// Styles
import './Dashboard.scss'

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // get user information : decodetoken
    const token = localStorage.getItem("token");
    const userData = decodeToken(token);
    setUser(userData);
  }, []);

  return (
    <div className='db__content bg__light dashboard'>
      <Navbar />

      <h2 className='text__primary'>Welcome, {user.username}</h2>

      <div>
        <ProjectsCards />
        <ProjectTicketsCards />
      </div>
    </div>
  )
}

export default Dashboard