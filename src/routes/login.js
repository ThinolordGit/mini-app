// src/Login.js
import React, { useState } from 'react';
import { TextField,Button,CheckBox } from '../widgets/widgets.js';
import '../@assets/tlBootstrap/JS/tl-js.js'
import "./login.css";
import { isValidMail, Qs } from '../@assets/tlBootstrap/JS/tl-js.js';
import ICON from '../utils/utils.js';


function Login() {
  const [accepted, setAccepted] = useState(false);
  const [authMode, setAuthMode] = useState(true);
  
  
  const [validUsername, setvalidUsername] = useState(true);
  const [validPass, setvalidPass] = useState(true);
  const [validMail, setvalidMail] = useState(true);
  
  const [validUsername_, setvalidUsername_] = useState(false);
  const [validPass_, setvalidPass_] = useState(false);
  const [validMail_, setvalidMail_] = useState(false);
  
  function isValidName(e) {
    if ( e.value.length > 3 ) {
      setvalidUsername(true)
      setvalidUsername_(true)
    }
    else {
      setvalidUsername(false)
      setvalidUsername_(false)
    }
  }
  function isValidEmail (e) {
    if ( isValidMail(e.value) ) {
      setvalidMail(true)
      setvalidMail_(true)
    }
    else {
      setvalidMail(false)
      setvalidMail_(false)
    }
  }
  function isValidPass (e) {
    if (  e.value.length > 8 && /\d/.test(e.value) ) {
      setvalidPass(true)
      setvalidPass_(true)
    }
    else {
      setvalidPass(false)
      setvalidPass_(false)
    }

  }

  function whenBlured (e) {
    if (validUsername) {
      setvalidUsername_(true)
    }
    else {
      setvalidUsername_(false)
    }
    if (validPass) {
      setvalidPass_(true)
    }
    else {
      setvalidPass_(false)
    }
    if (validMail) {
      setvalidMail_(true)
    }
    else {
      setvalidMail_(false)
    }
  }
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Logique pour envoyer le nom d'utilisateur et le mot de passe au serveur
  //   console.log('Login Submitted', { username, password });
  // };
  function switchAuthMode(e) {
    let buttons = Qs(".page-head-button")
    buttons.forEach((button) => {
      button.removeAttribute('active')
    })
    e.setAttribute('active',true)
    if ( e.getData('type') === "reg" ) {
      setAuthMode(false)
    }
    else {
      setAuthMode(true)
    }
  }
  return (
    <div className="page-container">
      <div className="page-head center">
        
        <div className="page-head-col center">
          <i className="bx bx-shield-quarter color-white" style={{fontSize:50}}></i>
          <h3 className='title'>Authentifiez-vous</h3>
        </div>
        
        <div className="page-head-span">
          <button onClick={(e)=>{switchAuthMode(e.target)}} className="page-head-button" data-type="log" active="true">Connexion</button>
          <button onClick={(e)=>{switchAuthMode(e.target)}} className="page-head-button" data-type="reg">Inscription</button>
        </div>
      </div>
      
      <div className='former center'>
        <form className='form-wrapper' data-to={authMode ? "log" : "reg"}>
          { !authMode ? <TextField onInput={isValidEmail} onFocus={isValidEmail} isvalid={validMail} onBlur={whenBlured} prefixIcon={ICON.envelope} name={"tl_mail"} type='email' label="adresse email"/>:<></>}
          <TextField onInput={isValidName} onFocus={isValidName} onBlur={whenBlured} isvalid={validUsername} prefixIcon={ICON.user} name={authMode ? "tl_log_username" : "tl_reg_username"} type='text' label={authMode ? "nom d'utilisateur ou adresse email" : "nom d 'utilisateur"}/>
          <TextField onInput={isValidPass} onFocus={isValidPass} onBlur={whenBlured} isvalid={validPass} prefixIcon={ICON.shield_alt_2} name={authMode ? "tl_log_userpass" : "tl_reg_userpass"} type='password' label='mot de passe' canShow={true}/>
          { !authMode ? <CheckBox onChange={(val)=>{setAccepted(val)}} label='Accepter les conditions de confidentialité '/>:<></>}
          { !authMode ? (accepted && validMail_ && validPass_ && validUsername_ ? <Button name="reg-user" style={{marginTop:20}} type='button'>s'inscrire</Button> : <></>):( validPass_ && validUsername_ ? <Button name="log-user" style={{marginTop:30}} type='button'>connexion</Button>:<></>)}
        </form>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
}

export default Login;
