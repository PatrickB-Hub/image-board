import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "25px" }}>
    <h2>404</h2>
    <h3>Page not found</h3>
    <Link to="/image-board/">Dashboard</Link>
  </div>
);

export default NotFound;
