import React from 'react'
import { useState } from 'react'
import { postProveedor } from './proveedores.services'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../navbar'

function Registrar_Proveedor() {

    const [nit_proveedor, setNitProveedor]  = useState ('')
    const [nombre_proveedor, setNombreProveedor]  = useState ('')
    const [celular, setCelular] = useState ('')
    const [direccion, setDireccion]  = useState ('')

    function handleClick (){
        const proveedor = JSON.stringify({
            nit_proveedor:nit_proveedor,
            nombre_proveedor: nombre_proveedor,
            celular: celular,
            direccion: direccion
            

        })
        // postProveedor(proveedor).then(res => console.log(res))
        postProveedor(proveedor)
        .then((res) =>{
            Swal.fire({
                title: 'Proveedor Registrado Exitosamente',
                icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/proveedores';
            }
        });
    });
        
    }

    

  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
    {/* <!-- Header--> */}
    <header class="bg-dark py-5">
       <div class="container px-4 px-lg-5 my-5">
           <div class="text-center text-white">
               <h1 class="display-4 fw-bolder">Registrar Proveedor</h1>
               <p class="lead fw-normal text-white-50 mb-0">Registra los datos del Proveedor Atráves del formulario</p>
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
                   <legend class="text-center header"style={{position:'relative',left:'0px'}}>Registrar Proveedor</legend>
                   
                   <div className='formulario'>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-user bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">NIT</label>
                           <input id="lname" name="name" type="text" placeholder="NIT" class="form-control"
                           onChange={(e)=>{
                                    setNitProveedor(e.target.value)
                                }}/>
                       </div>
                   </div>


                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-user bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Nombre del Proveedor</label>
                           <input id="fname" name="name" type="text" placeholder="Nombre del Proveedor" class="form-control"
                           onChange={(e)=>{
                            setNombreProveedor(e.target.value)
                        }}/>
                       </div>
                   </div>
                   
                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Celular</label>
                           <input id="email" name="email" type="text" placeholder="Celular" class="form-control"
                           onChange={(e)=>{
                            setCelular(e.target.value)
                        }}/>
                       </div>
                   </div>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                        <label htmlFor="name">Dirección</label>
                           <input id="email" name="email" type="text" placeholder="Dirección" class="form-control"
                           onChange={(e)=>{
                            setDireccion(e.target.value)
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
                              <Link to = '/proveedores  '> <button type="submit" class="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
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

export default Registrar_Proveedor