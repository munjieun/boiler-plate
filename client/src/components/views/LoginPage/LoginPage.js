import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../../_actions/user_action';

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 새로고침 되는 것을 방지
    //console.log('Email', Email)
    //console.log('Password', Password)
    
    let body = {
      email: Email,
      password: Password
    }
     /*
    // v.5
    dispatch(loginUser(body))
    .then(response => {
      if (response.payload.loginSuccess) {
        props.history.push('/')
      } else {
        alert('Error')
      }
    })*/
   
    //v.6
    dispatch(loginUser(body))
    .then(response => {
      if (response.payload.loginSuccess) {
        navigation('/');
      } else {
        alert('Error');
      }
    })
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      <form style={{display: 'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage