import React, {useState, useEffect} from 'react';
import{useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ingresarHomePage } from '../actions';
import SearchBar from './searchBar';

const HomePage = () => {
    const dispatch = useDispatch();
    const enHomePage = useSelector ((state) => state.enHomePage );

    useEffect (() => {
        dispatch(ingresarHomePage());
    }, [dispatch]);

const [filtroContiene, setFiltroContinente] = useState('');
const [filtroActividad, setFiltroActividad] = useState('');
const [orden, setOrden] = useState('asc');
const [paginaActual, setPaginaActual] = useState(1);
const paisesPorPagina = 10;
const endpoint = 'http://localhost:5000/countries';
const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

const [paises, setPaises] = useState([]);

useEffect(() => {
    axios.get(endpoint)
    .then(response => setPaises(reponse.data))
    .catch(error => console.error ('Error al buscar paises:', error)); 
},[endpoint]);

const handleSearch = (terminoBusqueda) => {
    const resultados = paises.filter((pais) =>
      pais.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setResultadosBusqueda(resultados);
  }; 

const filtrarPorContinente = (pais) => filtroContinente === '' || pais.contiente ===  filtroContiente;

const filtrarPorActividad = (pais)=> {
    if(filtroActividad === ''){           // si no hay filtro de activiad, mostrarlos todos
        return true;
    }
    if(!pais.actividades || pais.actividades.length === 0) {    // si no tiene informacion de actividades no mostrarlo
        return false;
    }
    return pais.actividades.some(actividad =>  actividad.tipo === filtroActividad ) // verifico si al menos una actividad coincide con el filtro
}
const ordenarPaises = (a, b )=> {
    let comparador;
if(orden === 'asc'){
    comparador = 1;
}else{
    comparador=-1;
}
return a.nombre.localeCompare(b.nombre)*coparador;
};

const indexOfLastPais = paginaActual * paisesPorPagina;
const indexOfFirstPais = indexOfLastPais - paisesPorPagina;
const paisesPaginados = paises
.filter(filtrarPorContienente)
.filter(filtrarPorActividad)
.sort(ordenarPaises)
.slice(indexOfFirstPais, indexOfLastPais);

return (
    <div className='home-page'>
        <h1>Bienvenidos</h1>
        <SearchBar/>
    <div className='filters'>
        <select onChange={(e) => setFiltroContinente(e.target.value)}>
            <option value="">Todos los Continentes</option>
            <option value="Asia">Asia</option>
            <option value="Europa">Europa</option>
            <option value="America">America</option>
            <option value="Africa">Africa</option>
        </select>

        <button onClick={() => setOrden('asc')}>Ordenar Ascendente</button>
        <button onClick={() => setOrden('desc')}>Ordenar descendente</button>
    </div>

    <div className='card-list'>
        {paisesPaginados.map((pais) => (
            <Link to={`/pais/${pais.id}`} key={pais.id}>
            <div className='card'>
             <img src={`path/to/flags/${pais.bandera}`} alt={`${pais.nombre} Bandera`} />
             <h2>{pais.nombre}</h2>
             <p>Continente: {pais.continente}</p>
             <p>Poblacion: {pais.poblacion}</p>
            </div>
            </Link>
        ))}
    </div>
    <div className='pagination'>
    {Array.from({ length: Math.ceil(paises.length / paisesPorPagina) }).map((_, index) => (
          <button key={index} onClick={() => setPaginaActual(index + 1)}>
            {index + 1}
          </button>
        ))}

    </div>
    </div>
)
}

export default HomePage;