import { seleccionarPropiedades } from "../modelos/propiedades.js";


/* Objetos del DOM*/
// Nav
const navrecibo = document.querySelector('#navrecibo')

// Listado de Propiedades
const listado = document.querySelector('#listado');

// Variables

let propiedades = [];

// Control de usuario
let usuario = '';
let logueado = false;

/**
 *  Esta funcion se ejecuta cuando todo el contenido esta guardado
 */

document.addEventListener('DOMContentLoaded', () => {
    controlUsuario();
    mostrarPropiedades();
    mostrarNavCompleto();
});

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
};

/*
* Obtiene las propiedades y los muestra
*/
async function mostrarPropiedades() {
    propiedades = await seleccionarPropiedades();

listado.innerHTML = '';

propiedades.map(propiedad =>
    listado.innerHTML += `
        <div class="col">
                    <div class="card" style="width: 18rem;">
                        <img src="./imagenes/${propiedad.imagen??'nodisponible.png'}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"><span name="spancodigo">${propiedad.codigo} </span> -<span name="spantipo"> ${propiedad.tipo}</span> </h5>
                            <p class="card-text">${propiedad.direccion} ${propiedad.numero} - ${propiedad.localidad}</p>
                            <a href="contactar.html" class="btn btn-primary">Contactar</a>
                            
                        </div>
                    </div> 
        </div>               
    `);
}

/**
 * Muestra las opciones del nav una vez logueado
 */
function mostrarNavCompleto(){
    navrecibo.innerHTML = '';

    nav.map(nav =>
        navrecibo.innerHTML += ` 
                    <li class="nav-item" id="nav-recibo">
                        <a class="nav-link ${logueado?'d-flex':'d-none'}" href="recibos.html">Recibos</a>
                    </li>
        `
    )
    
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

