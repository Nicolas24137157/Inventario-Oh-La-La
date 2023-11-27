import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react';
import Navbar from '../../navbar'
import Swal from "sweetalert2";
import { getpedidos,getdomicilio,updateEstado } from './pedidos.services';

function Pedidos() {
  
  const [pedidos, setPedidos] = useState([]);
  const [domicilios, setDomicilios] = useState([]);

  useEffect(() => {
    getpedidos().then((pedidos) => setPedidos(pedidos));
    getdomicilio().then((domicilios) => setDomicilios(domicilios));
  }, []);

  //Funcion Estado
  const handleClickEstado = (id_pedido, estadoActual,identificacion) => {
    console.log(id_pedido + "dom")
    const estados = {
      'Pendiente': 'Pendiente',
      'Finalizada': 'Finalizada',
      'Cancelada': 'Cancelada',
    };
  
    Swal.fire({
      title: 'Selecciona un nuevo estado',
      input: 'select',
      inputOptions: estados,
      inputValue: estadoActual,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cambiar Estado',
    }).then((result) => {
      if (result.isConfirmed) {
        const id_estado = result.value;
        console.log(id_estado, id_pedido);
        // Llama a la función para actualizar el estado en la base de datos
        updateEstado(id_pedido, id_estado, identificacion)
          .then(() => {
            // Actualiza el estado localmente en la lista de reservas
            getpedidos().then( pedidos => setPedidos(pedidos));

            getdomicilio().then( domicilios => setDomicilios(domicilios));
  
            // Muestra un mensaje de éxito con el nombre del estado
            Swal.fire('¡Estado actualizado!', `La reserva ahora está ${estados[id_estado]}`, 'success');
          })
          .catch((error) => {
            console.error('Error al actualizar el estado:', error);
            Swal.fire('Error', 'Hubo un error al actualizar el estado.', 'error');
          });
      }
    });

  };

  return (
    <Navbar>
    <div  className="animate__animated animate__fadeIn animate">
        {/* <!-- Header--> */}
       <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Pedidos</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Sección de Pedidos
            </p>
          </div>
        </div>
      </header>

      <div class="container mt-5" style={{ marginTop: "30px" }}>
        <div class="table table-responsive border-dark ">
          <table class="table table-bordered table-hover text-center border border-4 ">
            <thead class="table-light">
              <tr>
                <th colSpan="9">
                  <h2 class="text-start ">Pedidos</h2>
                </th>
              </tr>
              <tr>
                <th># Del Pedido</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Número de Mesa</th> 
                <th>Estado Del Pedido</th> 
                <th style={{ width: "160px" }}>Opciones</th>
              </tr>
            </thead>

            <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id_pedido}>
                    <td>{pedido.id_pedido}</td>
                    <td>{pedido.nombre_cliente}</td>
                    <td>{pedido.nombre_producto}</td>
                    <td>{pedido.cantidad}</td>
                    <td>{pedido.numero_mesa}</td>
                    
                    <td>
                    <button
                      className="btn btn-link"
                      onClick={() => handleClickEstado(pedido.id_pedido, pedido.estado,pedido.identificacion)}>
                        {pedido.estado}
                    </button>
                    </td>
                    
                   
                    <td className="td-botones">
                      <div className="botones">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => editarProducto(producto.id_producto)}
                          style={{ "--bs-btn-hover-bg": "#f1b609" }}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger ml-2"
                          onClick={() => borrarProducto(producto.id_producto)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              
          </table>

          <Link to="/registrar_pedidos">
      <button type="button" className="btn btn-primary btn-lg d-flex justify-content-start">
        Registrar Pedido
      </button>{" "}
    </Link>
   

          
        </div>
        <Link to="/registrar_pedido_reservado" style={{ marginTop: "30px" }}>
      <button type="button" className="btn btn-primary btn-lg d-flex justify-content-start">
        Registrar Pedido con Reserva
      </button>{" "}
    </Link>
      </div>

      {/* Tabla de Domicilios*/}

      <div class="container mt-5" style={{ marginTop: "30px" }}>
        <div class="table table-responsive border-dark ">
          <table class="table table-bordered table-hover text-center border border-4 ">
            <thead class="table-light">
              <tr>
                <th colSpan="9">
                  <h2 class="text-start ">Domicilios</h2>
                </th>
              </tr>
              <tr>
                {/* <th>ID Del Proveedor</th> */}
                <th># Del Pedido</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Dirección</th>
                <th>Celular</th> 
                <th>Estado Del Pedido</th> 
                <th style={{ width: "160px" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
                {domicilios.map((domicilio) => (
                  <tr key={domicilio.id_pedido}>
                    <td>{domicilio.id_pedido}</td>
                    <td>{domicilio.nombre_cliente}</td>
                    <td>{domicilio.nombre_producto}</td>
                    <td>{domicilio.cantidad}</td>
                    <td>{domicilio.direccion}</td>
                    <td>{domicilio.celular}</td>
                    <td>
                    <button
                      className="btn btn-link"
                      onClick={() => handleClickEstado(domicilio.id_pedido, domicilio.estado, domicilio.identificacion)}>
                        {domicilio.estado}
                    </button>
                    </td>
                   
                    
                   
                    <td className="td-botones">
                      <div className="botones">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => editarProducto(producto.id_producto)}
                          style={{ "--bs-btn-hover-bg": "#f1b609" }}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger ml-2"
                          onClick={() => borrarProducto(producto.id_producto)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>

          <Link to="/registrar_domicilios">
      <button type="button" className="btn btn-primary btn-lg d-flex justify-content-start">
        Registrar Domicilio
      </button>{" "}
    </Link>

          <Link to="/Menu">
            <button
              type="submit"
              className="btn btn-primary btn-lg d-flex justify-content-start"
              style={{ marginTop: "30px" }}
            >
              Ir Atrás
            </button>{" "}
          </Link>
        </div>
      </div>




      {/* <!-- Footer--> */}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Restaurante Oh La Lá
          </p>
        </div>
      </footer>
    </div>
    </Navbar>
  )
}

export default Pedidos