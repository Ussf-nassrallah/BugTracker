import React from 'react';

import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Pages/Authentication/PrivateRoutes';

// Components
// import Home from './Pages/Home/Home';
import Register from './Pages/Authentication/Register/Register';
import Login from './Pages/Authentication/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Projects from './Pages/Dashboard/Projects';
import ProjectDetails from './Pages/Dashboard/ProjectDetails';
import Tickets from './Pages/Dashboard/Tickets';
import ProjectTickets from './Pages/Dashboard/ProjectTickets';
import Settings from './Pages/Dashboard/Settings';

// Styles
import './App.scss';

function App() {
  return (
    <div className='container'>
      <Routes>
        {/* Public Routes */}
        <Route path='/' Component={() => {
          window.location.href = 'https://riyo3350g.github.io/';
          return null;
        }} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Private Routes: only for auth users */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/dashboard/projects" element={<Projects exact />} />
          <Route path="/dashboard/projects/:id" element={<ProjectDetails />} exact />
          <Route path="/dashboard/tickets" element={<Tickets />} exact />
          <Route path="/dashboard/tickets/:id" element={<ProjectTickets />} exact />
          <Route path="/dashboard/settings" element={<Settings />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
