import React, { useState } from 'react'
import {getGuitarra} from '../models/guitarras.server'
import { Link, isRouteErrorResponse, useLoaderData, useOutletContext, useRouteError } from '@remix-run/react';
import styles from '../styles/guitarras.css'


export async function loader({request, params}){
  // console.log(request);
  console.log(params); 
  //guitarraUrl es el nombre que nosotros elegimos, tambien lo podemos ver en la consola del servidor, para asi poder extraerlo
  const {guitarraUrl} = params;
  const guitarra = await getGuitarra(guitarraUrl)
  console.log(guitarra);
  //Cuando no existe esa guitarra, arrojamos el error, este error de abajo trabaja con el ErrorBoundary de mas abajo
  //Nota: inicialmente pusimos el errorboundary en root.jsx pero no funcionaba, tuvimos que anclarlo aqui en este componente
  //Nota2: lo pusimos aqui porque si dejabamos el errorboundary en root, de alguna manera no aplicaba los metadatos de esta pagina,
  //se iba automaticamente a los metadatos de la pagina de root y nos imprimia GuitarLA - Remix
  if(guitarra.data.length === 0){
    throw new Response('',{
      status: 404,
      statusText: 'Guitarra no encontrada'
    })
  }
  // console.log(guitarra.data[0].attributes.nombre);
  return guitarra
}

// Manejo de errores

export function ErrorBoundary(){
  const error = useRouteError();
  if(isRouteErrorResponse(error)){
      return(
          <>
              <p className='error'>
                  {error.status} {error.statusText}
                  <Link className='error-enlace' to='/'>Regresar a pagina principal</Link>
              </p>
          </>
      )
  }
}


//data se pasa en automatico, una vez que el loader tiene informacion y la pasa hacia el componente ese data esta disponible
export function meta({data}){
  console.log(data);
  
  if(!data){
    return[
      {title: `Guitarra no encontrada`, 
      description: `Guitarras, venta de guitarras, guitarra no encontrada`}
    ]
  }
  return[
    {title: `GuitarLA - ${data.data[0].attributes.nombre}`, 
    description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}}`}
  ]
}

export function links(){
  return[
    {rel: 'stylesheet', href: styles}
  ]
}

function Guitarra() {
  const [cantidad, setCantidad] = useState(0)
  const guitarra = useLoaderData();
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes;
  // console.log(guitarra.data[0].attributes.nombre);

  // const data = useOutletContext();
  // console.log(data); //esto nos imprimira lo que tenemos en el root por el ContextAPI
  const {agregarCarrito} = useOutletContext();
  // console.log(data);

  const handleSubmit = e => {
    e.preventDefault()
  
    if(cantidad < 1 ){
      alert('Debes seleccionar una cantidad')
      return
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada);
  }
  

  return (
    <main className='contenedor guitarra'>
      <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />
      <div className='contenido'>
        <h3>{nombre}</h3>
        <p className='texto'>{descripcion}</p>
        <p className='precio'>{precio}</p>

        <form onSubmit={handleSubmit} className='formulario' action="">
          <label htmlFor="cantidad">Cantidad</label>

          <select name="" id="cantidad" onChange={e => setCantidad(Number(e.target.value))}>
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al Carrito" />
        </form>
      </div>
    </main>
  )
}

export default Guitarra