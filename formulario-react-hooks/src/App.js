import React, { useState } from 'react';

function App() {
  const [urls, setUrls] = useState([{ url: '', descripcion: '' }]);
  const [urlValida, setUrlValida] = useState(true); // Variable para rastrear la validez de la URL

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(urls[urls.length - 1].url)) {
      setUrlValida(false); // La URL no es válida
      return;
    }

    setUrls([...urls, { url: '', descripcion: '' }]);
    setUrlValida(true); // Reiniciar el estado de validación
  };

  const isValidUrl = (url) => {
    // Expresión regular que permite URLs con "https://"
    return /^https:\/\//.test(url);
  };

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index].url = value;
    setUrls(updatedUrls);
  };

  const handleDescripcionChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index].descripcion = value;
    setUrls(updatedUrls);
  };

  const handleBorrar = (index) => {
    const updatedUrls = [...urls];
    updatedUrls.splice(index, 1);
    setUrls(updatedUrls);
  };

  return (
    <div className="App">
      <h1>Formulario con React Hooks</h1>
      <form onSubmit={handleSubmit}>
        {urls.map((item, index) => (
          <div key={index}>
            <label htmlFor={`url-${index}`}>URL:</label>
            <input
              type="text"
              id={`url-${index}`}
              value={item.url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              required
            />
            {/* Mostrar mensaje de error si la URL no es válida */}
            {!urlValida && index === urls.length - 1 && (
              <p style={{ color: 'red' }}>La URL no es válida</p>
            )}
            <label htmlFor={`descripcion-${index}`}>Descripción:</label>
            <textarea
              id={`descripcion-${index}`}
              value={item.descripcion}
              onChange={(e) => handleDescripcionChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => handleBorrar(index)}>
              Borrar
            </button>
          </div>
        ))}
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default App;

