import { getDatosEstudiante } from "../servicio/indexEstudiante.js";

let datosEstudiante = {};

document.addEventListener("DOMContentLoaded", async () => {
  //si no existe la sesion redirigir al login
  if (!localStorage.getItem("usuario")) {
    window.location.href = "../";
  }
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("idUsuario");
    window.location.href = "../";
  });

  datosEstudiante = await getDatosEstudiante().catch(err => {
      console.error("Error al cargar estudiante desde el backend:", err);
      return [];
    });

    renderDatosEstudiante(datosEstudiante);
});

function renderDatosEstudiante(e) {
    document.getElementById("nombreEst").textContent = e.nombre;
    document.getElementById("apellidosEst").textContent = e.apellidos;
    document.getElementById("emailEst").textContent = e.email;
    document.getElementById("carreraEst").textContent = e.carrera;
}