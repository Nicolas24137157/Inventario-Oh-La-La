import React, { useEffect,useState } from 'react'
import "./Editar_Insumo.css"
import { useSearchParams } from "react-router-dom"
import { getInsumoById, updateInsumo } from './insumos.service'
import { Link } from 'react-router-dom'
import Navbar from '../../navbar'




function Editar_Insumo() {
    // const nombre_insumo = ''
    // const cantidad = ''
    // const fecha_caducidad = ''

    const [queryParameters] = useSearchParams()
    const [id_insumos, setIdInsumo]  = useState ('')
    const [nombre_insumo, setNombreInsumo]  = useState ('')

    useEffect(()=>{
        console.log(queryParameters.get('id_insumos'))
        getInsumoById(queryParameters.get('id_insumos')).then(insumo => {
            setIdInsumo(insumo.id_insumos)
            setNombreInsumo(insumo.nombre_insumo)
        })
    },[])    

    function handleClick (){
        const insumo = JSON.stringify({            
            nombre_insumo:nombre_insumo,
        })
        updateInsumo(id_insumos, insumo).then( res => {
            console.log(res)
            
        })
    }
    
    

  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
    {/* <!-- Header--> */}
    <header className="bg-dark py-5">
       <div className="container px-4 px-lg-5 my-5">
           <div className="text-center text-white">
               <h1 className="display-4 fw-bolder">Editar Insumo</h1>
               <p className="lead fw-normal text-white-50 mb-0">Edita y Actualiza el Insumo Atráves del formulario</p>
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
                   <legend className="text-center header"style={{position:'relative',left:'0px'}}>Editar Insumo</legend>
                   
                   <div className='formulario'>
                   <div className="form-group">
                       <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                       <div className="col-md-8">
                       <label htmlFor="name">Nombre del Insumo</label>
                           <input id="fname" name="name" type="text" placeholder="Nombre del Insumo" className="form-control"
                           value={nombre_insumo}
                           onChange={(e)=>{
                                    setNombreInsumo(e.target.value)
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
                              <Link to = '/productos_insumos'> <button type="submit" className="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
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

export default Editar_Insumo