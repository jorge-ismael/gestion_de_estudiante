
// REFERENCIAS

const formEstudiante = document.getElementById('formEstudiante');
const tablaEstudiantes = document.getElementById('tablaEstudiantes');
const URL_BACKEND = "../../backend/controlador/estudiantes.php"; // ruta a tu backend


// CARGAR TABLA DESDE BACKEND

async function cargarTabla() {
    try {
        const res = await fetch(URL_BACKEND, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accion: "listar" })
        });

        const data = await res.json();

        if (data.success) {
            tablaEstudiantes.innerHTML = '';
            data.estudiantes.forEach((est, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${est.id}</td>
                    <td>${est.nombre}</td>
                    <td>${est.apellidos}</td>
                    <td>${est.carrera}</td>
                    <td>${est.email}</td>
                    <td>
                        <button onclick="verInfoEstudiante(${index})">Ver info</button>
                    </td>
                `;
                tablaEstudiantes.appendChild(fila);
            });
        } else {
            console.error("Error al cargar estudiantes:", data.error);
        }

    } catch (err) {
        console.error("Error al conectar con el backend:", err);
    }
}


// REGISTRAR ESTUDIANTE

formEstudiante.addEventListener('submit', async function(e) {
    e.preventDefault();

    const estudiante = {
        accion: "agregar",
        id: document.getElementById('id').value.trim(),
        usuario: document.getElementById('usuario').value.trim(),
        pass: document.getElementById('password').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        apellidos: document.getElementById('apellidos').value.trim(),
        carrera: document.getElementById('carrera').value,
        email: document.getElementById('email').value.trim()
    };

    try {
        const res = await fetch(URL_BACKEND, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(estudiante)
        });

        const data = await res.json();

        if (data.success) {
            alert("Estudiante agregado correctamente.");
            formEstudiante.reset();
            cargarTabla(); // actualizar tabla en tiempo real
        } else {
            alert("Error al agregar estudiante: " + data.error);
        }

    } catch (err) {
        alert("Error al conectar con el servidor.");
        console.error(err);
    }
});


// VER INFORMACIÓN DE UN ESTUDIANTE

function verInfoEstudiante(index) {
    // Solo para ver información
    alert("Seleccionó el estudiante en la fila: " + (index + 1));
}


// INICIALIZAR

cargarTabla();
