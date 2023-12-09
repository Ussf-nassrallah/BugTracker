import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';
import './Login.scss';

const Login = () => {
  return (
    <div className='login'>
      <Link to={'/'}>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
      </Link>

      <div className='login__form'>
        <form className='form'>
          <div className='form__intro'>
            <h1>Welcome Back!</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>
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

          {/* submit */}
          <div className='form__outro'>
            <button type='submit' className='btn btn__primary'>Login</button>
            <p>Don't have an account ? <Link to={'/register'}>Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login