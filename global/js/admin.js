// Función para cargar la tabla de estudiantes
function cargarTabla() {
    const estudiantesSistema = JSON.parse(localStorage.getItem("estudiantesSistema")) || [];
    const tbody = document.querySelector("#tablaEstudiantes tbody");
    tbody.innerHTML = "";

    estudiantesSistema.forEach(est => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${est.usuario}</td><td>${est.nombre}</td><td>${est.correo}</td>`;
        tbody.appendChild(tr);
    });
}

// para crear al estudiante
const form = document.getElementById("crearEstudianteForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let estudiantesSistema = JSON.parse(localStorage.getItem("estudiantesSistema")) || [];

    const nuevoEstudiante = {
        usuario: document.getElementById("inputUsuario").value,
        pass: document.getElementById("inputPassword").value,
        nombre: document.getElementById("inputNombre").value,
        correo: document.getElementById("inputCorreo").value
    };

    estudiantesSistema.push(nuevoEstudiante);
    localStorage.setItem("estudiantesSistema", JSON.stringify(estudiantesSistema));

    form.reset();
    cargarTabla();
});

// para cerrar la sesión admin
document.getElementById("btnCerrarSesionAdmin").addEventListener("click", () => {
    window.location.href = "index.html";
});

// para inicializar la  tabla
cargarTabla();



