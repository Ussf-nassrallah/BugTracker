import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import { MdNotifications, MdMessage, MdArrowDropDown, MdArrowRight, MdEdit, MdAccountCircle } from "react-icons/md";

import './Navbar.scss';

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className='db__nav'>
      <h3 className='text__primary'>Dashboard</h3>

      <ul className='db__nav__links'>
        <li>
          <Link>
            <MdNotifications className='icon' />
          </Link>
        </li>

        <li>
          <Link>
            <MdMessage className='icon' />
          </Link>
        </li>

        <li onClick={() => setDropDown(!dropDown)}>
          <Link>
            <span>My Account</span>
            {dropDown ? <MdArrowDropDown  className='icon' /> : <MdArrowRight  className='icon' />}
          </Link>

          {dropDown && <ul className='db__nav__dropdown'>
            <li>
              <Link>
                <MdAccountCircle className='icon' />
                <span>My Profile</span>
              </Link>
            </li>

            <li>
              <Link>
                <MdEdit  className='icon' />
                <span>Update Profile</span>
              </Link>
            </li>
          </ul>}
        </li>
      </ul>

    </nav>
  )
}

export default Navbar