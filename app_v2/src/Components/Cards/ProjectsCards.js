import React, { useState, useEffect } from 'react'
import { decodeToken } from 'react-jwt';
import axios from 'axios'
import LoadingRoller from '../Loading/LoadingRoller'
// Components
import Card from './Card';
// styles
import './ProjectsCards.scss';

const ProjectsCards = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get user information : decodetoken
    const token = localStorage.getItem("token");
    const user = decodeToken(token);
    setUser(user);

    const fetchProjects = async () => {
      setLoading(true);
      await axios.get(`http://127.0.0.1:5000/api/v1/users/${user.id}/projects`)
        .then((data) => {
          setProjects(data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchProjects();
  }, []);

  const userProjects = projects.filter(project => project.created_by.id === user.id);
  const uniqueIds = new Set();
  const uniqueUserProjects = userProjects.filter(item => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true;
    }
    return false;
  });
  const collaborations = projects.filter(project => project.created_by.id !== user.id);

  const projectsLength = uniqueUserProjects.length;
  const collaborationsLength = collaborations.length;

  if (loading) {
    return (
      <div className='projects__cards loading'>
        <LoadingRoller />
      </div>
    )
  }

  return (
    <>
      <h3 className='text__primary' style={{ padding: "0 2rem", fontSize: "24px", fontWeight: "500" }}>Projects</h3>
      <div className='projects__cards'>
        <Card title={'Projects'} count={projectsLength} />
        <Card title={'Collaborations'} count={collaborationsLength} />
      </div>
    </>
  )
}

export default ProjectsCards