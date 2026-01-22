<?php
include_once '../modelo/estudiante.php';
include_once '../dao/conexion.php';
include_once '../dao/d_usuarios.php';
include_once '../dao/d_estudiantes.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    if(!isset($_POST["accion"])){
        $accion = isset($data['accion']) ? $data['accion'] : '';
    }if(isset($accion) && $accion == "crearEstudiante"){ 
            try {
                $nombre = $data["nombre"];
                $apellidos = $data["apellidos"];
                $email = $data["email"];
                $carrera = $data["carrera"];
                $usuario = $data["usuario"];
                $contrasena = $data["contrasena"];

                $estudiante = new estudiante($nombre, $apellidos, $carrera,$email, $usuario, $contrasena);

                if (!isset($estudiante->nombre) || !isset($estudiante->apellidos) || !isset($estudiante->carrera) || !isset($estudiante->email) || !isset($estudiante->usuario) || !isset($estudiante->contrasena)) {
                    throw new Exception("Es obligatorio rellenar todos los datos del estudiante");
                }

                if(crearEstudiante($conexion, $estudiante)) {
                    echo json_encode(["success" => true, "sms" => "Estudiante creado correctamente"]);
                }else{
                    throw new Exception("No se puedo crear el estudiante");
                }


            } catch (Exception $e) {
                http_response_code(400);
                echo json_encode([
                    'status' => http_response_code(400),
                    'success' => false,
                    'sms' => $e->getMessage()
                ]);
            }
        }
    else if(isset($accion) && $accion == "actualizarEstudiante"){
        try {
            $data = json_decode($_POST['data'], true);
            $idEstudiante = $data["idEstudiante"];
            $idUsuario = $data["idUsuario"];
            $nombre = $data["nombre"];
            $apellidos = $data["apellidos"];
            $carrera = $data["carrera"];
            $email = $data["email"];
            $usuario = $data["usuario"];
            $contrasena = $data["contrasena"];

            $estudiante = new Estudiante2($idEstudiante, $idUsuario, $nombre, $apellidos, $carrera, $email, $usuario, $contrasena);

            if (!isset($estudiante->idEstudiante) || !isset($estudiante->idUsuario) || !isset($estudiante->nombre) || !isset($estudiante->apellidos) || !isset($estudiante->carrera) || !isset($estudiante->email) || !isset($estudiante->usuario) || !isset($estudiante->contrasena)) {
                throw new Exception("Es obligatorio rellenar todos los datos del estudiante");
            }

            if(actualizarEstudiante($conexion, $estudiante)) {
                echo json_encode(["success" => true, "sms" => "Estudiante actualizado correctamente"]);
            }else{
                throw new Exception("No se puedo actualizar el estudiante");
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }
    }else if(isset($accion) && $accion == "eliminarEstudiante"){
        // Lógica para eliminar estudiante
        try {
            $data = json_decode($_POST['data'], true);
            $idEstudiante = $data["idEstudiante"];
            $idUsuario = $data["idUsuario"];

            if (!isset($idEstudiante)) {
                throw new Exception("Es obligatorio el id del estudiante a eliminar");
            }

            if(eliminarEstudiante($conexion, $idEstudiante, $idUsuario)) {
                echo json_encode(["success" => true, "sms" => "Estudiante eliminado correctamente"]); 
            }   
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }

    }
    else{
        echo json_encode(["success" => false, "error" => "Accion no válida2"]);
    }
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['getCompleto']) && $_GET['getCompleto'] == 'true') {
        if(listarEstudiantesCompleto($conexion)) {
            echo json_encode(["success" => true, "estudiantes" => listarEstudiantesCompleto($conexion)]);
        } else {
            echo json_encode(["success" => true, "estudiantes" => []]);
        }

    }else{
        if(listarEstudiantes($conexion,)) {
            echo json_encode(["success" => true, "estudiantes" => listarEstudiantes($conexion)]);
        } else {
            echo json_encode(["success" => true, "estudiantes" => []]);
        }
    }
}

?>