import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';
import './Register.scss';

const Register = () => {
  return (
    <div className='register'>
      <Link to={'/'}>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
      </Link>

      <div className='register__form'>
        <form className='form'>
          <div className='form__intro'>
            <h1>Create an account</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>
          </div>

          {/* username */}
          <div>
            <label htmlFor='username' className='form__label'>Your fullname<span>*</span></label>
            <input
              id='username'
              name='username'
              type='text'
              className="form__input"
              placeholder='Enter Your fullname'
            />
          </div>

          {/* user age and gender */}
          <div className='gender_and_age'>
            {/* user gender */}
            <div>
              <label htmlFor='usergender' className='form__label'>Gender<span>*</span></label>
              <select id='usergender' className="form__input">
                <option value='man'>Man</option>
                <option value='woman'>Woman</option>
              </select>
            </div>
            {/* user age */}
            <div>
              <label htmlFor='age' className='form__label'>Age<span>*</span></label>
              <input
                id='age'
                name='age'
                type='number'
                className="form__input"
                placeholder='Enter Your age'
              />
            </div>
          </div>

          {/* user email */}
          <div>
            <label htmlFor='email' className='form__label'>Email address<span>*</span></label>
            <input
              id='email'
              type='email'
              className="form__input"
              name='email'
              placeholder='Enter email address'
            />
          </div>

          {/* user phone number */}
          <div>
            <label htmlFor='phone_number' className='form__label'>Phone number<span>*</span></label>
            <input
              id='phone_number'
              type='text'
              className="form__input"
              name='phone_number'
              placeholder='Enter phone number'
            />
          </div>

          {/* user role */}
          <div>
            <label htmlFor='role' className='form__label'>Role<span>*</span></label>
            <select id='role' className="form__input">
              <option value='engineer'>Software engineer</option>
              <option value='designer'>Designer</option>
              <option value='manager'>Project manager</option>
            </select>
          </div>

          {/* user password */}
          <div>
            <label htmlFor='password' className='form__label'>Password (6 or more characters)<span>*</span></label>
            <input
              id='password'
              type='password'
              className="form__input"
              name='password'
            />
          </div>

          {/* confirme user password */}
          <div>
            <label htmlFor='conf_password' className='form__label'>Confirme password<span>*</span></label>
            <input
              id='conf_password'
              type='password'
              className="form__input"
              name='conf_password'
            />
          </div>

          {/* submit */}
          <div className='form__outro'>
            <button type='submit' className='btn btn__primary'>Register Account</button>
            <p>Already have an account <Link to={'/login'}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register