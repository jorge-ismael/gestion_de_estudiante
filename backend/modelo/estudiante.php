<?php
class estudiante
{

    private $id;
    private $nombre;
    private $apellidos;
    private $carrera;
    private $email;

    public function __construct($id, $nombre, $apellidos,  $carrera, $email)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->carrera = $carrera;
        $this->email = $email;
    }

    function getid($id)
    {
        return $this->id;
    }
    function getNombre()
    {
        return $this->nombre;
    }
    function getApellidos()
    {
        return $this->apellidos;
    }
    function getCarrera()
    {
        return $this->carrera;
    }
    function getemail()
    {
        return $this->email;
    }
    
    
    function setid($id)
    {
        $this->id = $id;
    }
    function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }
    function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }
    function setCarrera($carrera)
    {
        $this->carrera = $carrera;
    }
    function setemail($email)
    {
        $this->email = $email;
    }
    
}
