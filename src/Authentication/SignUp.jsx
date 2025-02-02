import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Footer from "../components/footer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    setSignUpErrorMessage("");

    if (!email.includes("@")) {
      setSignUpErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setSignUpErrorMessage("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });

      if (error) throw new Error(error.message);

      navigate("/Auth/VerifyMail");
    } catch (error) {
      setSignUpErrorMessage(
        error.message || "An error occurred during sign-up."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-lg p-4"
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "60vh",
            borderRadius: "12px",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{ fontWeight: "600", color: "#333", paddingTop: "30px" }}
          >
            Sign Up
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  className="form-control"
                  placeholder="Enter username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  className="form-control"
                  placeholder="Enter email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {signUpErrorMessage && (
            <p className="text-danger text-center mt-3">{signUpErrorMessage}</p>
          )}

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/Auth/Login"
              className="text-decoration-none"
              style={{ color: "#007bff" }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
