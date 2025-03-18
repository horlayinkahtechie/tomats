import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setIsLoading(true);
    setSignInErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (!email.includes("@")) {
        setSignInErrorMessage("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        throw new Error("Unable to retrieve user information.");
      }

      // Fetch the user's role from Supabase
      const { data: userData, error: roleError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (roleError) {
        throw new Error("Error fetching user role.");
      }

      if (userData.role === "admin") {
        setSignInErrorMessage("Cannot log in through user login.");
        await supabase.auth.signOut(); // Log out the admin
        navigate("/");
        setIsLoading(false);
        return;
      }

      // Allow regular users to navigate
      navigate("/");
    } catch (error) {
      setSignInErrorMessage(
        error.message || "Something went wrong. Please try again."
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
            Sign In
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope">@</i>
                </span>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
              </div>
            </div>

            <p className="text-end">
              <Link
                to="/Auth/ResetPassword"
                className="text-decoration-none"
                style={{ color: "#007bff" }}
              >
                Forgot password?
              </Link>
            </p>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {signInErrorMessage && (
            <p className="text-danger text-center mt-3">{signInErrorMessage}</p>
          )}

          <p className="text-center mt-3">
            Don&apos;t have an account?{" "}
            <Link
              to="/Auth/Signup"
              className="text-decoration-none"
              style={{ color: "#007bff" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
