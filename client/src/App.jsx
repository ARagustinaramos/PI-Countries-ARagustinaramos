import React from "react";
import {Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/landingPage.jsx";
import HomePage from "./components/homePage.jsx";
import DetailPage from "./components/DetailPage.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ActivityForm from "./components/Forms/ActivityForm.jsx";

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Inicio</Link>
        <Link to="/home">Home</Link>
        <Link to="/search">Buscar</Link>
        <Link to="/crear-actividad">Crear Actividad</Link>
      </nav>

<Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/pais/:id" element={<DetailPage/>} />
        <Route path="/search" element={<SearchBar/>} />
        <Route path="/crear-actividad" element={<ActivityForm/>} />
 </Routes>
    </div>
  );
};

export default App;
