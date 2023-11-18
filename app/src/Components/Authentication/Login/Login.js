import React from 'react'

import Logo from '../../../assets/Logo.png'
import Circles from '../../../assets/circles.png'
import Vector from '../../../assets/Vector.png'
import Vector1 from '../../../assets/Vector-1.png'

import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";

import './Login.scss'

const Login = () => {
  return (
    <main className='login'>
      <section className='login__cta'>
        <Link to={'/'}>
          <div className='logo'>
            <img src={Logo} alt='logo' />
          </div>
        </Link>
        <div className='login__cta__content'>
          <FaQuoteLeft className='icon' />
          <p>
            🚀 Fuel your success! 🔐 Log in now to our Project Management System and transform your goals into achievements. Every login propels you towards organized workflows and seamless collaboration. Let's make your projects thrive together! 🌟
          </p>
          <img src={Vector1} alt='' className='vector1' />
          <img src={Circles} alt='' className='circles' />
        </div>

        <img src={Vector} alt='' className='vector' />
      </section>

      <section className='login__form'>
        <div className='login__form-header'>
          <Link to={'/'}>
            <IoIosArrowBack className='icon' /><span>Back</span>
          </Link>
          <p>Personal Info.</p>
          {/* <button className='btn-secondary'>Login</button> */}
        </div>

        <form className='form' action='' method=''>
          <div className='form__intro'>
            <h1>Welcome Back!</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>
          </div>

          {/* user email */}
          <div>
            <label for='email' className='form__label'>Email address<span>*</span></label>
            <input id='email' type='email' className='form__input' name='email' placeholder='Enter email address' />
          </div>
          {/* user password */}
          <div>
            <label for='password' className='form__label'>Password (6 or more characters)<span>*</span></label>
            <input id='password' type='password' className='form__input' name='password' />
          </div>

          <button type='submit' className='btn-primary'>Login</button>
          <p className='end__form'>Don't have an account ? <Link to={'/register'}>Sign up</Link></p>
        </form>
      </section>
    </main>
  )
}

export default Login