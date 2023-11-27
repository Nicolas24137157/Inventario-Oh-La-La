import React from "react";
import Navbar from "../../navbar";
import { Link } from "react-router-dom";
import { getdevolucion } from "./devoluciones.service";
import { useState,useEffect } from "react";

function Seccion_Devoluciones() {
  const [devolucionesProducto, setDevolucionesProducto] = useState([]);


  useEffect(() => {
    getdevolucion().then((devolucionesProducto) => setDevolucionesProducto(devolucionesProducto));
  }, []);

  return (
    <Navbar>
    <div  className="animate__animated animate__fadeIn animate">
      {/* <!-- Header--> */}
      <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">Sección de Registros de Devoluciones</h1>
            <p class="lead fw-normal text-white-50 mb-0">
              Sección de Registros de Devoluciones Generados
            </p>
          </div>
        </div>
      </header>

      <div className="container mt-5" style={{ marginTop: '30px' }}>
  <div className="table table-responsive border-dark ">
    <table className="table table-bordered table-hover text-center border border-4 ">
      <thead className="table-light">
        <tr>
          <th colSpan="7">
            <h2 className="text-start ">Registros De Devoluciones Generadas (Productos)</h2>
          </th>
        </tr>
        <tr>
          <th>ID Devolución</th>
          <th>Producto</th>
          <th>Cliente</th>
          <th>Observación De La Devolución</th>
          <th>Fecha y Hora De La Devolución</th>
        </tr>
      </thead>
      <tbody>
                {devolucionesProducto.map((devolucion) => (
                  <tr key={devolucion.numero_etiqueta}>
                    <td>{devolucion.numero_etiqueta}</td>
                    <td>{devolucion.nombre_producto}Arroz con Pollo</td>
                    <td>{devolucion.id_cliente}Fredy Ortiz</td> 
                    <td>{devolucion.observacion}</td>
                    <td>{devolucion.hora_devolucion}</td>
                  </tr>
                ))}
              </tbody>
    </table>

    <table className="table table-bordered table-hover text-center border border-4 ">
      <thead className="table-light">
        <tr>
          <th colSpan="7">
            <h2 className="text-start ">Registros De Devoluciones Generadas (Insumos)</h2>
          </th>
        </tr>
        <tr>
        
          <th>Insumo(s) a Devolver</th>
          <th>Observación De La Devolución</th>
          <th>Identificación Del Proveedor</th>
          <th>Nombre Del Proveedor</th>
          <th>Fecha y Hora De La Devolución</th>
          
          <th>Cantidad de Insumo(s) a Devolver</th>
        </tr>
      </thead>
      <tbody>

  
      </tbody>
    </table>

   

    <Link to="/Menu">
      <button type="submit" className="btn btn-primary btn-lg d-flex justify-content-start" style={{ marginTop: '30px' }}>
        Ir Atrás
      </button>{" "}
    </Link>
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
  );
}

export default Seccion_Devoluciones;
