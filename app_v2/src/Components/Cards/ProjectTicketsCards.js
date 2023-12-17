import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios'
import LoadingRoller from '../Loading/LoadingRoller'
// Components
import Card from './Card';
// styles
import './ProjectsCards.scss';
import './ProjectTicketsCards.scss';


const ProjectTicketsCards = () => {
  const [user, setUser] = useState({});
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get user information : decodetoken
    const token = localStorage.getItem("token");
    const user = decodeToken(token);
    setUser(user);

    const fetchTickets = async () => {
      setLoading(true);
      await axios.get(`http://127.0.0.1:5000/api/v1/users/${user.id}/tickets`)
        .then((data) => {
          setTickets(data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTickets();
  }, []);

  const ticketsLength = tickets.length;

  const proposed = tickets.filter((ticket) => ticket.status === 'Proposed');
  const inProgress = tickets.filter((ticket) => ticket.status === 'In Progress');
  const devComplete = tickets.filter((ticket) => ticket.status === 'Dev Complete');

  const proposedLength = proposed.length;
  const inProgressLength = inProgress.length;
  const devCompleteLength = devComplete.length;

  if (loading) {
    return (
      <div className='projects__cards loading'>
        <LoadingRoller />
      </div>
    )
  }

  return (
    <div className='project__tickets__cards'>
      <h3 className='text__primary' style={{ padding: "2rem 0", fontSize: "24px", fontWeight: "500" }}>Tickets</h3>

      <Card title={'Tickets'} count={ticketsLength} />

      <div className='tickets__types'>
        <Card title={'Features'} count={tickets.filter((ticket) => ticket.ticket_type === 'feature').length} />
        <Card title={'Issues'} count={tickets.filter((ticket) => ticket.ticket_type === 'issue').length} />
        <Card title={'Bugs'} count={tickets.filter((ticket) => ticket.ticket_type === 'bug').length} />
      </div>

      <div className='tickets__status'>
        <Card title={'Proposed'} count={proposedLength} />
        <Card title={'In Progress'} count={inProgressLength} />
        <Card title={'Dev Complete'} count={devCompleteLength} />
      </div>
    </div>
  )
}

export default ProjectTicketsCards