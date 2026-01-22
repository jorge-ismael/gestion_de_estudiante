<?php
class estudiante
{
    public $nombre;
    public $apellidos;
    public $carrera;
    public $email;
    public $usuario;
    public $contrasena;

    public function __construct($nombre, $apellidos,  $carrera, $email, $usuario, $contrasena)
    {
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->carrera = $carrera;
        $this->email = $email;
        $this->usuario = $usuario;
        $this->contrasena = $contrasena;
    }
}

    class estudiante2
{
    public $idEstudiante;
    public $idUsuario;
    public $nombre;
    public $apellidos;
    public $carrera;
    public $email;
    public $usuario;
    public $contrasena;

    public function __construct($idEstudiante, $idUsuario, $nombre, $apellidos,  $carrera, $email, $usuario, $contrasena)
    {
        $this->idEstudiante = $idEstudiante;
        $this->idUsuario = $idUsuario;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->carrera = $carrera;
        $this->email = $email;
        $this->usuario = $usuario;
        $this->contrasena = $contrasena;
    }
}

?>