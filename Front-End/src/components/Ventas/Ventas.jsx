import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../navbar'
import { getventas } from './ventas.service'
import { useEffect,useState } from 'react'

function Ventas() {

  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    getventas().then((ventas) => setVentas(ventas));
    
  }, []);

  console.log(ventas)
  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
           {/* <!-- Header--> */}
      <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">Ventas</h1>
            <p class="lead fw-normal text-white-50 mb-0">
              Sección de Ventas
            </p>
          </div>
        </div>
      </header>

      <div class="form-group">
        <div class="col-md-12 text-center">
          
        </div>
      </div>

      <div class="container mt-5" style={{ marginTop: "30px" }}>
        <div class="table table-responsive border-dark ">
          <table class="table table-bordered table-hover text-center border border-4 ">
            <thead class="table-light">
              <tr>
                <th colSpan="6">
                  <h2 class="text-start ">Ventas</h2>
                </th>
              </tr>
              <tr>
                {/* <th>ID Del Proveedor</th> */}
                <th>ID Del Pedido</th>
                <th>Identificación</th>
                <th>Cliente</th> 
                <th>Fecha de la Venta</th>
                <th>Ingreso Total Generado</th> 
              </tr>
            </thead>
            <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.numero_etiqueta}>
                    <td>{venta.numero_etiqueta}</td>
                    <td>{venta.identificacion}</td>
                    <td>{venta.nombre_cliente}</td> 
                    <td>{venta.fecha_venta}</td>
                    <td>{venta.ingreso_total}</td>
                  </tr>
                ))}
              </tbody>
          </table>

          

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

export default Ventas