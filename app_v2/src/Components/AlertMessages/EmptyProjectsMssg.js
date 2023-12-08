import React from 'react';

import './AlertMessages.scss';

const EmptyProjectsMssg = () => {
  return (
    <div className='message'>
      <p>Looks like you're starting with a clean slate! You currently have 0 projects. Ready to kick off something new? Click on <span className='text__primary'>"Create a new Project"</span> to get started and organize your tasks efficiently.</p>
    </div>
  )
}

export default EmptyProjectsMssg