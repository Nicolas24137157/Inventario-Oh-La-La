import React from 'react'
import { Link } from 'react-router-dom'
import { postMesa } from './mesas.service'
import { useState } from 'react'
import Swal from 'sweetalert2'

function Registrar_Mesa() {

    const [numero_mesa, setNumeroMesa]  = useState ('')
    const [capacidad, setCapacidad] = useState ('')
    

    function handleClick (){
        const mesa = JSON.stringify({ 
            numero_mesa: numero_mesa,
            capacidad: capacidad
        })
        
        
        postMesa(mesa)
       
        .then((res) =>{
            Swal.fire({
                title: 'Mesa Registrada Exitosamente',
                icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/mesas';
            }
        });
    });
    }
    

  return (
    <div className="animate__animated animate__fadeIn animate">
    {/* <!-- Header--> */}
    <header class="bg-dark py-5">
       <div class="container px-4 px-lg-5 my-5">
           <div class="text-center text-white">
               <h1 class="display-4 fw-bolder">Registrar Mesa</h1>
               <p class="lead fw-normal text-white-50 mb-0">Registra La Mesa De La Persona</p>
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
                   <legend class="text-center header"style={{position:'relative',left:'0px'}}>Registrar Mesas</legend>
                   
                   <div className='formulario'>
                  

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Número De La Mesa</label>
                           <input id="email" name="email" type="text" placeholder="Número De La Mesa" class="form-control"
                             onChange={(e)=>{
                                setNumeroMesa(e.target.value)
                            }}
                           />
                       </div>
                   </div>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Capacidad De La Mesa (Personas)</label>
                           <input id="email" name="email" type="text" placeholder="Capacidad De La Mesa" class="form-control"
                             onChange={(e)=>{
                                setCapacidad(e.target.value)
                            }}/>
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
                              <Link to = '/mesas'> <button type="submit" class="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
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
  )
}

export default Registrar_Mesa