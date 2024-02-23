import React , {useState} from 'react';

const ActivityForm =() => {
    const [nombre, setNombre] = useState('');
    const [dificultad, setDificultad] = useState ('');
    const[duracion, setDuracion ] = useState ('');
    const[temporada, setTemporada] = useState('');
    const[paises, setPaises] = useState ([]);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleDificultadChange = (event) => {
        setDificultad(event.target.value);
    };

    const handleDuracionChange = (event) => {
        setDuracion(event.target.value);
    };

    const handleTemporadaChange = (event) => {
        setTemporada(event.target.value);
    };

    const handlePaisesChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setPaises(selectedOptions);
    };

    const validarFormulario = () => {
        if(!nombre || !dificultad || !duracion || !temporada || paises.length === 0){
            alert('Por favor, complete todos los campos.');
            return false
        }
        if(isNaN(parseFloat(duracion))){
            alert('La duracion de ser un número.');
            return false;
        }
        alert ('Actividad turística creada con éxito!') //si todas las validaciones pasan, se crea la actividad
    };
    const handleSubmit = async (event) => {
        event.preventDefault();    //evita que el formulario se envie por defecto
        if(validarFormulario()){
            try {
                const respuesta = await fetch('http://localhost:5000/countries',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        dificultad,
                        duracion,
                        temporada,
                        paises,
                    }),
                });
                if(respuesta.ok){
                    alert('Actividad turística creada con éxito!') // la solicitud fue exitosa
                }else{
                    alert ('Error al crear la actividad turística.Por favor intentelo de nuevo.'); // la solicitud no fue exitosa
                    
                }
            }catch (error) {
            console.error('Error al enviar solicitud:', error);
            alert('Error al crear la actividad turística. Por favor intentelo de nuevo.');
        }
      //reinicia el formulario y errores  
    setNombre('');
    setDificultad('');
    setDuracion('');
    setTemporada('');
    setPaisesSeleccionados([]);
    setError('');
    };
    return (
        <div>
            <h2>Formulario de Creación de Actividad Turística</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={handleNombreChange} />
        </div>
        <div>
          <label>Dificultad:</label>
          <input type="text" value={dificultad} onChange={handleDificultadChange} />
        </div>
        <div>
          <label>Duración:</label>
          <input type="text" value={duracion} onChange={handleDuracionChange} />
        </div>
        <div>
          <label>Temporada:</label>
          <input type="text" value={temporada} onChange={handleTemporadaChange} />
        </div>
        <div>
          <label>Seleccionar Países:</label>
          <select onChange={handlePaisChange}>
            <option value="pais1">País 1</option>
            <option value="pais2">País 2</option>
          </select>
        </div>
        <div>
          <ul>
            {paisesSeleccionados.map((pais) => (
              <li key={pais}>{pais}</li>
            ))}
          </ul>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Crear Actividad Turística</button>
      </form>
    </div>
    );
};
};
export default ActivityForm
