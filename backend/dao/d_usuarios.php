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

  function crearUsuario($conexion, $usuario, $contrasena, $rol){
    $sql = "INSERT INTO usuarios (usuario, contrasena, rol) VALUES (:usuario, :contrasena, :rol)";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->bindParam(':rol', $rol);
    $stmt->execute();
    return $conexion->lastInsertId();
  }

  function actualizarUsuario($conexion, $usuario, $contrasena, $idUsuario){
    $sql = "UPDATE usuarios SET usuario = :usuario, contrasena = :contrasena WHERE idUsuario = :idUsuario";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':idUsuario', $idUsuario);
    return $stmt->execute();
  }
?>