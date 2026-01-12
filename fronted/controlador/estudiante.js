// INICIO DE TODOEL CODIGO

//
// Listado de estudiantes que se quedan en la memoria
//
let estudiantes = [];

//
// sirve para cargar estudiantes guardados en localStorage
//
const guardados = JSON.parse(localStorage.getItem("estudiantesSistema")) || [];
if (guardados.length > 0) {
    estudiantes = guardados; // sirve para cargar los estudiantes previamente guardados
}
//
// Referencias al formulario y tabla
//
const formEstudiante = document.getElementById('formEstudiante');
const tablaEstudiantes = document.getElementById('tablaEstudiantes');
//
// VARIABLE AGREGADA PARA SABER SI ESTAMOS EDITANDO O NO
let indiceEdicion = null;
//

//
// FUNCION PARA MOSTRAR LOS ESTUDIANTES QUE ESTAN EN LA TABLA
// 
function mostrarEstudiantes() {
    tablaEstudiantes.innerHTML = '';

    estudiantes.forEach((estudiante, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${estudiante.id}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellidos}</td>
            <td>${estudiante.carrera}</td>
            <td>${estudiante.correo}</td>
            <td>
                <button onclick="verInfoEstudiante(${index})">Ver info</button>
                <button onclick="editarEstudiante(${index})">Editar</button>
                <button onclick="eliminarEstudiante(${index})">Eliminar</button>
            </td>
        `;

        tablaEstudiantes.appendChild(fila);
    });
}

//
// FUNCION PARA VER LA INFORMACION DE UN ESTUDIANTE
// 
function verInfoEstudiante(index) {
    const estudianteSeleccionado = estudiantes[index];
    sessionStorage.setItem("estudianteActivo", JSON.stringify(estudianteSeleccionado));
    window.location.href = "estudiante.html";
}

// 
// FUNCION PARA ELIMINAR ESTUDINATE
// 
function eliminarEstudiante(index) {
    estudiantes.splice(index, 1);
    localStorage.setItem("estudiantesSistema", JSON.stringify(estudiantes)); 
    mostrarEstudiantes();
}

// 
// EDITAR USANDO EL FORMULARIO
// 
function editarEstudiante(index) {
    const est = estudiantes[index];

    document.getElementById('id').value = est.id;
    document.getElementById('usuario').value = est.usuario;
    document.getElementById('password').value = est.pass;
    document.getElementById('nombre').value = est.nombre;
    document.getElementById('apellidos').value = est.apellidos;
    document.getElementById('carrera').value = est.carrera;
    document.getElementById('email').value = est.correo;

    indiceEdicion = index; // marcamos el estudiante a editar

    // Cambiar texto del botón
    formEstudiante.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
}

// 
//  EVENTO SUBMIT ADAOTADO(REGISTRO + EDICION)
// 
formEstudiante.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value.trim();
    const usuario = document.getElementById('usuario').value.trim();     
    const pass = document.getElementById('password').value.trim();       
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const carrera = document.getElementById('carrera').value;
    const correo = document.getElementById('email').value.trim();

    // 
    // CONDICIONES QUE USAMOS  SI ESTAMOS EDITANDO AL ESTUDIANTE
    // 
    if (indiceEdicion !== null) {

        const est = estudiantes[indiceEdicion];

        //
        // VALIDAR QUE NO HAYA USUARIOS O CORREOS IGUALES (excepto él mismo)
        //
        if (estudiantes.some((e, i) => i !== indiceEdicion && e.correo.toLowerCase() === correo.toLowerCase())) {
            alert("¡El correo electrónico ya está registrado!");
            return;
        }
        if (estudiantes.some((e, i) => i !== indiceEdicion && e.usuario.toLowerCase() === usuario.toLowerCase())) {
            alert("¡El usuario ya existe! Ingrese otro.");
            return;
        }

        // ACTUALIZAMOS LA TABLA
        est.id = id;
        est.usuario = usuario;
        est.pass = pass;
        est.nombre = nombre;
        est.apellidos = apellidos;
        est.carrera = carrera;
        est.correo = correo;

        //
        // GUARDAMOS LOS ESTUDIANTES EN LOCALSTORAGE
        //
        localStorage.setItem("estudiantesSistema", JSON.stringify(estudiantes));

        //
        // RESTAURAMOS EL FORMULARIO AL GUARDAR ESTUDIANTE
        //
        indiceEdicion = null;
        formEstudiante.reset();
        formEstudiante.querySelector('button[type="submit"]').textContent = "Registrar Estudiante";

        mostrarEstudiantes();
        alert("Los datos del estudiante se han actualizado correctamente.");
        return;
    }

    // 
    //  SI ES UN REGISTRO NUEVO (PARA ASEGURAR QUE NO SE REPITAN EL ID Y EL CORREO Y QUE EL ID SEA UNICO)
    // 
    if (estudiantes.some(est => est.id === id)) {
        alert("¡El ID ya existe! por favor ingrese un ID diferente.");
        return;
    }
    if (!/^\d+$/.test(id)) {
        alert("El ID debe contener solo números.");
        return;
    }
    if (estudiantes.some(est => est.correo.toLowerCase() === correo.toLowerCase())) {
        alert("¡El correo electrónico ya está registrado!");
        return;
    }
    if (estudiantes.some(est => est.usuario.toLowerCase() === usuario.toLowerCase())) {
        alert("¡El usuario ya existe! Ingrese otro.");
        return;
    }

    const nuevoEstudiante = {
        id,
        usuario,
        pass,
        nombre,
        apellidos,
        carrera,
        correo,
        materias: [],
        horario: []
    };

    estudiantes.push(nuevoEstudiante);
    localStorage.setItem("estudiantesSistema", JSON.stringify(estudiantes));

    formEstudiante.reset();
    mostrarEstudiantes();

    alert("EL estudiante ha sido registrado correctamente.");
});

//
// PERMITE CARGAR LA TABLA DESPUES DE INICIAR LA SESION COMO ADMINISTRARDOR
//
mostrarEstudiantes();


