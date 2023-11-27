import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
// Icons
import { MdClose } from "react-icons/md";
// Components
import Sidebar from "./Sidebar/Sidebar";
import ProjectsList from "./Projects/ProjectsList";
import ProjectDetails from "./Projects/ProjectDetails";
// styles
import "./Dashboard.scss";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(false);
  const [activeProject, setActiveProject] = useState(0); // 0 represent the index of the project
  const [projectsList, setProjectsList] = useState(false);
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  // project info
  const [projectName, setProjectName] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [projectRepository, setProjectRepository] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [Users, setUsers] = useState(null);
  // const [projectOwner, setProjectOwner] = useState(null);

  async function fetchData() {
    const token = localStorage.getItem("token");
    if (token) {
      const myDecodedToken = decodeToken(token);
      await axios
        .get(`http://127.0.0.1:5000/api/v1/users/${myDecodedToken.id}/projects`)
        .then((data) => {
          setProjects(data.data);
        })
        .catch((error) => {});
      setUser(myDecodedToken);
      // setProjectOwner(user.id);
      // console.log('token', token);
      // console.log('DecodedToken', myDecodedToken);
    } else {
      console.log("Token not found. User may need to log in.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(user);

  const handleProjects = async (e) => {
    e.preventDefault();

    const request = {
      created_by: user.id,
      name: projectName,
      description: projectDescription,
      link_repo: projectRepository,
      members: members,
    };
    // console.log(members);

    await axios
      .post("http://127.0.0.1:5000/api/v1/projects", request)
      .then((data) => {
        // console.log(data);
        setIsSuccess(true);
        setSuccessMessage(data.data.message);
        setInterval(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 7000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModal = async () => {
    setForm(!form);
    await axios
      .get(`http://127.0.0.1:5000/api/v1/users`)
      .then((data) => {
        const transformedData = data.data.map((user) => {
          return {
            value: user.id,
            label: user.username,
          };
        })
        setUsers(transformedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="db">
      <Sidebar />

      <div className="db__content">
        {projects.length !== 0 ? (
          <>
            <ProjectsList
              handleModal={handleModal}
              projects={projects}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
              projectsList={projectsList}
              setProjectsList={setProjectsList}
            />

            <ProjectDetails
              user={user}
              project={projects[activeProject]}
              setProjectsList={setProjectsList}
              projectsList={projectsList}
            />
          </>
        ) : null}

        {form && (
          <div className="project__form">
            <form className="form" onSubmit={handleProjects}>
              <h2>Create a New Project</h2>
              {isSuccess && (
                <div className="successMessage">{successMessage}</div>
              )}
              {/* project name */}
              <div>
                <label htmlFor="name" className="form__label">
                  Project Title<span>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form__input"
                  placeholder="Project Title"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              {/* project Description */}
              <div>
                <label htmlFor="description" className="form__label">
                  Project Description<span>*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  className="form__input"
                  placeholder="Project Description"
                  onChange={(e) => setProjectDescription(e.target.value)}
                ></textarea>
              </div>

              {/* project collaborators */}
              <div>
                <label for="collaborators" className="form__label">
                  Project Collaborators<span>*</span>
                </label>
                {Users && (
                  <Select
                    options={Users}
                    isMulti
                    onChange={(e) => {
                      const members = e.map((member) => member.value);
                      setMembers(members);
                    }}
                  />
                )
                }
              </div>

              {/* project collaborators */}
              <div>
                <label for="repository" className="form__label">
                  Project Repository<span>*</span>
                </label>
                <input
                  id="repository"
                  name="repository"
                  type="text"
                  className="form__input"
                  placeholder="GitHub Repository link"
                  onChange={(e) => setProjectRepository(e.target.value)}
                />
              </div>

              {/* submit */}
              <button type="submit" className="btn-primary">
                Create Project
              </button>
              <div className="close-icon" onClick={() => setForm(false)}>
                <MdClose />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
