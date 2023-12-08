import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { MdArrowDownward } from "react-icons/md";
// Styles
import './Table.scss'

const MembersTable = ({members}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username <MdArrowDownward className='icon' /></th>
          <th>Position <MdArrowDownward className='icon' /></th>
          <th>Email <MdArrowDownward className='icon' /></th>
          <th>Phone <MdArrowDownward className='icon' /></th>
          <th>Actions <MdArrowDownward className='icon' /></th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => <tr key={index}>
          <td>{member.username}</td>
          <td>{member.role}</td>
          <td>{member.email}</td>
          <td>{member.phone}</td>
          <td className='action__btns'>
            <button className='action__btns__edit'>Edit</button>
            <button className='action__btns__delete'>Delete</button>
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default MembersTable