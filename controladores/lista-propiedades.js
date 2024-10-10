import { seleccionarPropiedades, insertarPropiedades, actualizarPropiedades, eliminarPropiedades } from "../modelos/propiedades.js";


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
const inputCodigo_postal = document.querySelector('#codigo-postal');
const inputLocalidad = document.querySelector('#localidad');
const inputProvincia = document.querySelector('#provincia');
const inputPiso = document.querySelector('#piso');
const inputObservaciones = document.querySelector('#observaciones');
const inputTipo = document.querySelector("#tipo");

// Imagen del formulario
const frmImagen = document.querySelector('#frmImagen');

// Variables
let buscar = '';
let opcion = '';
let id;
let mensajeAlerta;

let propiedadesFiltradas = [];
let propiedades = [];
let propiedad = {};

// Control de usuario
let usuario = '';
let logueado = false;



/**
 *  Esta funcion se ejecuta cuando todo el contenido esta guardado
 */



document.addEventListener('DOMContentLoaded', async () => {
    controlUsuario();
    propiedades = await obtenerPropiedades();
    propiedadesFiltradas = filtrarPorTipo('');
    mostrarPropiedades();
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
    if(logueado) {
        btnNuevo.style.display = 'inline';
    } else {
        btnNuevo.style.display = 'none';
    }
};

/**
 * Obtiene las propiedades
 */
async function obtenerPropiedades() {
    propiedades = await seleccionarPropiedades();
    return propiedades;
}


/**
*  Filtra las propiedades por tipo
* @param n  el tipo de propiedad
* @return propiedades filtrados
 */

function filtrarPorTipo(n) {
    propiedadesFiltradas = propiedades.filter(items => items.tipo.includes(n));
    return propiedadesFiltradas;
}

 function mostrarPropiedades() {
    listado.innerHTML = '';

    propiedadesFiltradas.map(propiedad =>
    listado.innerHTML += `
        <div class="col">
                    <div class="card" style="width: 18rem;">
                        <img src="./imagenes/${propiedad.imagen??'nodisponible.png'}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"><span name="spantipo"> ${propiedad.tipo}</span> </h5>
                            <p class="card-text">${propiedad.direccion} ${propiedad.numero} - ${propiedad.localidad}</p>
                            <a href="contactar.html" class="btn btn-primary">Contactar</a>
                            <div class="card-footer ${logueado?'d-flex':'d-none'}"> 
                                 <a class="btn-editar btn btn-primary"> Editar</a> 
                                 <a class="btn-borrar btn btn-danger" > Borrar</a>
                                 <input type="hidden" class="id-propiedad" value="${propiedad.id}">
                                 <input type="hidden" class="imagen-propiedad" value="${propiedad.imagen??'nodisponible.png'}">
                            </div>
                        </div>
                    </div> 
        </div>               
    `);
}

/**
 * Filtro de las propiedades
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
        filtrarPorTipo(buscar);
        mostrarPropiedades();
    })
})

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
    inputPiso.value= null;  
    inputObservaciones.value= null; 
    inputTipo.value= null;  
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

            case 'actualizar':
            mensajeAlerta = 'Datos actualizados';
            actualizarPropiedades(datos, id);
            break;

    }
    insertarAlerta(mensajeAlerta, 'success');
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

/**
 * Funcion para el boton Editar
 */
on(document, 'click', '.btn-editar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del boton

    // Guardamos los valores del card de la Propiedad
    id = cardFooter.querySelector('.id-propiedad').value;
    propiedad = propiedades.find(item => item.id == id);
    console.log(propiedad);

    /*
    const codigo = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML;
    const direccion = cardFooter.parentNode.querySelector('span[name=spandireccion]').innerHTML;
    const numero = cardFooter.parentNode.querySelector('span[name=spannumero]').innerHTML;
    const letra = cardFooter.parentNode.querySelector('span[name=spanletra]').innerHTML;
    const codigo_postal = cardFooter.parentNode.querySelector('span[name=spancodigo_postal]').innerHTML;
    const localidad = cardFooter.parentNode.querySelector('span[name=spanlocalidad]').innerHTML;
    const provincia = cardFooter.parentNode.querySelector('span[name=spanprovincia]').innerHTML;
    const piso = cardFooter.parentNode.querySelector('span[name=spanpiso]').innerHTML;
    const observaciones = cardFooter.parentNode.querySelector('span[name=spanobservaciones]').innerHTML;
    const tipo = cardFooter.parentNode.querySelector('span[name=spantipo]').innerHTML;
    const imagen = cardFooter.querySelector('.imagen-propiedad').value;
    */

    propiedad = propiedades.find(item => item.id == id);
    console.log(propiedad);

    // Asignamos los valore a los inputs del formulario
    inputCodigo.value = propiedad.codigo;
    inputDireccion.value= propiedad.direccion; 
    inputNumero.value= propiedad.numero; 
    inputLetra.value= propiedad.letra;
    inputCodigo_postal.value= propiedad.codigo_postal;
    inputLocalidad.value= propiedad.localidad;  
    inputProvincia.value= propiedad.provincia;        
    inputPiso.value= propiedad.piso;  
    inputObservaciones.value= propiedad.observaciones; 
    inputTipo.value= propiedad.tipo;  
    frmImagen.src = `./imagenes/${propiedad.imagen}`;

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'actualizar';
})

/**
 * Funcion para el boton borrar 
 */
on(document, 'click', '.btn-borrar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.id-propiedad').value;
    const tipo = cardFooter.parentNode.querySelector('span[name=spantipo]').innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a${tipo}?`);
    if(aceptar) {
        eliminarPropiedades(id);
        insertarAlerta(`${tipo} borrado`, 'danger');
        mostrarPropiedades();
    }
})