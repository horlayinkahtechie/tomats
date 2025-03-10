export default function Spinner() {
  return (
    <div
      className="spinner-grow justify-content-center text-center"
      style={{ width: "4.15rem", height: "4.15rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
