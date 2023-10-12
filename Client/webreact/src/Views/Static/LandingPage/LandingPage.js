import React from "react";
import styles from "./LandingStyle.module.css";
import { Link } from "react-router-dom";
import imglink from '../../../SaveRight.png'
function LandingPage() {
  return (
    <div className={styles.container}>
      {/*Title*/}
      <div>
        <img src={imglink} width={250} height={250} style={{margin:"-20px"}} />
      </div>
      {/*Buttons*/}
      <div className={styles.buttonsArea}>
        {/*Sign into an Existing Account*/}
        <div
          className={
            styles.ButtonRoundedStyle + "\n" + styles.ButtonHoverEffect
          }
          style={{ backgroundColor: "white", border: "0.5px solid #4D96D9" }}
        >
          <Link  style={{ textDecoration: "None", color: "black" }} to={"/Login"}>Sign in to an Existing Account</Link>
        </div>
        {/*Create an Account*/}
        <div>
          {/*Sign into an Existing Account*/}
          <div
            className={
              styles.ButtonRoundedStyle + "\n" + styles.ButtonHoverEffect
            }
            style={{textDecorationColor:"black", color:"black"}}
          >
            <Link  style={{ textDecoration: "None", color: "black" }} to={"/Register"}>Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
