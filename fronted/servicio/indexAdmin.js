export function getEstudiantes() {
  // Ajusta la ruta si es necesario (desde frontend/servicios hacia backend/controlador/estudiantes.php)
  const url = '../../../backend/controlador/estudiantes.php';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
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

export function getEstudiantesCompleto() {
  // Ajusta la ruta si es necesario (desde frontend/servicios hacia backend/controlador/estudiantes.php)
  const url = '../../../backend/controlador/estudiantes.php?getCompleto=true';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
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

export function crearNuevoEstudiante(estudiante) {
  const url = '../../../backend/controlador/estudiantes.php';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    xhr.send(JSON.stringify({ accion: "crearEstudiante", ...estudiante }));
  });
}

export function actualizarEstudiante(estudiante) {
  const url = '../../../backend/controlador/estudiantes.php';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    xhr.send(JSON.stringify({ accion: "actualizarEstudiante", ...estudiante }));
  });
}


export function eliminarEstudiante(id, idU) {
  const url = '../../../backend/controlador/estudiantes.php';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    xhr.send(JSON.stringify({ accion: "eliminarEstudiante", data: { idEstudiante: id, idUsuario: idU } }));
  });
}