import React, { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import LoadingRoller from '../../../Components/Loading/LoadingRoller';

import Logo from '../../../assets/Logo.png';
import './Register.scss';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  // user data
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState("man");
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [role, setRole] = useState("Software engineer");
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState(null);

  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setGender(value);
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setRole(value);
  };

  // Form Submit
  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

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

    await axios
      .post("http://127.0.0.1:5000/api/v1/signup", request)
      .then((data) => {
        // console.log(data.data)
        navigate("/login");
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  // console.log(errorMessage);

  return (
    <div className='register'>
      <Link to={'/'}>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
      </Link>

      <div className='register__form'>
        <form className='form' onSubmit={handleSignup}>
          <div className='form__intro'>
            <h1>Create an account</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>
          </div>

          {/* username */}
          <div className={errorMessage.username ? "error form__div" : "form__div"}>
            <label htmlFor='username' className='form__label'>Your fullname<span>*</span></label>
            <input
              id='username'
              name='username'
              type='text'
              className="form__input"
              placeholder='Enter Your fullname'
              onChange={(e) => setUsername(e.target.value)}
            />
            {errorMessage.username && <small className='error__message'>{errorMessage.username}</small>}
          </div>

          {/* user age and gender */}
          <div className='gender_and_age'>
            {/* user gender */}
            <div className={errorMessage.gender ? "error form__div" : "form__div"}>
              <label htmlFor='usergender' className='form__label'>Gender<span>*</span></label>
              <select id='usergender' className="form__input" value={gender} onChange={handleGenderChange}>
                <option value='man'>Man</option>
                <option value='woman'>Woman</option>
              </select>
              {errorMessage.gender && <small className='error__message'>{errorMessage.gender}</small>}
            </div>
            {/* user age */}
            <div className={errorMessage.age ? "error form__div" : "form__div"}>
              <label htmlFor='age' className='form__label'>Age<span>*</span></label>
              <input
                id='age'
                name='age'
                type='number'
                className="form__input"
                placeholder='Enter Your age'
                onChange={(e) => setAge(e.target.value)}
              />
              {errorMessage.age && <small className='error__message'>{errorMessage.age}</small>}
            </div>
          </div>

          {/* user email */}
          <div className={errorMessage.email ? "error form__div" : "form__div"}>
            <label htmlFor='email' className='form__label'>Email address<span>*</span></label>
            <input
              id='email'
              type='email'
              className="form__input"
              name='email'
              placeholder='Enter email address'
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage.email && <small className='error__message'>{errorMessage.email}</small>}
          </div>

          {/* user phone number */}
          <div className={errorMessage.phone ? "error form__div" : "form__div"}>
            <label htmlFor='phone_number' className='form__label'>Phone number<span>*</span></label>
            <input
              id='phone_number'
              type='text'
              className="form__input"
              name='phone_number'
              placeholder='Enter phone number'
              onChange={(e) => setPhone(e.target.value)}
            />
            {errorMessage.phone && <small className='error__message'>{errorMessage.phone}</small>}
          </div>

          {/* user role */}
          <div className={errorMessage.role ? "error form__div" : "form__div"}>
            <label htmlFor='role' className='form__label'>Role<span>*</span></label>
            <select id='role' className="form__input" value={role} onChange={handleRoleChange}>
              <option value='engineer'>Software engineer</option>
              <option value='designer'>Designer</option>
              <option value='manager'>Project manager</option>
            </select>
            {errorMessage.role && <small className='error__message'>{errorMessage.role}</small>}
          </div>

          {/* user password */}
          <div className={errorMessage.password ? "error form__div" : "form__div"}>
            <label htmlFor='password' className='form__label'>Password (6 or more characters)<span>*</span></label>
            <input
              id='password'
              type='password'
              className="form__input"
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage.password && <small className='error__message'>{errorMessage.password}</small>}
          </div>

          {/* confirme user password */}
          <div className='form__div'>
            <label htmlFor='conf_password' className='form__label'>Confirme password<span>*</span></label>
            <input
              id='conf_password'
              type='password'
              className="form__input"
              name='conf_password'
              onChange={(e) => setConfPass(e.target.value)}
            />
            {/* {error && <small className='error__message'>Missing required field: username</small>} */}
          </div>

          {/* submit */}
          <div className='form__outro'>
            <button type='submit' className='btn btn__primary'>{loading ? <LoadingRoller /> : "Register Account"}</button>
            <p>Already have an account <Link to={'/login'}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register