<?php
require_once('modelos.php');

$mensaje= '';

if(isset($_GET['tabla'])) {
    $tabla = new ModeloABM($_GET['tabla']);
    if(isset($_GET['accion'])){
        if($_GET['accion'] == 'insertar'){
            $valores = $_POST;
        }

        switch($_GET['accion']) {
            case 'seleccionar':
                $datos = $tabla->seleccionar();
                print_r($datos);
                break;

                case 'insertar':
                    $tabla->insertar($valores);
                    $mensaje = 'datos Guardados';
                    echo json_encode($mensaje);
                    break;
        }
    }
}

?>