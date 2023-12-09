import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Home from './Pages/Home/Home';
import Register from './Pages/Authentication/Register/Register';
import Login from './Pages/Authentication/Login/Login';
import Sidebar from './Layout/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Projects from './Pages/Dashboard/Projects';
import ProjectDetails from './Pages/Dashboard/ProjectDetails';
import Tickets from './Pages/Dashboard/Tickets';
import Settings from './Pages/Dashboard/Settings';

// Styles
import './App.scss';

function App() {
  return (
    <div className='container'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/projects/:id" element={<ProjectDetails />} />
        <Route path="/dashboard/tickets" element={<Tickets />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
