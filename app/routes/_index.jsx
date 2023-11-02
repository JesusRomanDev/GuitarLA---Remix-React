import { useLoaderData } from '@remix-run/react'
import {getGuitarras} from '../models/guitarras.server'
import {getPosts} from '../models/posts.server'
import {getCurso} from '../models/curso.server'
import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoPosts from '~/components/listado-posts'
import Curso from '~/components/curso'
import stylesGuitarras from '../styles/guitarras.css'
import stylesPosts from '../styles/blog.css'
import stylesCurso from '../styles/curso.css'

export function links(){
  return[
    {rel: 'stylesheet', href: stylesGuitarras},
    {rel: 'stylesheet', href: stylesPosts},
    {rel: 'stylesheet', href: stylesCurso}
  ]
}
export async function loader(){

  const [guitarras, posts, curso] = await Promise.all([getGuitarras(), getPosts(), getCurso()])
  //usamos lo de arriba para tener multiples llamados a API's en vez de los de abajo, asi lograremos mejor performance
  // const guitarras = await getGuitarras();
  // console.log(guitarras);
  // const posts = await getPosts();
  return {
    guitarras: guitarras.data, 
    posts: posts.data,
    curso: curso.data
  }
}


function Index() {
  const {guitarras, posts, curso} = useLoaderData();
  console.log(guitarras);
  console.log(posts);
  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras guitarras={guitarras} />
      </main> 

      <Curso curso={curso.attributes} />

      <section className='contenedor'>
        <ListadoPosts posts={posts} />
      </section>
    </>
  )
}

export default Index