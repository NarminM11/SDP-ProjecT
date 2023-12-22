// signUp.jsx

import React from "react";
import "../assets/signUp.css";

const SignUp = () => {
  return (
    <div className="container">
      <div className="frame">
        <div className="form-container">
          <h2>Sign Up</h2>

          <div className="form">
            <form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" placeholder="John Doe" className="text-input" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="sample@jestdili.az" className="text-input" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" placeholder="********" className="text-input" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="text" id="confirmPassword" name="confirmPassword" placeholder="********" className="text-input" />
              </div>
            </form>
          </div>

          <div className="checkbox-row">
            
              <input type="checkbox" id="termsCheckbox" />
              <p>I agree to the Terms & Conditions!</p>
            
          </div>
        </div>

        <div className="login-button">
          <button style={{ backgroundColor: "#2B2676" }}>Sign up</button>
        </div>

        <p>Already a user? Log in</p>
      </div>
    </div>
  );
};

export default SignUp;
