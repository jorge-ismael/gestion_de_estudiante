<?php
function obtenerUsuario($con, $correo) {
      $sql = "SELECT * FROM usuarios WHERE usuario = ? ";
      $stmt = $con->prepare($sql);
      $stmt->execute([$correo]); 
  
      $result = $stmt->fetch();
      if ($result) {
        return $result;
      } else {
        throw new Exception("Usuario incorrecto"); 
      }
  }



?>