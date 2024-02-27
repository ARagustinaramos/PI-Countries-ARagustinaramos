import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ paisesPaginados }) => {
  return (
    <div className='card-list'>
      {paisesPaginados && paisesPaginados.map((pais) => (
        <Link to={`/pais/${pais.cca3}`} key={pais.cca3}>
          <div className='card'>
            {/* Asegúrate de que flags y translations estén definidos antes de acceder a sus propiedades */}
            <img src={pais.flags && pais.flags.png} alt={`${pais.translations?.eng?.common} Bandera`} />
            <h2>{pais.translations?.eng?.common}</h2>
            <p>Continente: {pais.region}</p>
            <p>Poblacion: {pais.population}</p>
          </div>
        </Link>
      ))}
    </div>
  );
      }
export default CardList;


