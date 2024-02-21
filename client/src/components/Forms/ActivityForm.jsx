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
    };
    return (
        <div>
            <h1>Formulario de Actividad Turística</h1>
            <form onSubmit={handleSubmit}>
             <label htmlFor='nombre'>Nombre:</label>
             <input type='text' id='nombre' value={nombre} onChange={handleNombreChange} required />

             <label htmlFor='dificultad'>Dificultad:</label>
             <select id='dificultad' value={dificultad} onChange={handleDificultadChange} required>
             <option value=''>Seleccione</option>
             <option value='facil'>Fácil</option>
             <option value='intermedio'>Intermedio</option>
             <option value='dificil'>Dificil</option>
        </select>
        
        <label htmlFor='duracion'>Duración (en horas):</label>
        <input type='number' id='duracion' value={duracion} onChange={handleDuracionChange} required/>
        
        <label htmlFor='temporada'>Temporada:</label>
        <input type='text' id='temporada' value={temporada} onChange={handleTemporadaChange} required/>

        <label htmlFor='paises'>Paises:</label>
        <select id='paises' multiple value={paises} onChange={handlePaisesChange} required>
            <option value='pais1'>País 1</option>
            <option value='pais2'>País 2</option>
        </select>

        <button type='submit'>Crear Actividad Turística</button>
        </form>
        </div>
    );
};
};
export default ActivityForm
