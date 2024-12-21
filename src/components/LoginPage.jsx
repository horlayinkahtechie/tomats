import { useState } from "react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="container section-margin">
      <div className="col-md-12 text-center">
        <form action="" className="login-form">
          <div className="col-md-12">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-input form-control"
            />
          </div>
          <div className="col-md-12">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-input form-control"
            />
          </div>
          <button className="show-password" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
          <button type="submit" className="login-submit-btn">
            Log in
          </button>
          <p className="dont-have-account">
            Don't have an account? <a href="#">Sign up.</a>
          </p>
          <p className="forgot-password">
            <a href="#">Forgot password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
