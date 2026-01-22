export function getDatosEstudiante() {
  // Ajusta la ruta si es necesario (desde frontend/servicios hacia backend/controlador/estudiantes.php)
  const url = '../../../backend/controlador/estudiantes.php?getDatosEstudiante=true&idUsuario=' + localStorage.getItem("idUsuario");
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp.estudiantes);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    // Enviar action para que el backend identifique la operación
    xhr.send();
  });
}