export default function Spinner() {
  return (
    <div
      className="spinner-grow justify-content-center text-center"
      style={{ width: "4.3rem", height: "4.3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
