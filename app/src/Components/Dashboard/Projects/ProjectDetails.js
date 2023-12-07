import React, { useState, useEffect } from "react";
import { BsBoxArrowLeft, BsBoxArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import axios from "axios";

import "./ProjectDetails.scss";

const ProjectDetails = ({ user, project, projectsList, setProjectsList, activeProject }) => {
  const [ticketsForm, setTicketsForm] = useState(false);
  const [ticketTitle, setTicketTitle] = useState(null);
  const [ticketDescription, setTicketDescription] = useState(null);
  const [ticketType, setTicketType] = useState('feature');
  const [ticketStatus, setTicketStatus] = useState('proposed');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [ticketOwner, setTicketOwner] = useState("");
  const [isZero, setIsZero] = useState(true); // checks if active project idx is zero


  const handleTickets = async (e) => {
    e.preventDefault();

    const request = {
      title: ticketTitle,
      description: ticketDescription,
      created_by: user.id,
      parent_id: project.id,
      ticket_type: ticketType,
      status: ticketStatus
    }

    console.log(request);

    // await axios
    //   .post('http://127.0.0.1:5000/api/v1/tickets', request)
    //   .then((data) => {
    //     setIsSuccess(true);
    //     setMessage(data.data.message);

    //     setInterval(() => {
    //       setIsSuccess(false);
    //       setMessage("");
    //     }, 6000);
    //   })
    //   .catch((e) => {
    //     setError(true);
    //     setMessage(e.response.data.message);

    //     setInterval(() => {
    //       setError(false);
    //       setMessage("");
    //     }, 6000);
    //   })
  }

  const handleTicketStatus = (e) => {
    const value = e.target.value;
    setTicketStatus(value);
  };

  const handleTicketType = (e) => {
    const value = e.target.value;
    setTicketType(value);
  };

  const handleTicketOwner = (e) => {
    const value = e.target.value;
    setTicketOwner(value);
  }

  const fetchMembers = async () => {
    await axios
      .get(`http://127.0.0.1:5000/api/v1/projects/${project.id}/members`)
      .then((data) => {
        const users = data.data;
        const projectMembers = users.map((user) => {
          return {
            id: user.id,
            username: user.username
          }
        })
        // console.log(projectMembers);
        setMembers(projectMembers);
        // console.log(members);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // excute fetchMembers function when activeProject idx is zero then break the statement
  if (activeProject === 0 && isZero) {
    fetchMembers();
    setIsZero(false);
  }

  // activeProject === project index
  useEffect(() => {
    fetchMembers();
  }, [activeProject]);

// console.log(members);

  return (
    <div className="project__details">
      <div className="project">
        <div className="project__header">
          <div className="project__header__info">
            <div onClick={() => setProjectsList(!projectsList)}>
              {projectsList ? (
                <BsBoxArrowRight className="icon" />
              ) : (
                <BsBoxArrowLeft className="icon" />
              )}
            </div>
            <h2>
              {project.name}
            </h2>
          </div>
          <div className="project__header__buttons">
            <button className="btn-primary">Project Tickets</button>
            {
              project.created_by.id === user.id ? (
                <div>
                  <button className="btn-secondary">Edit Project</button>
                  <button className="btn-secondary" onClick={() => setTicketsForm(true)}>Create Ticket</button>
                </div>
              ) : null
            }
            
          </div>
        </div>

        <div className="project__info">
          <div className="project__owner">
            <h3>Project Owner</h3>
            <p>{project.created_by.username}</p>
          </div>

          <div className="project__desc">
            <h3>Project Description</h3>
            <p>{project.description}</p>
          </div>

          <div className="project__collaborators">
            <h3>Project Collaborators</h3>
            <ul>
              {project.members.map((collaborator, index) => (
                <li key={index}>{collaborator.username}</li>
              ))}
            </ul>
          </div>

          <div className="project__status">
            <h3>Project Status</h3>
          </div>
        </div>
      </div>


      {ticketsForm && (
        <div className="project__form">
          <form className="form" onSubmit={handleTickets}>
            <h2>Create a New Ticket</h2>
            {isSuccess && (
              <div className="successMessage">{message}</div>
            )}
            {error && (
              <div className="errorMessage">{message}</div>
            )}
            <div>
              <label htmlFor="title" className="form__label">
                Ticket Title<span>*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="form__input"
                placeholder="Ticket Title"
                onChange={(e) => setTicketTitle(e.target.value)}
              />
            </div>

            {/* Ticket Description */}
            <div>
              <label htmlFor="description" className="form__label">
                Ticket Description<span>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                type="text"
                className="form__input"
                placeholder="Ticket Description"
                onChange={(e) => setTicketDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label htmlFor='type' className='form__label'>Ticket Type<span>*</span></label>
              <select id='type' className="form__input" value={ticketType} onChange={handleTicketType}>
                <option value='feature'>feature</option>
                <option value='issue'>issue</option>
                <option value='bug'>bug</option>
              </select>
            </div>

            <div>
              <label htmlFor='status' className='form__label'>Ticket Status<span>*</span></label>
              <select id='status' className="form__input" value={ticketStatus} onChange={handleTicketStatus}>
                <option value='proposed'>proposed</option>
                <option value='in progress'>in progress</option>
                <option value='dev complete'>Dev Complete</option>
                <option value='tested'>tested</option>
                <option value='deployed'>deployed</option>
              </select>
            </div>

            <div>
              <label htmlFor='members' className='form__label'>Ticket Owner<span>*</span></label>
              <select id='members' className="form__input" value={ticketOwner} onChange={handleTicketOwner}>
                {
                  members.map((member, index) => <option key={index} value={member.id}>{member.username}</option>)
                }
              </select>
            </div>



            {/* submit */}
            <button type="submit" className="btn-primary">
              Create a New Ticket
            </button>
            <div className="close-icon" onClick={() => setTicketsForm(false)}>
              <MdClose />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
