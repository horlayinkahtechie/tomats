import { useState } from "react";
import supabase from "../supabaseClient";

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
    <div className="container" style={{ marginTop: "150px" }}>
      <h2>Forgot Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleForgotPassword();
        }}
        className="mt-4"
      >
        <input
          type="email"
          className="form-input form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="form-submit btn btn-primary"
        >
          {isLoading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
      {message && <p className="text-success mt-3">{message}</p>}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default ResetPassword;
