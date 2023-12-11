import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  let auth = { 'token': token };

  console.log(token);

  return (
    auth.token !== null ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoute