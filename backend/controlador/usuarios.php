<?php
include_once '../modelo/usuario.php';
include_once '../dao/conexion.php';
include_once '../dao/d_usuarios.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(!isset($_POST["accion"])){
        $data = json_decode(file_get_contents('php://input'), true);
        $accion = isset($data['accion']) ? $data['accion'] : '';
    }
    if($data["accion"] == "login"){
        
        try {
        
        if (!isset($data["usuario"]) || !isset($data["contrasena"])) {
            throw new Exception("Es obligatorio rellenar todos los datos");
        }
        
        $usuario = new Usuarios($data["usuario"],$data["contrasena"]);
            if ($usuario->usuario == "" || $usuario->contrasena == "") {
                throw new Exception("Es obligatorio rellenar todos los datos");
            }
            # Verificando integridad de texto #
            
            if (preg_match("/^ [a-zA-Z0-9@]{4,20} $/", $usuario->contrasena)){
                throw new Exception("La CONTRASENA no coincide con el formato solicitado");
            }

            $usuarioBD = obtenerUsuario($conexion,$usuario->usuario);

            if(!isset($usuarioBD) || $usuarioBD != false){
                if($usuarioBD['usuario']==$usuario->usuario && $usuarioBD['contrasena']==$usuario->contrasena){

                    $_SESSION['usuario']=$usuarioBD['usuario'];
                    $_SESSION['idUsuario']=$usuarioBD['idUsuario'];

                # le devolvemos los datos en json

                http_response_code(200);
                echo json_encode([
                    'status' => http_response_code(200),
                    'success' => true,
                    'data' => [
                        "idUsuario" => $usuarioBD["idUsuario"],
                        "usuario" => $usuarioBD["usuario"]
                        ]
                ]);

                }else{
                    throw new Exception('Usuario o clave incorrectos');
                    }
            }else{
                throw new Exception('Usuario o clave incorrectos');
            }
            $userDB = null;

            
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }
    }else{
        echo json_encode(["success" => false, "error" => "Accion no válida"]);
    }
}

?>