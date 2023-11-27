import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {getReservasMesas, updateEstadoReservasMesas} from './registrar_reservas.service'
import Swal from 'sweetalert2';
import Navbar from '../../navbar';


function Reservas() {

  const [reservas, setReservas] = useState([])
  
  console.log(reservas)
  const [updates, setUpdates] = useState(0)

  useEffect(()=>{
    getReservasMesas().then( reservas => setReservas(reservas))   
  },[])
  
  const handleClickEstado = (id_reservas_mesas, estadoActual) => {
    const estados = {
      'Pendiente': 'Pendiente',
      'Finalizada': 'Finalizada',
      'Cancelado': 'Cancelado',
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
        console.log(id_estado, id_reservas_mesas);
        // Llama a la función para actualizar el estado en la base de datos
        updateEstadoReservasMesas(id_reservas_mesas, id_estado)
          .then(() => {
            // Actualiza el estado localmente en la lista de reservas
            getReservasMesas().then( reservas => setReservas(reservas)
              
            );
  
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
    <div className="animate__animated animate__fadeIn animate">
        {/* <!-- Header--> */}
       <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Reservas</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Sección de Reservas
            </p>
          </div>
        </div>
      </header>

  
<div className="container mt-5" style={{ marginTop: '30px' }}>
  <div className="table table-responsive border-dark ">
    <table className="table table-bordered table-hover text-center border border-4 ">
      <thead className="table-light">
        <tr>
          <th colSpan="6">
            <h2 className="text-start ">Reservas</h2>
          </th>
        </tr>
        <tr>
          <th>Identificación</th>
          <th>Nombre de la Persona</th>
          <th>Celular</th>
          <th>N° Mesa</th>
          <th>Fecha y Hora De La Reserva</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map( reserva =>                   
          <tr key={reserva.id_reserva}>
            <td>{reserva.identificacion}</td>
            <td>{reserva.nombre_cliente}</td>
            <td>{reserva.celular}</td>
            <td>{reserva.numero_mesa}</td>
            <td>{reserva.hora_reserva}</td>
            <td>
              <button
                className="btn btn-link"
                onClick={() => handleClickEstado(reserva.id_reserva, reserva.estado)}>
                  {reserva.estado}
              </button>
            </td>
          </tr>
      )}
      </tbody>
    </table>

    <Link to="/registrar_reservas">
      <button type="button" className="btn btn-primary btn-lg d-flex justify-content-start">
        Registrar Reserva
      </button>{" "}
    </Link>

    <Link to="/Menu">
      <button type="submit" className="btn btn-primary btn-lg d-flex justify-content-start" style={{ marginTop: '30px' }}>
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

export default Reservas