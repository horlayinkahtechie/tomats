export default function Spinner() {
  return (
    <div
      className="spinner-grow"
      style={{ width: "4.3rem", height: "4.3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
