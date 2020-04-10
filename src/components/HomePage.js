import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Administartion</h1>
      <p>React,flux,and React router for ultra-responsive website.</p>
      <Link to="about" className="btn btn-warning">
        About As
      </Link>
    </div>
  );
}
export default HomePage;
