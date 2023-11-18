import React from 'react'

import Logo from '../../../assets/Logo.png'
import Circles from '../../../assets/circles.png'
import Vector from '../../../assets/Vector.png'
import Vector1 from '../../../assets/Vector-1.png'

import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";

import './Register.scss'

const Register = () => {
  return (
    <main className='register'>
      <section className='register__cta'>
        <Link to={'/'}>
          <div className='logo'>
            <img src={Logo} alt='logo' />
          </div>
        </Link>
        <div className='register__cta__content'>
          <FaQuoteLeft className='icon' />
          <p>
            Unlock the potential of seamless project management! Join us to turn your ideas into accomplishments. Sign up now and start building extraordinary projects collaboratively. Your journey to efficiency and success begins with a single click. Ready to transform the way you work? Create your account today!
          </p>
          <img src={Vector1} alt='' className='vector1' />
          <img src={Circles} alt='' className='circles' />
        </div>

        <img src={Vector} alt='' className='vector' />
      </section>

      <section className='register__form'>
        <div className='register__form-header'>
          <Link to={'/'}>
            <IoIosArrowBack className='icon' /><span>Back</span>
          </Link>
          <p>Personal Info.</p>
          {/* <button className='btn-secondary'>Login</button> */}
        </div>

        <form className='form' action='' method=''>
          <div className='form__intro'>
            <h1>Create an account</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>
          </div>
          {/* username */}
          <div>
            <label for='username' className='form__label'>Your fullname<span>*</span></label>
            <input id='username' name='username' type='text' className='form__input' placeholder='Enter Your fullname' />
          </div>
          {/* user age and gender */}
          <div className='gender_and_age'>
            {/* user gender */}
            <div>
              <label for='age' className='form__label'>Gender<span>*</span></label>
              <select id='usergender' className='form__input'>
                <option value='man'>Man</option>
                <option value='woman'>Woman</option>
              </select>
            </div>
            {/* user age */}
            <div>
              <label for='age' className='form__label'>Age<span>*</span></label>
              <input id='age' name='age' type='number' className='form__input' placeholder='Enter Your age' />
            </div>
          </div>
          {/* user email */}
          <div>
            <label for='email' className='form__label'>Email address<span>*</span></label>
            <input id='email' type='email' className='form__input' name='email' placeholder='Enter email address' />
          </div>
          {/* user phone number */}
          <div>
            <label for='phone_number' className='form__label'>Phone number<span>*</span></label>
            <input id='phone_number' type='text' className='form__input' name='phone_number' placeholder='Enter phone number' />
          </div>
          {/* user role */}
          <div>
            <label for='role' className='form__label'>Role<span>*</span></label>
            <select id='role' className='form__input'>
              <option value='engineer'>Software engineer</option>
              <option value='designer'>Designer</option>
              <option value='manager'>Project manager</option>
            </select>
          </div>
          {/* user password */}
          <div>
            <label for='password' className='form__label'>Password (6 or more characters)<span>*</span></label>
            <input id='password' type='password' className='form__input' name='password' />
          </div>
          {/* confirme user password */}
          <div>
            <label for='conf_password' className='form__label'>Confirme password<span>*</span></label>
            <input id='conf_password' type='password' className='form__input' name='conf_password' />
          </div>
          {/* submit */}

          <button type='submit' className='btn-primary'>Register Account</button>

          <p className='end__form'>Already have an account <Link to={'/login'}>Login</Link></p>
        </form>
      </section>
    </main>
  )
}

export default Register