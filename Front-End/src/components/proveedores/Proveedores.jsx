import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProveedor, deleteProveedor } from "./proveedores.services";
import Swal from "sweetalert2";
import Navbar from "../../navbar";

function Proveedores(props) {
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProveedor().then((proveedores) => setProveedores(proveedores));
    // console.log(proveedores)
  }, []);

  const borrarProveedor = (id_proveedor) => {
    // Mostrar una ventana emergente de confirmación
    Swal.fire({
      title: "¿Estás seguro de que deseas borrar el Proveedor y sus Datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, elimina el producto
        deleteProveedor(id_proveedor).then(() => {
          getProveedor().then((proveedores) => setProveedores(proveedores));
        });
      }
    });
  };

  const editarProveedor = (id_proveedor) => {
    // window.location.href = "./editar_proveedor?id_proveedor="+id_proveedor;
    Swal.fire({
      title: "¿Quieres Editar Los Datos Del Proveedor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          "./editar_proveedor?id_proveedor=" + id_proveedor;
      }
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Actualizar el término de búsqueda
    setSearchTerm(searchTerm);

    // Si el término de búsqueda está vacío, restaura la lista completa de proveedores
    if (searchTerm === '') {
      getProveedor ().then((proveedores) => setProveedores(proveedores));
    } else {
      // Filtrar proveedores por nombre_proveedor que coincida con el término de búsqueda letra por letra
      const filteredProveedores = proveedores.filter(proveedor => {
        const nombreProveedor = proveedor.nombre_proveedor.toLowerCase();
        return nombreProveedor.includes(searchTerm) || searchTerm.split('').every(char => nombreProveedor.includes(char));
      });

      setProveedores(filteredProveedores);
    }
  };


  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
      {/* <!-- Header--> */}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Proveedores</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Sección de Proveedores
            </p>
          </div>
        </div>
      </header>

      <div class="container mt-5" style={{ marginTop: "30px" }}>
        <div class="table table-responsive border-dark ">
        <input style={{width:"50%"}} 
              type="text"
              className="form-control mb-3"
              id="search"
              placeholder="Filtrar Nombre de Proveedor..."
              value={searchTerm}
              onChange={handleSearch}
            />
          <table class="table table-bordered table-hover text-center border border-4 ">
            <thead class="table-light">
              <tr>
                <th colSpan="6">
                  <h2 class="text-start ">Proveedores</h2>
                </th>
              </tr>
              <tr>
                {/* <th>ID Del Proveedor</th> */}
                <th>NIT</th>
                <th>Nombre del Proveedor</th>
                <th>Celular</th>
                <th>Dirección</th>
                <th style={{ width: "160px" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id_proveedor}>
                  {/* <td>{proveedor.id_proveedor}</td> */}
                  <td>{proveedor.NIT}</td>
                  <td>{proveedor.nombre_proveedor}</td>
                  <td>{proveedor.celular}</td>
                  <td>{proveedor.direccion}</td>
                  <td className="td-botones">
                    <div className="botones">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => editarProveedor(proveedor.id_proveedor)}
                        style={{ "--bs-btn-hover-bg": "#f1b609" }}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={() => borrarProveedor(proveedor.id_proveedor)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/registrar_proveedor">
            <button
              type="submit"
              className="btn btn-primary btn-lg d-flex justify-content-start"
            >
              Registrar Proveedor
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

export default Proveedores;
