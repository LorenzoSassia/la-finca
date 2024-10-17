import { seleccionarRecibos, insertarRecibos, actualizarRecibos, eliminarRecibos } from "../modelos/recibos";

/* Objetos del DOM */
// Listado de recibos
const listadoRecibos = document.querySelector('#listadoRecibos');

// Alerta
const alerta = document.querySelector('#alerta');


/**
 *  Esta funcion se ejecuta cuando todo el contenido esta guardado
 */
document.addEventListener('DOMContentLoaded', async () => {
    controlUsuario();
    recibos = await obtenerRecibos();
    recibosFiltrados = filtrarPorCliente('');
    mostrarRecibos();
});

// Obtiene los recibos
async function obtenerRecibos(){
    recibos = await seleccionarRecibos();
    return recibos;
}


// Muestra los recibos
function mostrarRecibos() {
    listadoRecibos.innerHTML = '';

    recibosFiltrados.map(recibo =>
        listadoRecibos.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Recibo Numero ${recibo.num-recibo}</h5>
            <p class="card-text">
              ${recibo.fecha}
              ${recibo.cliente}
              ${recibo.detalle}
            </p>
            <button id="imprimir" class="btn btn-primary">Imprimir</button>
            <button id="recibo-mod" class="btn btn-secondary">Modificar</button>
            <button id="eliminar-recibo" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>`
    )
    
}

/**
 * Filtro de los Recibos
 */
const botonesFiltros = document.querySelectorAll('#filtros button');
botonesFiltros.forEach(boton => {
    boton.addEventListener('click', e => {
        boton.classList.add('active');
        boton.setAttribute('aria-current', 'page');

        botonesFiltros.forEach(otroBoton => {
            if(otroBoton !== boton) {
                otroBoton.classList.remove('active');
                otroBoton.removeAttribute('aria-current');
            }
        });

        buscar = boton.innerHTML;
        if(buscar == 'Todos') {
            buscar = '';
        }
        filtrarPorCliente(buscar);
        mostrarRecibos();
    })
})
