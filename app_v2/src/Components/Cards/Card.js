import React from 'react';
import './Card.scss'

const Card = ({ title, count }) => {
  return (
    <div className='card'>
      <div className='card__title'>{title}</div>
      <div className='card__count'>{count}</div>
    </div>
  )
}

export default Card