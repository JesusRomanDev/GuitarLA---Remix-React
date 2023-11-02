import React from 'react'
import {getPosts} from '../models/posts.server'
import { useLoaderData } from '@remix-run/react';
import styles from '../styles/blog.css'
import ListadoPosts from '~/components/listado-posts';

export function meta(){
  return [
    {title: 'GuitarLA - Nuestro Blog'},
    {description: 'GuitarLA, Blog de musica y venta de guitarras'}
  ]
}

export function links(){
  return[
    {rel: 'stylesheet', href: styles}
  ]
}

export async function loader(){
  const posts = await getPosts();
  console.log(posts);
  return posts.data
}

function Blog() {
  const posts = useLoaderData();
  return (
    <main className='contenedor'>
      <ListadoPosts posts={posts} />
    </main>
  )
}

export default Blog
