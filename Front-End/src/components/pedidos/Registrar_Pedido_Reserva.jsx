import React from 'react'
import { Link,useNavigate} from "react-router-dom";
import Navbar from "../../navbar";
import { useState,useEffect } from "react";
import { getReservasMesas } from '../reservas/registrar_reservas.service';
import { getProductos } from '../productos/productos.service';
import { postPedido, postPedidoReserva } from "./pedidos.services";
import Swal from 'sweetalert2'


function Registrar_Pedido_Reserva() {

    const navigate = useNavigate()

    const [datos, setDatos] = useState([]);
    const [nuevoDato, setNuevoDato] = useState('');
    const [nuevaCantidad, setNuevaCantidad] = useState('');
    const [productos, setProductos] = useState([])
    const [selected_producto,setSelectedProducto] = useState('')
    const [reservas_mesas, setReservasMesas] = useState([])
    const [selected_reservas, setSelectedReservas] = useState('')
    
   

    useEffect(()=>{
        getProductos().then (productos => setProductos(productos)) 
        getReservasMesas().then (reservas_mesas => setReservasMesas(reservas_mesas))   
    },[])

   
    
    const agregarDato = (e) => {
        e.preventDefault();
        const cantidadNumerica = parseFloat(nuevaCantidad);
        const producto_seleccionado =  productos.find(elemento => elemento.id_producto == selected_producto)
        if (selected_producto !== '' && !isNaN(cantidadNumerica)) {
        setDatos([...datos, { nombre_producto: producto_seleccionado.nombre_producto,
                              id_producto :producto_seleccionado.id_producto,
                              precio_producto: producto_seleccionado.precio,
                              cantidad: cantidadNumerica,
                              cantidad_subtotal:(producto_seleccionado.precio * cantidadNumerica) }]);
        setSelectedProducto('');
        setNuevaCantidad('');
        }
    };

    const handleEliminar = (index) => {
        // Crea una copia del array de datos
        const nuevosDatos = [...datos];
        // Elimina el elemento correspondiente al índice
        nuevosDatos.splice(index, 1);
        // Actualiza el estado con los nuevos datos
        setDatos(nuevosDatos);
    };
    
    //Calculo Total Del Pedido
    const sumaCantidad = datos.reduce((total, item) => total + item.cantidad_subtotal, 0);
    

    //
    async function handleClick (){
      const datos_reserva =  reservas_mesas.find(e => e.id_reserva == selected_reservas);
        const Pedidos = JSON.stringify({ 
            id_mesa:datos_reserva.id_mesa,
            datos:datos,
            identificacion:datos_reserva.identificacion,
            tipo_identificacion: datos_reserva.tipo_identificacion,
            nombre_cliente:datos_reserva.nombre_cliente
        })
        try{
            const data = await postPedidoReserva(Pedidos);
            Swal.fire({
                    title: 'Pedido Registrado Exitosamente',
                    icon: 'success',
            }).then(()=>{
                navigate("/pedidos")
            })            
        } catch(e){
            Swal.fire({
                title: e,
                icon: 'error',
            })  
        }        
    }



  return (
    <Navbar>
        <div className="animate__animated animate__fadeIn animate">
            {/* <!-- Header--> */}
            <header class="bg-dark py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Registrar Pedido Reservado</h1>
                <p class="lead fw-normal text-white-50 mb-0">
                    Registra el Pedido Reservado Atráves del formulario
                </p>
                </div>
            </div>
            </header>

            {/* <!-- Formulario--> */}

            <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="well well-sm">
                    <form class="form-horizontal" method="post">
                    <fieldset>
                        <legend
                        class="text-center header"
                        style={{ position: "relative", left: "0px" }}
                        >
                        Registrar Pedido (Reserva)
                        </legend>

                        <div className="formulario">
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center">
                            <i class="fa fa-user bigicon"></i>
                            </span>
                            <div class="col-md-8">
                            <label htmlFor="name">
                                Reserva de la Persona del Pedido
                            </label>
                            <select id="nInsumo" name="NombreInsumo" class="form-select" placeholder='Nombre Del Insumo'
                                    onChange={(e)=>{
                                    setSelectedReservas(e.target.value)
                                }} 
                                >
                                <option value='0'>Seleccione La Reserva De La Persona</option>
                                {reservas_mesas.map((reservas) => (
                                    <option value={reservas.id_reserva}>{reservas.identificacion} {reservas.nombre_cliente} {reservas.hora_reserva} {('Mesa ') + reservas.numero_mesa}    </option>
                                ))} 
                                </select>
                            </div>
                        </div>

                        

                        {/* Formulario Pedido */}

                        <div className="container mt-5" style={{marginLeft:"5px"}}>
                        <h2 style={{ color: 'white' }}>Formulario del Pedido</h2>
                        <div className="row mt-3">
                            <div className="col-md-4    ">
                            <label>Selecciona Un Producto:</label>

                                <select id="nInsumo" name="NombreInsumo" class="form-select" placeholder='Nombre Del Insumo'
                                    onChange={(e)=>{
                                    setSelectedProducto(e.target.value)
                                }} 
                                >
                                <option value='0'>Seleccione Un Producto</option>
                                {productos.map((producto) => (
                                    <option value={producto.id_producto}>{producto.nombre_producto}</option>
                                ))} 
                                </select>
            </div>
            <div className="col-md-4">
            <label>Cantidad:</label>
            <input
                className="form-control"
                type="number"
                value={nuevaCantidad}
                onChange={(e) => setNuevaCantidad(e.target.value)}
            />
            </div>
            <div className="col-md-4">
            <button className="btn btn-primary" onClick={agregarDato} style={{marginTop:"25px"}}>
                Agregar
            </button>
            </div>
        </div>

        <div className="row mt-3">
        <div className="col-md-8"> {/* Agrega esta línea para envolver la tabla en una columna */}
        <table className="table">
            <thead>
            <tr>
                <th scope="col-md-4">Producto </th>
                <th scope="col-md-4">Cantidades</th>
                <th scope="col-md-4">Precio</th>
                <th scope="col-md-4">Precio SubTotal</th>
                <th scope="col-md-4">Opciones</th>
            </tr>
            </thead>
                <tbody>
            
                {datos.map((item, index) => (
                    
                    <tr key={index} >                   
                    <td> {item.nombre_producto}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.precio_producto}</td>
                    <td>{item.cantidad_subtotal}</td>
                    <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => handleEliminar(index)} type="button" class="btn btn-primary" style={{ alignSelf: 'flex-end',backgroundColor:"black",borderColor:"black" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                        </svg>
                        {/* Borrar */}
                    </button>
                    </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Precio Total:</td>
                    <td>{sumaCantidad}</td>
                    </tr>
                </tfoot>
        </table>
        </div>
        </div>
        </div>
                        {/* Formulario Pedido */}
                        
                        
                    

                        <div className="form-group">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-primary btn-lg1" onClick={(e) =>{
                                    e.preventDefault()
                                    handleClick()
                                }}>Registrar Pedido</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 text-center">
                            <Link to="/pedidos">
                                {" "}
                                <button
                                type="submit"
                                class="btn btn-primary btn-lg1"
                                >
                                Ir Atrás
                                </button>
                            </Link>
                            </div>
                        </div>
                        </div>
                    </fieldset>
                    </form>
                </div>
                </div>
            </div>
            </div>
            {/* <!-- Footer--> */}
            <footer class="py-5 bg-dark">
            <div class="container">
                <p class="m-0 text-center text-white">
                Copyright &copy; Restaurante Oh La Lá
                </p>
            </div>
            </footer>
        </div>
        </Navbar>
  )
}

export default Registrar_Pedido_Reserva