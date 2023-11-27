import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getMesaById, updateMesa } from './mesas.service';
import { Link } from 'react-router-dom';
import Navbar from '../../navbar';
import Swal from 'sweetalert2';

function Editar_Mesa() {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const [id_mesa, setIdMesa] = useState('');
    const [numero_mesa, setNumero_Mesa] = useState('');
    const [capacidad, setCapacidad] = useState('');

    useEffect(() => {
        console.log(queryParameters.get('id_mesa'));
        getMesaById(queryParameters.get('id_mesa')).then((mesa) => {
            setIdMesa(mesa.id_mesa);
            setNumero_Mesa(mesa.numero_mesa);
            setCapacidad(mesa.capacidad);
        });
    }, []);

    async function handleClick() {
        const mesa = JSON.stringify({
            numero_mesa: numero_mesa,
            capacidad: capacidad,
        });
        try {
            const data = await updateMesa(id_mesa, mesa);
            Swal.fire({
                title: 'Mesa Actualizada Exitosamente',
                icon: 'success',
            }).then(() => {
                navigate('/mesas');
            });
        } catch (e) {
            Swal.fire({
                title: e,
                icon: 'error',
            });
        }
    }




  return (
    <Navbar>
      <div className="animate__animated animate__fadeIn animate">
    {/* <!-- Header--> */}
    <header class="bg-dark py-5">
       <div class="container px-4 px-lg-5 my-5">
           <div class="text-center text-white">
               <h1 class="display-4 fw-bolder">Editar mesa</h1>
               <p class="lead fw-normal text-white-50 mb-0">Edita y Actualiza la mesa y su capacidad Atráves del formulario</p>
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
                   <legend class="text-center header"style={{position:'relative',left:'0px'}}>Editar mesa</legend>
                   
                   <div className='formulario'>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Número De La Mesa</label>
                           <input id="email" name="email" type="text" placeholder="Número De La Mesa" class="form-control"
                           value={numero_mesa}
                                onChange={(e)=>{
                                 setNumero_Mesa(e.target.value)
                                }}/>
                       </div>
                   </div>

                   <div class="form-group">
                       <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-user bigicon"></i></span>
                       <div class="col-md-8">
                       <label htmlFor="name">Capacidad De La Mesa (Personas)</label>
                           <input id="fname" name="name" type="text" placeholder="capacidad De La Mesa" class="form-control"
                           value={capacidad}
                           onChange={(e)=>{
                                setCapacidad(e.target.value)
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
                            
                        <div class="form-group">
                            <div class="col-md-12 text-center">
                              <Link to = '/Mesas'> <button type="submit" class="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
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

export default Editar_Mesa