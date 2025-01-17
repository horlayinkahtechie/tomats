import { Link } from "react-router-dom";
const VerifyMail = () => {
  return (
    <div>
      <p className="text-center text-dark mt-5" style={{ fontSize: "20px" }}>
        Email verification sent, verify your mail and{" "}
        <Link to="/Auth/Login">Login in</Link>
      </p>
    </div>
  );
};

export default VerifyMail;
