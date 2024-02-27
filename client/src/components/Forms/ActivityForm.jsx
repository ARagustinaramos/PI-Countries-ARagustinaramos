import React, { useState, useEffect } from 'react';

const ActivityForm = () => {
  const [nombre, setNombre] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [duracion, setDuracion] = useState('');
  const [temporada, setTemporada] = useState('');
  const [paises, setPaises] = useState([]);
  const [paisesDisponibles, setPaisesDisponibles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // ... Código para obtener países disponibles ...
  }, []);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    validateForm(); // Llama a la función de validación cada vez que cambia el nombre
  };

  const handleDificultadChange = (event) => {
    setDificultad(event.target.value);
    validateForm(); // Llama a la función de validación cada vez que cambia la dificultad
  };

  const handleDuracionChange = (event) => {
    setDuracion(event.target.value);
    validateForm(); // Llama a la función de validación cada vez que cambia la duración
  };

  const handleTemporadaChange = (event) => {
    setTemporada(event.target.value);
    validateForm(); // Llama a la función de validación cada vez que cambia la temporada
  };

  const handlePaisesChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);
    setPaises(selectedOptions);
    validateForm(); // Llama a la función de validación cada vez que cambian los países seleccionados
  };

  const validateForm = () => {
    // Ejemplo de validaciones básicas, puedes agregar más según tus requisitos
    if (nombre.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
    } else if (duracion <= 0) {
      setError('La duración debe ser mayor que 0.');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:5000/countries', {
        method: 'POST',
        headers: {
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

      if (respuesta.ok) {
        alert('Actividad turística creada con éxito!');
        // Puedes realizar más acciones aquí después de un envío exitoso si es necesario
      } else {
        const mensajeError = await respuesta.text();
        console.error('Error al crear la actividad turística. Respuesta del servidor:', mensajeError);
        alert('Error al crear la actividad turística. Por favor, inténtelo de nuevo.');
        setError(mensajeError);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al crear la actividad turística. Por favor, inténtelo de nuevo.');
      setError(error.message);
    }

    // Reinicia el formulario y errores
    setNombre('');
    setDificultad('');
    setDuracion('');
    setTemporada('');
    setPaises([]);
  };

  return (
    <div>
      <h2>Formulario de Creación de Actividad Turística</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
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
          <input type="number" value={duracion} onChange={handleDuracionChange} />
        </div>
        <div>
          <label>Temporada:</label>
          <input type="text" value={temporada} onChange={handleTemporadaChange} />
        </div>
        <div>
          <label>Seleccionar Países:</label>
          <select multiple onChange={handlePaisesChange}>
            {paisesDisponibles.map((pais) => (
              <option key={pais.id} value={pais.id}>{pais.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          {/* Muestra mensajes de error */}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <button type="submit">Crear Actividad Turística</button>
      </form>
    </div>
  );
};

export default ActivityForm;