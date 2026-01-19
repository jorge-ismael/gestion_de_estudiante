

export async function login(usuario, password) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../../backend/controlador/usuarios.php", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    const text = xhr.responseText;
    let res = null;
    try {
      if (text) res = JSON.parse(text);
    } catch (err) {
      console.error(err);
      alert("Credenciales incorrectas1");
      return;
    }

    if (xhr.status >= 200 && xhr.status < 300) {
      if (res && res.success === false) {
        alert("Credenciales incorrectas2");
        return;
      }

      try {
        if (res && res.data.usuario) {
          localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
          window.location.href = "fronted/vista/templates/index.html";
        } else {
          alert("Credenciales incorrectas3");
        }
      } catch (err) {
        console.error(err);
        alert("Credenciales incorrectas4");
      }
    } else {
      alert("Credenciales incorrectas5");
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };

  xhr.send(JSON.stringify({ accion: "login", usuario: usuario, contrasena: password }));
}

