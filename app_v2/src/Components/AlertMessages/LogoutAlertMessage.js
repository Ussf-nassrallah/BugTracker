import React from 'react';
import { MdLogout, MdOutlineCancel } from "react-icons/md";

const DeleteAlertMssg = ({ setLogoutAlert, handleLogout }) => {
  return (
    <div className='alert__mssg'>
      <div className='alert__mssg__content'>
        <h5>Confirm logout</h5>
        <p>Are you sure you want to log out ?</p>
        <div className='buttons'>
          <button className='btn btn__light' onClick={() => setLogoutAlert(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>

          <button className='btn btn__secondary' onClick={() => handleLogout()}>
            <MdLogout className='icon' />Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlertMssg