import React from 'react'
import {getPost} from '../models/posts.server'
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import {formatearFecha} from '../utils/helpers'
import styles from '../styles/blog.css'

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

export function meta({data}){
    if(!data){
        return[
          {title: `Entrada no encontrada`, 
          description: `Guitarras, venta de guitarras, Entrada no encontrada`}
        ]
      }
      return[
        {title: `GuitarLA - ${data.data[0].attributes.titulo}`, 
        description: `Guitarras, venta de guitarras, entrada ${data.data[0].attributes.titulo}}`}
      ]
}

export function links(){
    return[
        {rel: 'stylesheet', href: styles}
    ]
}

export async function loader({params}){
    const {postUrl} = params;
    console.log(postUrl);
    const post = await getPost(postUrl); 
    console.log(post);
    if(post.data.length ===0){
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'
        })
    }
    return post
}

export default function Post() {
    const post = useLoaderData();

    const {titulo, contenido, imagen, publishedAt} = post.data[0].attributes
  return (
    <article className='contenedor post mt-3'>
        <img className='imagen' src={imagen.data.attributes.url} alt={`imagen blog ${titulo}`} />
        <div className='contenido'>
            <h3>{titulo}</h3>
            <p className='fecha'>{formatearFecha(publishedAt)}</p>
            <p className='texto'>{contenido}</p>
        </div>
    </article>
  )
}
