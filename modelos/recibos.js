const url = './api/datos.php?tabla=recibos';

/*
Funcion asincrona para seleccionar Recibos
*/
export async function seleccionarRecibos() {
    let res = await fetch(url+'&accion=seleccionar');
    let datos = await res.json();
    if(res.status !== 200){
        throw Error('Los datos no se encontraron');
    }
    console.log(datos);
    return datos;
}

/**
 * Insertar los datos en la base de datos
 * @param datos Los datos a insertar
 */
export function insertarRecibos(datos) {
    fetch(`${url}&accion=insertar`, {
        method: 'POST',
        body: datos
    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        return data;
    })
}

/**
 * Actualiza los datos en la Base de Datos
 * @param datos los datos a actualizar
 * @param id el id de la propiedad
 */
export const actualizarRecibos = (datos, id) => { 
    fetch(`${url}&accion=actualizar&id=${id}`, {
        method: 'POST',
        body: datos
    }) 
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        return data;
    });
}

/**
 * Elimina los datos de la base de datos
 * @param id el id de los datos a eliminar
 */
export const eliminarRecibos = (id) => {
    fetch(`${url}&accion=eliminar&id=${id}`,{})
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        return data;
    })
}