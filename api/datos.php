<?php
require_once('modelos.php');

if(isset($_GET['tabla'])) {
    $tabla = new ModeloABM($_GET['tabla']);

    $datos = $tabla->seleccionar();
    echo $datos;
}

?>