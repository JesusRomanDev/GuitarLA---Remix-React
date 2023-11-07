import React from 'react'
import styles from '../styles/carrito.css'
import { useOutletContext } from '@remix-run/react'

export function links(){
    return[
        {rel: 'stylesheet', href: styles}
    ]
}

export function meta(){
    return[
        {title: 'GuitarLA - Carrito de Compras'},
        {description: 'Carrito de GuitarLA'}
    ]
}

function Carrito() {
    const {carrito} = useOutletContext();
    // console.log(carrito);
  return (
    <main className='contenedor'>
        <h1 className='heading'>Carrito de Compras</h1>

        <div className="contenido">
            <div className="carrito">
                <h2>Articulos</h2>

                {carrito?.length === 0 ? 'Carrito Vacio' : (
                    carrito.map(producto => (
                        <div key={producto.id} className='producto'>
                            <div>
                                <img src={producto.imagen} alt="Imagen del producto" />
                            </div>

                            <div>
                                <p className="nombre">{producto.nombre}</p>
                                <p className="nombre">Cantidad: {producto.cantidad}</p>


                                <p className='precio'>$ <span>{producto.precio}</span></p>
                                <p className='precio'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <aside className="resumen">
                <h3>Resumen del Pedido</h3>
            <p>Total a pagar: $</p>
        </aside>
        </div>
    </main>
  )
}

export default Carrito