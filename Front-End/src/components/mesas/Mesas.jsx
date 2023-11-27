import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { getMesas, deleteMesa } from "../mesas/mesas.service";
import Swal from 'sweetalert2';
import Navbar from '../../navbar';

function Mesas() {

  const [mesas, setMesas] = useState([])

  useEffect(()=>{
    getMesas().then( mesas => setMesas(mesas))   
  },[])

  
  const borrarMesa = (id_mesa) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas Borrar los Datos De La Mesa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, elimina el producto
        deleteMesa(id_mesa).then(() => {
          getMesas().then((mesas) => setMesas(mesas));
        });
      }
    });
  }
  

  const editarMesa = (id_mesa) => {
    Swal.fire({
      title: '¿Quieres Editar Los Valores De La Mesa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./editar_mesa?id_mesa=" + id_mesa;
      }
    });
  }


  return (
    <Navbar>
    <div  className="animate__animated animate__fadeIn animate">
         {/* <!-- Header--> */}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Registro De Mesas</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Sección del Registro de las Mesas
            </p>
          </div>
        </div>
      </header>

  
      <div class="container mt-5" style={{ marginTop: "30px" }}>
        <div class="table table-responsive border-dark ">
          <table class="table table-bordered table-hover text-center border border-4 ">
            <thead class="table-light">
              <tr>
                <th colSpan="6">
                  <h2 class="text-start ">Mesas Registradas</h2>
                </th>
              </tr>
              <tr>
                <th>Número De La Mesa</th>
                <th>Capacidad De La Mesa</th>
                <th style={{ width: "160px"}}>Opciones</th>
              </tr>
            </thead>
            <tbody>
            {mesas.map((mesa) => (
          <tr key={mesa.id_mesa}>
            <td>{mesa.numero_mesa}</td>
           <td>{mesa.capacidad}</td>
            
            <td>
              <div className="botones">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editarMesa(mesa.id_mesa)}
                  style={{ "--bs-btn-hover-bg": "#f1b609" }}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={() => borrarMesa(mesa.id_mesa)}
                >
                  Borrar
                </button>
              </div>
            </td>
          </tr>
        ))} 
            </tbody>
          </table>

          <Link to="/registrar_mesa">
            <button
              type="submit"
              className="btn btn-primary btn-lg d-flex justify-content-start"
            >
              Registrar Mesa
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

export default Mesas