<?php
class usuario
{

    private $idusuario;
    private $nombre;
    private $apellidos;
     private $email;

    public function __construct($id, $nombre, $apellidos, $email)
    {
        $this->idusuario = $idusuario;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->email = $email;
    }

    function getid($idusuario)
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
    function setemail($email)
    {
        $this->email = $email;
    }
    
}
