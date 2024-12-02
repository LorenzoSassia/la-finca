import { seleccionarRecibos, insertarRecibos, actualizarRecibos, eliminarRecibos } from "../modelos/recibos";

/* Objetos del DOM */
// Listado de recibos
const listadoRecibos = document.querySelector('#listadoRecibos');

// Alerta
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputNumRecibo = document.querySelector("#numRecibo");
const inputIdPropiedad = document.querySelector("#idPropiedad");
const inputIdCliente = document.querySelector("#idCliente");
const inputFecha = document.querySelector("#fecha");
const inputCliente = document.querySelector("#cliente");
const inputDetalle = document.querySelector("#detalle");

// Variables
let buscar = '';
let opcion = '';
let id;
let mensajeAlerta;

let recibosFiltrados = [];
let recibos = [];
let recibo = {};

// Control de usuario
let usuario = '';
let logueado = false;

/**
 * Controla si el usuario está logueado
 */
const controlUsuario = () => {
    if(sessionStorage.getItem('usuario')) {
        usuario = sessionStorage.getItem('usuario');
        logueado = true;
    } else {
        logueado = false;
    }
    if(logueado) {
        btnNuevo.style.display = 'inline';
    } else {
        btnNuevo.style.display = 'none';
    }
};

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


// Filtra por cliente los recibos
function filtrarPorCliente(n) {
    recibosFiltrados = recibos.filter(items => items.cliente.includes(n));
    return recibosFiltrados;
}

// Muestra los recibos
function mostrarRecibos() {
    listadoRecibos.innerHTML = '';

    recibosFiltrados.map(recibo =>
        listadoRecibos.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Recibo Numero <span name="spannumRecibo">${recibo.numRecibo}</span></h5>
            <p class="card-text"> <span name="spanfecha">${recibo.fecha}  </span> </p>
            <p class="card-text"> <span name="spancliente">${recibo.cliente} </span> </p>
            <p class="card-text"> <span name="spandetalle">${recibo.detalle} </span> </p> 
            <button id="imprimir" class="btn btn-primary">Imprimir</button>
            <button id="recibo-mod" class="btn btn-secondary">Modificar</button>
            <button id="btn-borrar" class="btn btn-danger">Eliminar</button>
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

/**
 * Ejecuta el evento 'click' del boton nuevo
 */
btnNuevo.addEventListener('click', ()=> {
    // Limpiamos los inputs
    inputNumRecibo.value= null; 
    inputIdPropiedad.value= null; 
    inputIdCliente.value= null; 
    inputFecha.value= null;
    inputCliente.value= null;
    inputDetalle.value= null;  
    
    // Mostrar el formulario modal
    formularioModal.show();
    opcion = 'insertar'; 
})

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenimos la accion por defecto

    const datos = new FormData(formulario); // Guardamos los datos del formulario

    switch(opcion) {
        case 'insertar':
            mensajeAlerta = 'Datos guardados';
            insertarRecibos(datos);
            break;

            case 'actualizar':
            mensajeAlerta = 'Datos actualizados';
            actualizarRecibos(datos, id);
            break;

    }
    insertarAlerta(mensajeAlerta, 'success');
    mostrarRecibos();
})

/**
 * Define los mensajes de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de alerta
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible" role="alert" >
            <div>${mensaje}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aira-label="Cerrar"></button> 
        </div>
    `;
    alerta.append(envoltorio);
}

/**
 * Determina en que elemento se realiza un evento 
 * @param elemento el elemento al que se le realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el metodo que maneja el evento
 */
const on =(elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => { // Agregamos el metodo para escuchar el evento
        if(e.target.closest(selector)){ // Si el objetivo del manejador es el selector
            manejador(e); // Ejecutamos el metodo manejador
        }
    })
}

on(document, 'click', '.btn-editar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del boton

    // Guardamos los valores del card 
    id = cardFooter.querySelector('.id-recibo').value;
    recibo = recibos.find(item => item.id == id);
    console.log(recibo);

    recibo = recibos.find(item => item.id == id);
    console.log(recibo);

    // Asignamos los valores a los inputs del formulario
    inputCliente.value = recibo.cliente;
    inputIdCliente.value= recibo.idCliente; 
    inputIdPropiedad.value= recibo.idPropiedad; 
    inputFecha.value= recibo.fecha;
    inputDetalle.value= recibo.detalle;
    inputNumRecibo.value= recibo.numRecibo;  
    
    // Mostramos el formulario
    formularioModal.show();

    opcion = 'actualizar';
})

/**
 * Funcion para el boton borrar 
 */
on(document, 'click', '.btn-borrar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.id-recibo').value;
    const numRecibo = cardFooter.parentNode.querySelector('span[name=spannumRecibo]').innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a${numRecibo}?`);
    if(aceptar) {
        eliminarRecibos(id);
        insertarAlerta(`${numRecibo} borrado`, 'danger');
        mostrarRecibos();
    }
})