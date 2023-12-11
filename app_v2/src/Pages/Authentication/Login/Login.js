import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';
import LoadingRoller from '../../../Components/Loading/LoadingRoller';
import './Login.scss';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const request = { email: email, password: password };
    // setError(false);
    await axios
      .post("http://localhost:5000/api/v1/auth", request)
      .then((data) => {
        // console.log(data.data.data)
        localStorage.setItem("token", data.data.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(true);
        // console.log(error);
        setInterval(() => {
          setError(false);
        }, 7000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='login'>
      <Link to={'/'}>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
      </Link>

      <div className='login__form'>
        <form className='form' onSubmit={handleLogin}>
          <div className='form__intro'>
            <h1>Welcome Back!</h1>
            <p>
              For the purpose of industry regulation, your details are required.
            </p>

            {error && <small>invalid email or password</small>}
          </div>

          {/* user email */}
          <div className={error ? "error form__div" : "form__div"}>
            <label htmlFor='email' className='form__label'>Email address<span>*</span></label>
            <input
              id='email'
              type='email'
              className="form__input"
              name='email'
              placeholder='Enter email address'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* user password */}
          <div className={error ? "error form__div" : "form__div"}>
            <label htmlFor='password' className='form__label'>Password (6 or more characters)<span>*</span></label>
            <input
              id='password'
              type='password'
              className="form__input"
              name='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* submit */}
          <div className='form__outro'>
            <button type='submit' className='btn btn__primary'>{loading ? <LoadingRoller /> : "Login"}</button>
            <p>Don't have an account ? <Link to={'/register'}>Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login