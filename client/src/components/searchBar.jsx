import React, { useState } from "react";

const SearchBar = () => {
    const [busqueda, setBusqueda ] = useState('');

    const handleSearch = () =>{
        onSearch(busqueda);
    };

    return (
        <div className="serch-bar">
            <input
            type="text"
            placeholder="buscar paises..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default SearchBar;