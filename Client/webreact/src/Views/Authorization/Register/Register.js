import React, { useState } from 'react'
import styles from "./RegisterStyles.module.css"
import axios from 'axios';
import { Link } from "react-router-dom";
import GlobalConfig from '../../../Util/Config'

import imglink from '../../../SaveRight.png'

function Login() {
    const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmPassword] = useState("");

  function loginSubmission(e) {
    e.preventDefault();
    var Password = document.getElementById("PasswordValue")
    var ConfirmPassword = document.getElementById("ConfirmPasswordValue")


    let data = {
        "firstname": firstName,
        "username": username,
        "emailaddress": emailaddress,
        "password": password
    }

    axios.post(GlobalConfig.SaveRightAPIURL + '/register/', data)
    .then(()=> {
      document.location.href = "/login"
    }).catch(console.log)

    
    return false;
  }

  function confirmPassword() {
    var Password = document.getElementById("PasswordValue")
    var ConfirmPassword = document.getElementById("ConfirmPasswordValue")

    console.log(confirmationPassword)
    if(password !== confirmationPassword) {
        console.log("Passwords dont match")
        confirmPassword.style += ";border-color: red;"
        ConfirmPassword.setCustomValidity("Passworddds Don't Match")
    } else {
        console.log("Passwords Match")
        confirmPassword.style += ";border-color: black;"
        ConfirmPassword.setCustomValidity("")
    }
  }
  return (
    <div className={styles.PageContainer}>
        {/*Title*/}
        <div>
        <img src={imglink} width={250} height={250} style={{margin:"-20px"}} />
        </div>
        {/*Login Form*/}
        <form onSubmit={loginSubmission} id="LoginForm">

            <div className={styles.InputAreaContainer}>
                <div className={styles.InputFields}>
                <div className={styles.InputQuestion}>
                    <div className={styles.InputQuestionTitle}>
                    <p>First Name</p>
                    </div>
                    <div className={styles.InputQuestionValue}>
                    <input type="text" id="FullNameValue" className={styles.InputQuestionTypeText} placeholder="Enter your First Name" onChange={(e) => setFirstName(e.target.value)} required></input>
                    </div>
                </div>
                <div className={styles.InputQuestion}>
                    <div className={styles.InputQuestionTitle}>
                    <p>Username</p>
                    </div>
                    <div className={styles.InputQuestionValue}>
                    <input type="text" id="UsernameValue" className={styles.InputQuestionTypeText} placeholder="Pick a Username" onChange={(e) => setUsername(e.target.value)} required></input>
                    </div>
                </div>
                <div className={styles.InputQuestion}>
                    <div className={styles.InputQuestionTitle}>
                    <p>Email Address</p>
                    </div>
                    <div className={styles.InputQuestionValue}>
                    <input type="text" id="EmailAddressValue" className={styles.InputQuestionTypeText} placeholder="Enter your Email Address" onChange={(e) => setEmailAddress(e.target.value)} required></input>
                    </div>
                </div>
                <div className={styles.InputQuestion}>
                    <div className={styles.InputQuestionTitle}>
                    <p>Password</p>
                    </div>
                    <div className={styles.InputQuestionValue}>
                    <input type="password" id="PasswordValue" className={styles.InputQuestionTypeText} placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                </div>
                <div className={styles.InputQuestion}>
                    <div className={styles.InputQuestionTitle}>
                    <p>Confirm your Password</p>
                    </div>
                    <div className={styles.InputQuestionValue}>
                    <input type="password" id="ConfirmPasswordValue" onKeyUp={() => {confirmPassword()}} className={styles.InputQuestionTypeText} placeholder="Re-enter your Password" onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                    </div>
                </div>
                </div>
                <div className={styles.InputAreaSubmitContainer}>
                    <button type="submit" className={styles.ButtonRoundedStyle + '\n' + styles.ButtonHoverEffect}>Register your Account</button>
                </div>
            </div>
        </form>
        <div className={styles.InputAreaSubmitContainer}>
        <div className={styles.transportarea}>
        Already have an Account?
      <div
          className={
            styles.ButtonRoundedStyle + "\n" + styles.ButtonHoverEffect
          }
          style={{backgroundColor:"white", border: '0.5px solid #4D96D9' }}
        >
        <Link
            style={{ textDecoration: "None", color: "black" }}
            to={"/login/"}
          >
            Click Here
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login