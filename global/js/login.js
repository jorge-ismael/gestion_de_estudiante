// para cargar header y footer
// fetch("global/template/header.html")
//     .then(r => r.text())
//     .then(t => document.getElementById("header").innerHTML = t);

import { login } from "../servicios/login.js";

// fetch("global/template/footer.html")
//     .then(r => r.text())
//     .then(t => document.getElementById("footer").innerHTML = t);


const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // para la validacion de la parte admin
    login(username, password);
    // para la validacion del estudiante
    const estudiantesSistema = JSON.parse(localStorage.getItem("estudiantesSistema")) || [];

    const estActivo = estudiantesSistema.find(
        est => est.usuario === username && est.pass === password
    );

    if (estActivo) {
    sessionStorage.setItem("estudianteActivo", JSON.stringify(estActivo));

    // para cambiar la ruta a la correcta relativa a este JS
    window.location.href = "fronted/vista/templates/estudiante.html";
    return;
}


    // en caso de que las credenciales sean incorrectas
    errorMsg.textContent = "EL usuario o contraseña incorrectos";
});
