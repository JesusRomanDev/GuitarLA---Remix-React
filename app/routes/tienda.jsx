import React from 'react'
import {useLoaderData } from '@remix-run/react';
import {getGuitarras} from '../models/guitarras.server'
import styles from '../styles/guitarras.css'
import ListadoGuitarras from '~/components/listado-guitarras';

export function links(){
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta(){
  return [
    {title: 'GuitarLA - Tienda de Guitarras'},
    {description: 'GuitarLA - Nuestra coleccion de guitarras'}
  ]
}

export async function loader(){
  // const respuesta = await fetch(`${process.env.API_URL}/guitarras`)
  // const resultado = await respuesta.json()
  // console.log(resultado);
  // console.log(process.env.API_URL);
  const guitarras = await getGuitarras();
  console.log(guitarras); //al momento de darle f5 a la pagina, esto se ejecutara POR MEDIO DEL SERVIDOR en la consola
  return guitarras.data
}

function Tienda() {
  
  const guitarras = useLoaderData();
  console.log(guitarras); //al momento de darle f5 a la pagina, esto se ejecutara POR MEDIO DEL SERVIDOR Y CLIENTE en la consola

  return (
    <main className='contenedor'>
      <ListadoGuitarras guitarras={guitarras} />
    </main>
  )
}

export default Tienda