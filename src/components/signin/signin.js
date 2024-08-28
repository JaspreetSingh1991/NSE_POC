import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';
import { Button } from '@mui/material';
import { login } from '../../services/login';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    login()
      .then(() => {
        navigate('/home');
      })
      .catch(() => {
        alert('Some error occurred!!');
      });
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <Button sx={{color:'whitw',borderColor:'white'}} variant="outlined" onClick={onButtonClick}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;
