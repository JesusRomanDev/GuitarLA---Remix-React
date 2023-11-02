import React from 'react'
import {getGuitarra} from '../models/guitarras.server'
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
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
  const guitarra = useLoaderData();
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes;
  // console.log(guitarra.data[0].attributes.nombre);
  return (
    <main className='contenedor guitarra'>
      <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />
      <div className='contenido'>
        <h3>{nombre}</h3>
        <p className='texto'>{descripcion}</p>
        <p className='precio'>{precio}</p>
      </div>
    </main>
  )
}

export default Guitarra