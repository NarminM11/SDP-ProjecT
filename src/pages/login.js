import React from "react";
import "../assets/login.css";

export const LogIn = () => {
  return (
    <div className="container">
      <div className="frame">
        <div className="form-container">
          <h2>Login</h2>

          <div className="form">
            <form>
              <label>Email address</label>
              <input type="text" id="inputEmail" placeholder="Email address" className="text-input" />
            </form>
            <form>
              <label>Password</label>
              <input type="password" id="inputPassword" placeholder="*****" className="text-input" />
            </form>
          </div>

          <div className="checkbox-row">
            <div className="check-remember">
              <input type="checkbox" id="rememberCheckbox" />
              <label htmlFor="rememberCheckbox">Remember me</label>
            </div>
            <p>Forgot Password</p>
          </div>
          <p>OR</p>

          <div className="signIn-button">
            <button style={{ backgroundColor: "#f0f0f0" }}> Sign in with Google</button>
            <button>Sign in with Facebook</button>
          </div>
        </div>

        <div className="login-button">
          <button style={{ backgroundColor: "#2B2676" }}>Log in</button>
        </div>

        <p>New User? Create an account</p>
      </div>
    </div>
  );
};

export default LogIn;
