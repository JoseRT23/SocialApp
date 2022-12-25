import React, { useContext, useRef } from 'react'
import { login } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core'
import { useHistory } from "react-router-dom";
import './Login.css'


const Login = () => {
    const history = useHistory();
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({email:email.current.value, 
               password:password.current.value}, 
               dispatch);
    };

  return (
      <>
        <div className="login">
            <div className="loginWrapper">
                <div className="loginRight">
                    <h3 className="loginLogo">
                        Social App
                    </h3>
                    <span className="loginDescription">
                        Conecta con amigos alrededor del mundo
                        con tu Social App 
                    </span>
                </div>
                <div className="loginLeft">
                    <form className="loginBox" onSubmit={handleLogin}>
                        <input placeholder='Email' 
                               type="email" 
                               className="loginInput"
                               required
                               autoComplete='off'
                               ref={email} />
                        <input placeholder='Contraseña' 
                               type="password" 
                               className="loginInput"
                               required
                               autoComplete='off'
                               minLength="6"
                               ref={password}/>
                        <button className="loginButton" type='submit' disabled={isFetching}>
                            {isFetching ? <CircularProgress color='inherit' size="35px"/> : "Inicia sesión"}
                        </button>
                        <span>Olvidaste la Contraseña?</span>
                        <button className="loginRegisterButton"
                                onClick={() => history.push('/register')}>
                            Crear una nueva cuenta
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </>
  )
}

export default Login