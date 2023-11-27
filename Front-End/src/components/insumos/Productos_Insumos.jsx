import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getInsumos, deleteInsumo } from "./insumos.service";
import Swal from "sweetalert2";
import Navbar from "../../navbar";
  
function Productos_Insumos(props) {
  const [insumos, setInsumos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getInsumos().then((insumos) => setInsumos(insumos));
  }, []);

  const borrarInsumo = (id_insumos) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas borrar el Insumo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, elimina el producto
        deleteInsumo(id_insumos).then(() => {
          getInsumos().then((insumos) => setInsumos(insumos));
        });
      }
    });
  };

  const editarInsumo = (id_insumos) => {
    // window.location.href = "./editar_insumo?id_insumos="+id_insumos;
    Swal.fire({
      title: "¿Quieres Editar Este Insumo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./editar_insumo?id_insumos=" + id_insumos;
      }
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
  
    // Actualizar el término de búsqueda
    setSearchTerm(searchTerm);
  
    // Si el término de búsqueda está vacío, restaura la lista completa de productos
    if (searchTerm === '') {
      getInsumos().then((insumos) => setInsumos(insumos));
    } else {
      // Filtrar productos por nombre_producto que coincida con el término de búsqueda letra por letra
      const filteredInsumos = insumos.filter(insumo => {
        const nombreInsumo = insumo.nombre_insumo.toLowerCase();
        return nombreInsumo.includes(searchTerm) || searchTerm.split('').every(char => nombreInsumo.includes(char));
      });
  
      setInsumos(filteredInsumos);
    }
  };


  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
      {/* <!-- Header--> */}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Productos (Insumos)</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Sección de los Insumos
            </p>
          </div>
        </div>
      </header>

      <div className="container mt-5" style={{ marginTop: "30px" }}>
        <div className="table table-responsive border-dark ">
        <input style={{width:"50%"}} 
              type="text"
              className="form-control mb-3"
              id="search"
              placeholder="Filtrar Nombre del Insumo..."
              value={searchTerm}
              onChange={handleSearch}
            />
          <table className="table table-bordered table-hover text-center border border-4 ">
            <thead className="table-light">
              <tr>
                <th colSpan="6">
                  <h2 className="text-start ">Insumos</h2>
                </th>
              </tr>
              <tr>
                <th>ID del Insumo</th>
                <th>Nombre del Insumo</th>
                <th style={{ width: "160px" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {insumos.map((insumo) => (
                <tr key={insumo.id_insumos}>
                  <td>{insumo.id_insumos}</td>
                  <td>{insumo.nombre_insumo}</td>
                  <td className="td-botones">
                    <div className="botones">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => editarInsumo(insumo.id_insumos)}
                        style={{ "--bs-btn-hover-bg": "#f1b609" }}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={() => borrarInsumo(insumo.id_insumos)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/registrar_insumo">
            <button
              type="submit"
              className="btn btn-primary btn-lg d-flex justify-content-start"
            >
              Registrar Insumo
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
  );
}

export default Productos_Insumos;
