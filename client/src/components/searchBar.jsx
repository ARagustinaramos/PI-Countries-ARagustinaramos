import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [busqueda, setBusqueda] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(busqueda);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar países..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
