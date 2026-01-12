<?php
class profesor
{

    private $idprofesor;
       private $DIP;
    

    public function __construct($idprofesor, $DIP)
    {
        $this->idusuario = $idusuario;
        $this->DIP = $DIP;
       
    }

    function getid($idusuario)
    {
        return $this->id;
    }
    function getDIP($DIP)
    {
        return $this->DIP;
    }
    
    
    function setid($id)
    {
        $this->id = $id;
    }
    function setDIP($DIP)
    {
        $this->DIP = $DIP;
    }
   
}
