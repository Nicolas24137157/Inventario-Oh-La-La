import React, { useEffect } from 'react'
import "./Editar_Proveedor.css"
import { useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { getProveedorById, updateProveedor } from './proveedores.services'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import Navbar from '../../navbar'

function Editar_Proveedor() {

    const [queryParameters] = useSearchParams()
    const [id_proveedor, setIdProveedor]  = useState ('')
    const [NIT, setNIT]  = useState ('')
    const [nombre_proveedor, setNombreProveedor]  = useState ('')
    const [celular, setCelular] = useState ('')
    const [direccion, setDireccion]  = useState ('')

    useEffect(()=>{
        console.log(queryParameters.get('id_proveedor'))
        getProveedorById(queryParameters.get('id_proveedor')).then(proveedor => {
            setIdProveedor(proveedor.id_proveedor)
            setNIT(proveedor.NIT)
            setNombreProveedor(proveedor.nombre_proveedor)
            setCelular(proveedor.celular)
            setDireccion(proveedor.direccion)
        })
    },[])    

    
    function handleClick (){
        const proveedor = JSON.stringify({ 
            id_proveedor:id_proveedor,
            NIT:NIT,           
            nombre_proveedor:nombre_proveedor,
            celular:celular,
            direccion:direccion
        })
        updateProveedor(id_proveedor, proveedor).then( res => {
            // console.log(res)
            Swal.fire({
                title: 'Datos Del Proveedor Actualizados Correctamente',
                icon: 'success',
              }).then((result) => {
                if (result.isConfirmed) {
                  // Redirige al componente Platos_Menu
                  window.location.href = '/proveedores';
                }
              });
            });    
            
        
    }



  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
    {/* <!-- Header--> */}
    <header className="bg-dark py-5">
       <div className="container px-4 px-lg-5 my-5">
           <div className="text-center text-white">
               <h1 className="display-4 fw-bolder">Editar Proveedor</h1>
               <p className="lead fw-normal text-white-50 mb-0">Edita y Actualiza los datos del Proveedor Atráves del formulario</p>
           </div>
       </div>
   </header>

   {/* <!-- Formulario--> */}

   <div className="container">
<div className="row">
   <div className="col-md-12">
       <div className="well well-sm">
           <form className="form-horizontal" method="post">
               <fieldset>
                   <legend className="text-center header" style={{position:'relative',left:'0px'}}>Editar Proveedor</legend>
                   
                   <div className='formulario'>

                   <div className="form-group">
                       <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                       <div className="col-md-8">
                       <label htmlFor="name">NIT</label>
                           <input id="lname" name="name" type="text" placeholder="NIT   " className="form-control"
                           value={NIT}
                           onChange={(e)=>{
                                    setNIT(e.target.value)
                                }}/>
                       </div>
                   </div>

                   <div className="form-group">
                       <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                       <div className="col-md-8">
                       <label htmlFor="name">Nombre del Proveedor</label>
                           <input id="fname" name="name" type="text" placeholder="Nombre del Proveedor" className="form-control"
                           value={nombre_proveedor}
                           onChange={(e)=>{
                                    setNombreProveedor(e.target.value)
                                }}/>
                       </div>
                   </div>
                  

                   <div className="form-group">
                       <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                       <div className="col-md-8">
                       <label htmlFor="name">Celular</label>
                           <input id="email" name="email" type="text" placeholder="Celular" className="form-control"
                           value={celular}
                           onChange={(e)=>{
                                    setCelular(e.target.value)
                                }}/>
                       </div>
                   </div>

                   <div className="form-group">
                       <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                       <div className="col-md-8">
                        <label htmlFor="name">Dirección</label>
                           <input id="direccion" name="direccion" type="text" placeholder="Dirección" className="form-control"
                            value={direccion}
                            onChange={(e)=>{
                                     setDireccion(e.target.value)
                                 }}/>
                       </div>
                   </div>

                   

                   <div className="form-group">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-primary btn-lg1" onClick={(e) =>{
                                    e.preventDefault()
                                    handleClick()
                                }}>Actualizar</button>
                            </div>
                     </div>

                     <div className="form-group">
                            <div className="col-md-12 text-center">
                              <Link to = '/proveedores'> <button type="submit" className="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
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
<footer className="py-5 bg-dark">
       <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Restaurante Oh La Lá</p></div>
   </footer>


</div>
</Navbar>
  )
}

export default Editar_Proveedor

