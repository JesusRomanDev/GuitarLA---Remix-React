//jesus@correo.com Challenger12!
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse
} from '@remix-run/react'

import styles from './styles/index.css'
import Header from './components/header'
import Footer from './components/footer'
import { useState } from 'react'

export function meta(){
    return[
        {charset: 'utf-8'},
        {title: 'GuitarLA - Remix'},
        {viewport: "width=device-width, initial-scale=1"}
    ]
}

export function links(){
    return[
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App(){
    const [carrito, setCarrito] = useState([]);

    const agregarCarrito = (guitarra) => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraStateMap => {
                if(guitarraStateMap.id === guitarra.id){
                    //Reescrbir la cantidad 
                    guitarraStateMap.cantidad = guitarra.cantidad
                }
                return guitarraStateMap
            })
            console.log(carritoActualizado);
            setCarrito(carritoActualizado);
        }else{
            //Es un nuevo registro
            setCarrito([...carrito, guitarra])
        }
    }
    
    const actualizarCantidad = guitarra =>{
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState;
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id =>{
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document ({children}){
    return(
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />

                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

