import React from 'react'

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name <MdArrowDownward className='icon' /></th>
          <th>Project Description <MdArrowDownward className='icon' /></th>
          <th>Project Members <MdArrowDownward className='icon' /></th>
          <th>Created_at <MdArrowDownward className='icon' /></th>
          <th>Actions <MdArrowDownward className='icon' /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fitness Tracker</td>
          <td>Regular text column</td>
          <td>Youssef Nasrallah, Redwan Ben Yecho</td>
          <td>12/5/2023 3:44</td>
          <td className='action__btns'>
            <button className='action__btns__edit'>Edit</button>
            <button className='action__btns__delete'>Delete</button>
          </td>
        </tr>
        <tr>
          <td>Fitness Tracker</td>
          <td>Regular text column</td>
          <td>Youssef Nasrallah, Redwan Ben Yecho</td>
          <td>12/5/2023 3:44</td>
          <td className='action__btns'>
            <button className='action__btns__edit'>Edit</button>
            <button className='action__btns__delete'>Delete</button>
          </td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  )
}

export default Table