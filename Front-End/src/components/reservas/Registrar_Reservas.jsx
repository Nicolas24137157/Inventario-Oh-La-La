import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { postReservaMesas } from './registrar_reservas.service'
import { getMesas } from '../mesas/mesas.service'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { format } from 'date-fns';
import Navbar from '../../navbar'

function Registrar_Reservas() {

    
    const [nombre_cliente, setNombreCliente] = useState ('')
    const [tipo_identificacion, setTipoIdentificacion] = useState ('')
    const [identificacion, setIdentificacion] = useState ('')
    const [celular, setCelular] = useState ('')
    const [correo, setCorreo] = useState ('')
    const [mesas, setMesas] = useState([])
    const [escoger_mesa, setEscogerMesa]  = useState ('')
    const [fechaFormateada, setFechaFormateada] = useState(null); 
    
    
    
    useEffect(()=>{
        getMesas().then( mesas => setMesas(mesas))   
      },[])

      useEffect(() => {
        
        setFechaFormateada(fechaFormateada);
      }, []);
      
    function handleClick (){
        const Reserva_Mesas = JSON.stringify({ 
            nombre_cliente: nombre_cliente,
            hora_reserva:fechaFormateada,
            identificacion:identificacion,  
            tipo_identificacion:tipo_identificacion,
            celular:celular,
            correo:correo,
            numero_mesa:escoger_mesa
        })
        
        postReservaMesas(Reserva_Mesas)
       
        .then((res) =>{
            if (res == 0) {
                Swal.fire({
                    title: 'No Hay Disponibilidad',
                    icon: 'error',
            }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/registrar_reservas';
                }
            });
            }else {
                
                Swal.fire({
                    title: 'Reserva Exitosamente',
                    icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/reservas';
                }
            });
            }
           
    });
    }

  return (
    <Navbar>
    <div className= "animate__animated animate__fadeIn animate">
        {/* <!-- Header--> */}
    <header class="bg-dark py-5">
       <div class="container px-4 px-lg-5 my-5">
           <div class="text-center text-white">
               <h1 class="display-4 fw-bolder">Registrar Reserva</h1>
               <p class="lead fw-normal text-white-50 mb-0">Sección de Registro La Mesa De La Persona</p>
           </div>
       </div>
   </header>

        {/* <!-- Formulario--> */}

   <div class="container">
<div class="row">
   <div class="col-md-12">
       <div class="well well-sm">
           <form class="form-horizontal" method="post">
               <fieldset>
                   <legend class="text-center header"style={{position:'relative',left:'0px'}}>Registrar Reservas</legend>
                   
                   <div className='formulario'>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Nombre De La Persona</label>
                           <input id="email" name="email" type="text" placeholder="Nombre De La Persona" class="form-control"
                             onChange={(e)=>{
                                setNombreCliente(e.target.value)
                            }}
                           />
                       </div>
                   </div>

                   <div class="form-group">
                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                    <div class="col-md-8">
                        <label htmlFor="unidadMedida">Tipo de Identificación</label>
                        <select id="unidadMedida" name="Tipo de Identificación" class="form-control"
                            onChange={(e)=>{
                                setTipoIdentificacion(e.target.value)
                            }}
                        >
                            <option value='0'>Seleccione El Tipo De Identificación</option>
                            <option value="CC">Cedúla (C.C) o Contraseña</option>
                            <option value="TI">Tarjeta De Identidad (T.I)</option>
                            
                        </select>
                    </div>
                </div>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">N° De Identificación</label>
                           <input id="identificacion" name="identificacion" type="text" placeholder="N° De Identificación" class="form-control"
                            onChange={(e)=>{
                                setIdentificacion(e.target.value)
                            }}
                           />
                       </div>
                   </div>


                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Celular</label>
                           <input id="celular" name="celular" type="text" placeholder="Celular" class="form-control"
                             onChange={(e)=>{
                                setCelular(e.target.value)
                            }}
                            />
                       </div>
                   </div>

                  

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Correo</label>
                           <input id="email" name="email" type="email" placeholder="Correo" class="form-control"
                           onChange={(e)=>{
                            setCorreo(e.target.value)
                        }}
                           />
                       </div>
                   </div>

                   <div class="form-group">
                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                    <div class="col-md-8">
                        <label htmlFor="unidadMedida">Número De Mesa</label>
                        <select id="unidadMedida" name="Tipo de Identificación" class="form-control" placeholder='Número De Mesa'
                           onChange={(e)=>{
                            setEscogerMesa(e.target.value)
                        }} 
                        >
                        <option value='0'>Seleccione una Mesa</option>
                        {mesas.map((mesa) => (
                            <option value={mesa.id_mesa}>Mesa {mesa.numero_mesa}, Capacidad de {mesa.capacidad} Personas</option>
                        ))}
                        </select>
                    </div>
                </div>

                    <div class="form-group">
                      <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                      <div class="col-md-8">
                          <label htmlFor="name">Fecha y Hora De La Reserva (Día / Fecha / Año)</label>
                          <input id="datetime" name="datetime" type="datetime-local" class="form-control"
                          onChange={(e)=>{
                            setFechaFormateada(e.target.value)
                        }}
                          />
                      </div>
                   </div> 


                  
                

                   

                   <div class="form-group">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-primary btn-lg1" onClick={(e) =>{
                                    e.preventDefault()
                                    handleClick()
                                }}>Registrar</button>
                            </div>
                        </div>


                   <div class="form-group">
                            <div class="col-md-12 text-center">
                              <Link to = '/reservas'> <button type="submit" class="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
                            </div>
                        </div>

                   </div>

                   
               </fieldset>
           </form>
       </div>
   </div>
</div>
</div>
{/* <!-- Footer--> */}
<footer class="py-5 bg-dark">
       <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Restaurante Oh La Lá</p></div>
   </footer>

    </div>
    </Navbar>
  )
}

export default Registrar_Reservas