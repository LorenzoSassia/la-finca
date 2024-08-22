import { seleccionarPropiedades, insertarPropiedades } from "../modelos/propiedades.js";


/* Objetos del DOM*/
// Listado de Propiedades
const listado = document.querySelector('#listado');

// Alerta
const alerta = document.querySelector('#alerta');

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputCodigo = document.querySelector('#codigo');
const inputDireccion = document.querySelector('#direccion');
const inputNumero = document.querySelector('#numero');
const inputLetra = document.querySelector('#letra');
const inputCodigo_postal = document.querySelector('#codigo_postal');
const inputLocalidad = document.querySelector('#localidad');
const inputProvincia = document.querySelector('#provincia');
const inputTipo = document.querySelector('#piso');
const inputObservaciones = document.querySelector('#Observaciones');

// Imagen del formulario
const frmImagen = document.querySelector('#frmImagen');

// Variables
let opcion = '';
let id;
let mensajeAlerta;



/**
 *  Esta funcion se ejecuta cuando todo el contenido esta guardado
 */

document.addEventListener('DOMContentLoaded', () => {
    mostrarPropiedades();
})

/*
* Obtiene las propiedades y los muestra
*/
async function mostrarPropiedades() {
    const propiedades = await seleccionarPropiedades();


propiedades.map(propiedad =>
    listado.innerHTML += `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="imagenes/${propiedad.imagen}" class="card-img-top" alt="...">
                 <div class="card-body">
                  <h5 class="card-title"><span name="spancodigo">${propiedad.codigo}</span> -<span name="spantipo">  ${propiedad.inputTipo}</span></h5>
                </div>
            </div>
        </div>
               
    `


 );
}

/**
 * Ejecuta el evento 'click' del boton nuevo
 */
btnNuevo.addEventListener('click', ()=> {
    // Limpiamos los inputs
    inputCodigo.value= null; 
    inputDireccion.value= null; 
    inputNumero.value= null; 
    inputLetra.value= null;
    inputCodigo_postal.value= null;
    inputLocalidad.value= null;  
    inputProvincia.value= null;        
    inputTipo.value= null;  
    inputObservaciones.value= null;   
    frmImagen.src = './imagenes/nodisponible.png';

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
            insertarPropiedades(datos);
            break;
    }
    insertarAlerta(mensajeAlerta, 'success')
    mostrarPropiedades();
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