import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "10px" }}>About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;

