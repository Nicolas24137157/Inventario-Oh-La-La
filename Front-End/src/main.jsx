import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "/src/components/Menú/Menu.jsx";
import Platos_Menu from "/src/components/productos/Platos_Menu.jsx";
import Registrar_Producto from "./components/productos/Registrar_Producto.jsx";
import Editar_Producto from "./components/productos/Editar_Producto.jsx";
import Productos_Insumos from "/src/components/insumos/Productos_Insumos.jsx";
import Registrar_Insumo from "/src/components/insumos/Registrar_Insumo.jsx";
import Editar_Insumo from "/src/components/insumos/Editar_Insumo.jsx";
import Proveedores from "/src/components/proveedores/Proveedores.jsx";
import Registrar_Proveedor from "/src/components/proveedores/Registrar_Proveedor.jsx";
import Editar_Proveedor from "/src/components/proveedores/Editar_Proveedor.jsx";
import Ventas from "/src/components/Ventas/Ventas.jsx";
import Reservas from "/src/components/reservas/Reservas.jsx";
import Pedidos from "./components/pedidos/pedidos.jsx";
import Registrar_Pedidos from "./components/pedidos/Registrar_Pedidos.jsx";
import Registrar_Devoluciones from "./components/devoluciones/Registrar_Devoluciones.jsx";
import Seccion_Devoluciones from "./components/devoluciones/Seccion_Devoluciones.jsx";
import Mesas from "./components/mesas/Mesas.jsx";
import Registrar_Mesa from "./components/mesas/Registrar_Mesa.jsx";
import Editar_Mesa from "./components/mesas/Editar_Mesa.jsx";
import Registrar_Reservas from "./components/reservas/Registrar_Reservas.jsx";
import Registrar_Domicilios from "./components/pedidos/Registrar_Domicilios.jsx";
import Inventario from "./components/inventario/Inventario.jsx";
import Registrar_Datos_Inventario from "./components/inventario/Registrar_Datos_Inventario.jsx";
import Editar_Inventario from "./components/inventario/Editar_Inventario.jsx";
import Registrar_Pedido_Reserva from "./components/pedidos/Registrar_Pedido_Reserva.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "Menu",
    element: <Menu />,
  },

  {
    path: "platos_menu",
    element: <Platos_Menu />,
  },

  {
    path: "registrar_producto",
    element: <Registrar_Producto />,
  },

  {
    path: "editar_producto",
    element: <Editar_Producto />,
  },
 
  {
    path: "productos_insumos",
    element: <Productos_Insumos/>,
  },

  {
    path: "registrar_insumo",
    element: <Registrar_Insumo />,
  },

  {
    path: "editar_insumo",
    element: <Editar_Insumo />,
  },

  {
    path: "proveedores",
    element: <Proveedores/>,
  },
  
  {
    path: "registrar_proveedor",
    element: <Registrar_Proveedor />,
  },

  {
    path: "editar_proveedor",
    element: <Editar_Proveedor />,
  },
 


  {
    path: "ventas",
    element: <Ventas/>,
  },

  {
    path: "reservas",
    element: <Reservas/>,
  },

  {
    path: "pedidos",
    element: <Pedidos/>,
  },

  {
    path: "registrar_pedidos",
    element: <Registrar_Pedidos/>,
  },

  {
    path: "registrar_pedido_reservado",
    element: <Registrar_Pedido_Reserva/>,
  },

  {
    path: "registrar_domicilios",
    element: <Registrar_Domicilios/>,
  },

  {
    path: "devoluciones",
    element: <Registrar_Devoluciones/>,
  },

  {
    path: "seccion_registros",
    element: <Seccion_Devoluciones/>,
  },

  {
    path: "mesas",
    element: <Mesas/>,
  },

  {
    path: "registrar_mesa",
    element: <Registrar_Mesa/>,
  },

  {
    path: "editar_mesa",
    element: <Editar_Mesa/>,
  },

  {
    path: "registrar_reservas",
    element: <Registrar_Reservas/>,
  },

  {
    path: "inventario",
    element: <Inventario/>,
  },

  {
    path: "registrar_datos_inventario",
    element: <Registrar_Datos_Inventario/>,
  },
  
  {
    path: "editar_inventario",
    element: <Editar_Inventario/>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);
