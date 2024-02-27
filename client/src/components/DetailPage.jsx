import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { id } = useParams();
  const [pais, setPais] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/countries/${id}`)
      .then((response) => setPais(response.data))
      .catch((error) => {
        console.error('Error al cargar la información del país', error);
        setError('Error al cargar la información del país. Por favor, inténtelo de nuevo.');
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!pais) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{pais.nombre}</h1>
      <p>ID: {pais.id}</p>
      <img src={pais.flags.png} alt={`${pais.nombre} Bandera`} />
      <p>Continente: {pais.continente}</p>
      <p>Capital: {pais.capital}</p>
      {pais.subregion && <p>Subregión: {pais.subregion}</p>}
      {pais.area && <p>Área: {pais.area} km²</p>}
      <p>Población: {pais.poblacion}</p>
    </div>
  );
};

export default DetailPage;

