//export default//
     class Estudiante {
    constructor(id, nombre, apellidos, carrera, email) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.carrera = carrera;
        this.email = email;
    }

    getId() { return this.id; }
    getNombre() { return this.nombre; }
    getApellidos() { return this.apellidos; }
    getCarrera() { return this.carrera; }
    getEmail() { return this.email; }

    setNombre(nombre) { this.nombre = nombre; }
    setApellidos(apellidos) { this.apellidos = apellidos; }
    setCarrera(carrera) { this.carrera = carrera; }
    setEmail(email) { this.email = email; }
}
