import React from 'react';
import { MdDelete, MdOutlineCancel } from "react-icons/md";

const DeleteAlertMssg = ({ setDeleteAlertMessage, project }) => {
  return (
    <div className='alert__mssg'>
      <div className='alert__mssg__content'>
        <h5>Delete Fitness Tracking App!</h5>
        <p>Are you sure want to delete "{project.name}" ?</p>
        <div className='buttons'>
          <button className='btn btn__light' onClick={() => setDeleteAlertMessage(false)}>
            <MdOutlineCancel className='icon' />Cancel
          </button>

          <button className='btn btn__danger'>
            <MdDelete className='icon' />Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlertMssg