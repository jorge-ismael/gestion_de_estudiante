import { actualizarEstudiante, crearNuevoEstudiante, eliminarEstudiante, getEstudiantes, getEstudiantesCompleto } from "../servicio/indexAdmin.js";

let estudiantes = [];

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  //si no existe la sesion redirigir al login
  if (!localStorage.getItem("usuario")) {
    window.location.href = "../";
  }

    document.getElementById("btnAbrirModal").addEventListener("click", abrirModal);
    document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);

    window.onclick = function(event) {
        const modal = document.getElementById("modalRegistro");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "../";
  });

  estudiantes = await getEstudiantesCompleto().catch(err => {
    console.error("Error al cargar estudiantes desde el backend:", err);
    return [];
  });

  renderEstudiantes(estudiantes);

  document.getElementById("formEstudiante").addEventListener("submit", (e) => guardarEstudiante(e));
  
  let btnEditar = document.querySelectorAll(".btnEditar");

  btnEditar.forEach(element => {
    element.addEventListener("click", function (e) {
      if (e.target && e.target.closest("button")) {
        const id = e.target.closest("button").getAttribute("value");
        editarTarea(id);
      }
    });
  });

  let btnEliminar = document.querySelectorAll(".btnEliminar");
  btnEliminar.forEach(element => {
    element.addEventListener("click", function (e) {
      if(confirm("¿Está seguro de que desea eliminar este estudiante?")){
        if (e.target && e.target.closest("button")) {
          const id = e.target.closest("button").getAttribute("value");
          const idU = estudiantes.estudiantes.find(e => parseInt(e.idEstudiante) === parseInt(id)).idUsuario;
          eliminar(parseInt(id),parseInt(idU));
        }
      }
    });
  });

});

function abrirModal() {
    document.getElementById("modalRegistro").style.display = "block";
}

    function cerrarModal() {
    document.getElementById("modalRegistro").style.display = "none";
}

async function cargarEstudiantes() {
  estudiantes = await getEstudiantes().catch(err => {
    console.error("Error al cargar estudiantes desde el backend:", err);
    return [];
  });
  renderEstudiantes(estudiantes);
}

// Renderizar tabla
function renderEstudiantes(lista = estudiantes) {
  const tbody = document.getElementById("tablaEstudiantes");
  tbody.innerHTML = "";
  //si no hay tareas, decir que no hay tareas
  if (lista.estudiantes.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML = `<td colspan="7" class="text-center">No hay estudiantes en la base de datos</td>`;
    tbody.appendChild(filaVacia);
    return;
  }else{

    lista.estudiantes.forEach((e, i) => {
  
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${e.idEstudiante}</td>
        <td>${e.nombre}</td>
        <td>${e.apellidos}</td>
        <td>${e.carrera}</td>
        <td>${e.email}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2 btnEditar" value=${e.idEstudiante}>
            <i class='bx bx-edit'></i>
          </button>
          <button class="btn btn-sm btn-danger btnEliminar" value=${e.idEstudiante}>
            <i class='bx bx-trash'></i>
          </button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }
}

// Nueva tarea
function nuevaTarea() {
  document.getElementById("modalTitulo").textContent = "Nueva Tarea";
  document.getElementById("formTarea").reset();
  document.getElementById("tareaId").value = "";
  new bootstrap.Modal(document.getElementById("modalTarea")).show();
}

// Guardar tarea
async function guardarEstudiante(e) {
  e.preventDefault();

  const idEstudiante = document.getElementById("idEstudiante").value;
  const idUsuario = document.getElementById("idUsuario").value;
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const carrera = document.getElementById("carrera").value;
  const email = document.getElementById("email").value;
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("password").value;

  if (idEstudiante) {
    const estudiante = {};
    estudiante.idEstudiante = idEstudiante;
    estudiante.idUsuario = idUsuario;
    estudiante.nombre = nombre;
    estudiante.apellidos = apellidos;
    estudiante.carrera = carrera;
    estudiante.email = email;
    estudiante.usuario = usuario;
    estudiante.contrasena = contrasena;
    actualizarEstudiante(estudiante);
  } else {
    const nuevo = {
      nombre,
      apellidos,
      carrera,
      email,
      usuario,
      contrasena
    };
    crearNuevoEstudiante(nuevo);
  }
  setTimeout(() => {
    window.location.reload();
  }, 100);
  
}

// Editar tarea
async function editarTarea(id) {
  
  estudiantes = await getEstudiantesCompleto().catch(err => {
    console.error("Error al cargar estudiantes desde el backend:", err);
    return [];
  });

  const estudiante = estudiantes.estudiantes.find(e => parseInt(e.idEstudiante) == parseInt(id));
  
  document.getElementById("modalTitulo").textContent = "Editar Estudiante";
  document.getElementById("nombre").value = estudiante.nombre;
  document.getElementById("apellidos").value = estudiante.apellidos;
  document.getElementById("carrera").value = estudiante.carrera;
  document.getElementById("email").value = estudiante.email;
  document.getElementById("usuario").value = estudiante.usuario;
  document.getElementById("idEstudiante").value = estudiante.idEstudiante;
  document.getElementById("idUsuario").value = estudiante.idUsuario;
  document.getElementById("modalRegistro").style.display = "block";
  
}

// Eliminar tarea
async function eliminar(id,idU) {
  eliminarEstudiante(id,idU);
  setTimeout(() => {
    //window.location.reload();
  }, 100);
}