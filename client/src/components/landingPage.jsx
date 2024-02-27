import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Bienvenido</h1>
      <Link to="/home" className="enter-button">
        Ingresar a la Home Page
      </Link>
    </div>
  );
};

export default LandingPage;
