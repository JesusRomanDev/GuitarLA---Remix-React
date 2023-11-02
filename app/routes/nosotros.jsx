import React from 'react'
import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'
export function meta (){
  return [
    {title: 'GuitarLA - Sobre Nosotros'},
    {desciption: 'Venta de Guitarras, blog de musica y mas'}
  ]
}

export function links(){
  return[
    {
      rel: 'stylesheet', 
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {
  return (
    <main className='contenedor nosotros'>
      <h2 className='heading'>Nosotros</h2>

      <div className='contenido'>
        <img src={imagen} alt="ImagenSobreNosotros" />

        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde obcaecati eum officia repellendus tempore nam, sapiente labore placeat maxime quas sed, hic fuga vitae doloribus cupiditate quo aliquam voluptatem quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ex voluptatem consequatur dolores aperiam impedit ipsam saepe nobis sunt soluta odio rem reprehenderit explicabo deserunt illum, cupiditate itaque eligendi distinctio.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde obcaecati eum officia repellendus tempore nam, sapiente labore placeat maxime quas sed, hic fuga vitae doloribus cupiditate quo aliquam voluptatem quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ex voluptatem consequatur dolores aperiam impedit ipsam saepe nobis sunt soluta odio rem reprehenderit explicabo deserunt illum, cupiditate itaque eligendi distinctio.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros