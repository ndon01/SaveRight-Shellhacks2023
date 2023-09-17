import React from "react";
import styles from "./LandingStyle.module.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className={styles.container}>
      {/*Title*/}
      <div>Save Right</div>
      {/*Buttons*/}
      <div>
        {/*Sign into an Existing Account*/}
        <div
          className={
            styles.ButtonRoundedStyle + "\n" + styles.ButtonHoverEffect
          }
          style={{ backgroundColor: "white", border: "0.5px solid #4D96D9" }}
        >
          <Link to={"/Login"}>Sign in to an Existing Account</Link>
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
            <Link to={"/Register"}>Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
