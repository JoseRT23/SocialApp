import React, { useRef } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import './Register.css'

const Register = () => {
    const history = useHistory()
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repeatPassword = useRef();

    const handleRegister = async (e) => {
         e.preventDefault();
             const user = {
                 username: username.current.value,
                 email: email.current.value,
                 password: password.current.value
             }
             try {
                await axios.post("/auth/register", user);
                history.push("/login")                 
             } catch (error) {
                 console.log(error)
             }
    }

  return (
      <>
        <div className="register">
            <div className="registerWrapper">
                <div className="registerRight">
                    <h3 className="registerLogo">
                        Social App
                    </h3>
                    <span className="registerDescription">
                        Conecta con amigos alrededor del mundo
                        con tu Social App 
                    </span>
                </div>
                <div className="registerLeft" onSubmit={handleRegister}>
                    <form className="registerBox">
                        <input placeholder='Usuario'
                               ref={username} 
                               type="text"
                               required 
                               autoComplete='off'
                               className="registerInput" />

                        <input placeholder='Email'
                               ref={email}  
                               type="email" 
                               required
                               autoComplete='off'
                               className="registerInput" />

                        <input placeholder='Contraseña' 
                               ref={password} 
                               type="password" 
                               required
                               autoComplete='off'
                               minLength='6'
                               className="registerInput" />

                        <input placeholder='Repetir contraseña' 
                               ref={repeatPassword} 
                               required
                               type="password"
                               autoComplete='off' 
                               className="registerInput" />

                        <button className="registerButton" type='submit'>
                            Crear cuenta
                        </button>
                        <button className="registerRegisterButton"
                                onClick={() => history.push('/')}>
                            Inicia sesión en tú cuenta
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </>
  )
}

export default Register