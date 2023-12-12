import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from '../../Layout/Sidebar/Sidebar';

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  let auth = { 'token': token };

  return (
    auth.token !== null ? <><Sidebar /><Outlet /></> : <Navigate to='/login' />
  )
}

export default PrivateRoute