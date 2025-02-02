import { useState } from "react";
import supabase from "../../supabaseClient";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/reset-password",
      });

      if (error) throw error;

      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 p-5">
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "50vh",
          borderRadius: "12px",
        }}
      >
        <h2
          className="text-center mb-3"
          style={{ fontWeight: "600", color: "#333", paddingTop: "30px" }}
        >
          Reset Password
        </h2>
        <p className="text-center text-muted">
          Enter your email to receive a password reset link.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword();
          }}
        >
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope">@</i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                Sending...
              </>
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>

        {message && <p className="text-success text-center mt-3">{message}</p>}
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
