import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../navbar'
import { getinventario,deleteinventario } from './inventario.services'
import { useState,useEffect } from 'react'
import Swal from "sweetalert2";

function Inventario() {

  const [inventarios, setInventario] = useState([]);
  
  
  useEffect(() => {
    getinventario().then((inventarios) => setInventario(inventarios));
  }, []);

 
  const borrarInventario = (id_lote) => {
    
    Swal.fire({
      title: "¿Estás seguro de que deseas Borrar El Campo del Inventario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteinventario(id_lote).then(() => {
          getinventario().then((inventarios) => setInventario(inventarios));
        });
      }
    });
  };

  const Editar_Inventario = (id_lote) => {
    Swal.fire({
      title: "¿Quieres Editar los Datos del Insumo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./editar_inventario?id_lote=" + id_lote;
      }
    });
  };


  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
    {/* <!-- Header--> */}
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">Inventario (Insumos)</h1>
          <p className="lead fw-normal text-white-50 mb-0">
            Sección de Inventario
          </p>
        </div>
      </div>
    </header>

    <div className="container mt-5" style={{ marginTop: "30px" }}>
      <div className="table table-responsive border-dark ">
      
        <table className="table table-bordered table-hover text-center border border-4 ">
          <thead className="table-light">
            <tr>
              <th colSpan="8">
                <h2 className="text-start">Inventario De Insumos</h2>
              </th>
            </tr>
            <tr>
              <th>ID lote</th>
              <th>Nombre del Insumo</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Fecha De Ingreso</th>
              <th>Fecha De Caducidad</th>
              <th>Proveedor</th>
              <th style={{ width: "160px" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
          {inventarios.map((inventario) => (
                <tr key={inventario.id_lote}>
                  <td>{inventario.id_lote}</td>
                  <td>{inventario.nombre_insumo}</td>
                  <td>{inventario.cantidad}</td>
                  <td>{inventario.unidad}</td>
                  <td>{inventario.fecha_ingreso}</td>
                  <td>{inventario.fecha_caducidad}</td>
                  <td>{inventario.nombre_proveedor}</td>
                  <td className="td-botones">
                    <div className="botones">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => Editar_Inventario(inventario.id_lote)}
                        style={{ "--bs-btn-hover-bg": "#f1b609" }}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={() => borrarInventario(inventario.id_lote)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Link to="/registrar_datos_inventario">
          <button
            type="submit"
            className="btn btn-primary btn-lg d-flex justify-content-start"
          >
            Registrar Datos de Insumo
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

export default Inventario