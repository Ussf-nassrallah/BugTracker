import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from '../../../assets/Logo.png'
import Circles from '../../../assets/circles.png'
import Vector from '../../../assets/Vector.png'
import Vector1 from '../../../assets/Vector-1.png'

import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";

import './Register.scss'

const Register = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState("man");
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [role, setRole] = useState("Software engineer");
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState(null);

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setGender(value);
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setRole(value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    function handleUserRequest(obj) {
      const keys = Object.keys(obj);
      for (const keyIdx in keys) {
        if (obj[keys[keyIdx]] === '' || obj[keys[keyIdx]] === null) {
          delete obj[keys[keyIdx]];
        }
      }
      return obj;
    }

    const request = handleUserRequest({
      username: username,
      phone: phone,
      gender: gender,
      age: age,
      role, role,
      email: email,
      password: password
    });

    // setError(false);

    if (confPass !== password) {
      setError(true);
      setErrorMessage("Password and confirmed password do not match. Please try again.");
      setInterval(() => {
        setError(false);
        setErrorMessage("");
      }, 8000);
      return;
    }

    await axios
      .post("http://127.0.0.1:5000/api/v1/signup", request)
      .then((data) => {
        console.log(data.data)
        navigate("/login");
      })
      .catch((error) => {
        setError(true);
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
        setInterval(() => {
          setError(false);
        }, 8000);
      });
  };

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

        <form className='form' onSubmit={handleSignup}>
          <div className='form__intro'>
            <h1>Create an account</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>
          </div>

          {/* Error */}
          {error ? (
            <div>
              <p className="error">{errorMessage}</p>
            </div>
          ) : null}

          {/* username */}
          <div>
            <label htmlFor='username' className='form__label'>Your fullname<span>*</span></label>
            <input
              id='username'
              name='username'
              type='text'
              className={error && errorMessage.includes('username') ? "form__input form__input__error" : "form__input"}
              placeholder='Enter Your fullname'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* user age and gender */}
          <div className='gender_and_age'>
            {/* user gender */}
            <div>
              <label htmlFor='usergender' className='form__label'>Gender<span>*</span></label>
              <select id='usergender' className={error && errorMessage.includes('gender') ? "form__input form__input__error" : "form__input"} value={gender} onChange={handleGenderChange}>
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
                className={error && errorMessage.includes('age') ? "form__input form__input__error" : "form__input"}
                placeholder='Enter Your age'
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          {/* user email */}
          <div>
            <label htmlFor='email' className='form__label'>Email address<span>*</span></label>
            <input
              id='email'
              type='email'
              className={error && errorMessage.includes('email') ? "form__input form__input__error" : "form__input"}
              name='email'
              placeholder='Enter email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* user phone number */}
          <div>
            <label htmlFor='phone_number' className='form__label'>Phone number<span>*</span></label>
            <input
              id='phone_number'
              type='text'
              className={error && errorMessage.includes('phone') ? "form__input form__input__error" : "form__input"}
              name='phone_number'
              placeholder='Enter phone number'
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* user role */}
          <div>
            <label htmlFor='role' className='form__label'>Role<span>*</span></label>
            <select id='role' className={error && errorMessage.includes('role') ? "form__input form__input__error" : "form__input"} value={role} onChange={handleRoleChange}>
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
              className={error && errorMessage.includes('password') ? "form__input form__input__error" : "form__input"}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* confirme user password */}
          <div>
            <label htmlFor='conf_password' className='form__label'>Confirme password<span>*</span></label>
            <input
              id='conf_password'
              type='password'
              className={error && errorMessage.includes('password') ? "form__input form__input__error" : "form__input"}
              name='conf_password'
              onChange={(e) => setConfPass(e.target.value)}
            />
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