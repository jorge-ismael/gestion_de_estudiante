<?php

function listarEstudiantes($conexion){
    $sql = "SELECT * FROM estudiantes";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    $estudiantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $estudiantes;
}

function listarEstudiantesCompleto($conexion){
    $sql = "SELECT e.idEstudiante, e.nombre, e.apellidos, e.carrera, e.email, u.usuario, u.idUsuario FROM estudiantes e JOIN usuarios u ON e.idUsuario = u.idUsuario";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    $estudiantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $estudiantes;
}

function crearEstudiante($conexion, $estudiante){
    $idUsuario = crearUsuario($conexion, $estudiante->usuario, $estudiante->contrasena, 'estudiante');
    $sql = "INSERT INTO estudiantes (nombre, apellidos, carrera, email, idUsuario) VALUES (:nombre, :apellidos, :carrera, :email, :idUsuario)";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':nombre', $estudiante->nombre);
    $stmt->bindParam(':apellidos', $estudiante->apellidos);
    $stmt->bindParam(':carrera', $estudiante->carrera);
    $stmt->bindParam(':email', $estudiante->email);
    $stmt->bindParam(':idUsuario', $idUsuario);
    return $stmt->execute();
}

function actualizarEstudiante($conexion, $estudiante){
    actualizarUsuario($conexion, $estudiante->usuario, $estudiante->contrasena, $estudiante->idUsuario);
    $sql = "UPDATE estudiantes SET nombre = :nombre, apellidos = :apellidos, carrera = :carrera, email = :email WHERE idEstudiante = :idEstudiante";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':nombre', $estudiante->nombre);
    $stmt->bindParam(':apellidos', $estudiante->apellidos);
    $stmt->bindParam(':carrera', $estudiante->carrera);
    $stmt->bindParam(':email', $estudiante->email);
    $stmt->bindParam(':idEstudiante', $estudiante->idEstudiante);
    return $stmt->execute();
}

function eliminarEstudiante($conexion, $idEstudiante, $usuario_id){
    $sql = "DELETE FROM estudiantes WHERE idEstudiante = :idEstudiante;
            DELETE FROM usuarios WHERE idUsuario = :usuario_id;";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':idEstudiante', $idEstudiante);
    $stmt->bindParam(':usuario_id', $usuario_id);
    return $stmt->execute();
}

function obtenerDatosEstudiante($conexion, $idUsuario){
    $sql = "SELECT e.idEstudiante, e.nombre, e.apellidos, e.carrera, e.email, u.usuario, u.contrasena, u.idUsuario FROM estudiantes e JOIN usuarios u ON e.idUsuario = u.idUsuario WHERE u.idUsuario = :idUsuario";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':idUsuario', $idUsuario);
    $stmt->execute();
    $estudiante = $stmt->fetch(PDO::FETCH_ASSOC);
    return $estudiante;
}

?>