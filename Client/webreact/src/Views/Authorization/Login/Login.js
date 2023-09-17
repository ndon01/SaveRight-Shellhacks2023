import React, { useContext, useState } from "react";
import styles from "./LoginStyles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import GlobalConfig from "../../../Util/Config";

import { userContext } from '../../../Context/UserContext'


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const value = useContext(userContext)
  console.log(value)
  function loginSubmission(e) {
    e.preventDefault();
    var UsernameInput = username;
    var PasswordInput = password;

    let data = {
      username: UsernameInput,
      password: PasswordInput,
    };

    axios
      .post(GlobalConfig.SaveRightAPIURL + "/login/", data)
      .then((data) => {
        console.log(data.data.token);
        localStorage.setItem("token", data.data.token)
        value.setToken(data.data.token)
      })
      .catch(console.log);

    return false;
  }

  return (
    <div className={styles.PageContainer}>
      {/*Title*/}
      <div>
        <div className={styles.SaveRightLogoSave}>Save</div>
        <div className={styles.SaveRightLogoRight}>Right</div>
      </div>
      {/*Login Form*/}
      <form onSubmit={loginSubmission} id="LoginForm">
        <div className={styles.InputAreaContainer}>
          <div className={styles.InputFields}>
            <div className={styles.InputQuestion}>
              <div className={styles.InputQuestionTitle}>
                <p>Username</p>
              </div>
              <div className={styles.InputQuestionValue}>
                <input
                  type="text"
                  id="UsernameValue"
                  className={styles.InputQuestionTypeText}
                  placeholder="Enter your Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className={styles.InputQuestion}>
              <div className={styles.InputQuestionTitle}>
                <p>Password</p>
              </div>
              <div className={styles.InputQuestionValue}>
                <input
                  type="password"
                  id="PasswordValue"
                  className={styles.InputQuestionTypeText}
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.InputAreaSubmitContainer}>
            <button
              type="submit"
              className={
                styles.ButtonRoundedStyle + "\n" + styles.ButtonHoverEffect
              }
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div className={styles.InputAreaSubmitContainer}>
        <div>
            <Link To={'/register/'}>
            Create an Account Here
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
