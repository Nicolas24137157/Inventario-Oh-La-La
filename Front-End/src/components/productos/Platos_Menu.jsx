
import React, { useState, useEffect } from "react";
import "./Platos_Menu.css";
import { Link } from "react-router-dom";
import { getProductos, deleteProducto } from "./productos.service";
import Swal from "sweetalert2";
import Navbar from '../../navbar';

function platos_Menu(props) {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProductos().then((productos) => setProductos(productos));
  }, []);

  const borrarProducto = (id_producto) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas borrar el plato del Menú?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(id_producto).then(() => {
          getProductos().then((productos) => setProductos(productos));
        });
      }
    });
  };

  const editarProducto = (id_producto) => {
    Swal.fire({
      title: "¿Quieres Editar Este Plato Del Menú?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./editar_producto?id_producto=" + id_producto;
      }
    });
  };

  
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
  
    // Actualizar el término de búsqueda
    setSearchTerm(searchTerm);
  
    // Si el término de búsqueda está vacío, restaura la lista completa de productos
    if (searchTerm === '') {
      getProductos().then((productos) => setProductos(productos));
    } else {
      // Filtrar productos por nombre_producto que coincida con el término de búsqueda letra por letra
      const filteredProductos = productos.filter(producto => {
        const nombreProducto = producto.nombre_producto.toLowerCase();
        return nombreProducto.includes(searchTerm) || searchTerm.split('').every(char => nombreProducto.includes(char));
      });
  
      setProductos(filteredProductos);
    }
  };

  return (
    <Navbar>
      <div className="animate__animated animate__fadeIn animate">
        {/* <!-- Header--> */}
        <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Platos del Menú</h1>
              <p className="lead fw-normal text-white-50 mb-0">
                Sección de Platos del Menú
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
              placeholder="Filtrar El Plato del Menú..."
              value={searchTerm}
              onChange={handleSearch}
            />
            
            <table className="table table-bordered table-hover text-center border border-4 ">
              <thead className="table-light">
                <tr>
                  <th colSpan="6">
                    <h2 className="text-start">Platos Del Menú</h2>
                  </th>
                </tr>
                <tr>
                  <th>ID del Producto</th>
                  <th>Nombre del Producto</th>
                  <th>Precio</th>
                  <th>Descripción del Producto</th>
                  <th style={{ width: "160px" }}>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td>{producto.id_producto}</td>
                    <td>{producto.nombre_producto}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.descripcion}</td>
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

            <Link to="/registrar_producto">
              <button
                type="submit"
                className="btn btn-primary btn-lg d-flex justify-content-start"
              >
                Registrar Producto
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

          {/* <!-- Footer--> */}
          <footer className="py-5 bg-dark">
            <div className="container">
              <p className="m-0 text-center text-white">
                Copyright &copy; Restaurante Oh La Lá
              </p>
            </div>
          </footer>
        </div>
      </div>
    </Navbar>
  );
}

export default platos_Menu;
