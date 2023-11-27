import React from 'react'
import "./Registrar_Producto.css"
import { useState,useEffect } from 'react'
import { postProducto } from './productos.service'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../navbar'
import { getInsumos } from '../insumos/insumos.service'


function Registrar_Producto() {

    const navigate = useNavigate()

    const [nombre_producto, setNombreProducto]  = useState ('')
    const [precio, setPrecio] = useState ('')
    const [descripcion_producto, setDescripcionProducto]  = useState ('')
    const [insumos, setInsumos]  = useState ([])
    const [nuevaCantidad, setNuevaCantidad]  = useState ('')
    const [selected_producto,setSelectedProducto] = useState('')
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        getInsumos().then((insumos) => setInsumos(insumos));
      }, []);
    

      console.log(insumos)
      const agregarDato = (e) => {
        e.preventDefault();
        const cantidadNumerica = parseFloat(nuevaCantidad);
        const producto_seleccionado =  insumos.find(elemento => elemento.id_insumos == selected_producto)
        console.log(cantidadNumerica)
        console.log("knknknkn")
        if (selected_producto !== '' && !isNaN(cantidadNumerica)) {
        setDatos([...datos, { nombre_insumo: producto_seleccionado.nombre_insumo,
                              id_insumos :producto_seleccionado.id_insumos,
                              cantidad: cantidadNumerica,
                 }]);
        setSelectedProducto('');
        setNuevaCantidad('');
        }
    };  

    console.log(datos)


    const handleEliminar = (index) => {
        // Crea una copia del array de datos
        const nuevosDatos = [...datos];
        // Elimina el elemento correspondiente al índice
        nuevosDatos.splice(index, 1);
        // Actualiza el estado con los nuevos datos
        setDatos(nuevosDatos);
    };
    

    async function handleClick (){


        const producto = JSON.stringify({ 
            nombre_producto: nombre_producto,
            descripcion: descripcion_producto,
            precio: precio,
            datos_insumos : datos
        })
        
        try{
            const data = await postProducto(producto);
            Swal.fire({
                    title: 'Plato De Comida Registrado Exitosamente',
                    icon: 'success',
            }).then(()=>{
                navigate("/platos_menu")
            })            
        } catch(e){
            Swal.fire({
                title: e,
                icon: 'error',
            })  
        }        
    }

    
    
  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
         {/* <!-- Header--> */}
         <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Registrar Producto</h1>
                    <p className="lead fw-normal text-white-50 mb-0">Registra el Producto Atráves del formulario</p>
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
                        
                        <legend className="text-center header "style={{position:'relative',left:'0px'}}>Registrar Producto</legend>
                        
                        <div className='formulario'>
                        <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                            <div className="col-md-8">
                            <label htmlFor="name">Nombre del Producto</label>
                                <input id="fname" name="name" type="text" placeholder="Nombre del Producto" className="form-control"
                                onChange={(e)=>{
                                    setNombreProducto(e.target.value)
                                }}/>
                                
                            </div>
                        </div>
                       
                        <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                            <div className="col-md-8">
                            <label htmlFor="name">Precio del Producto</label>
                                <input id="email" name="email" type="text" placeholder="Precio" className="form-control"
                                onChange={(e)=>{
                                    setPrecio(e.target.value)
                                }}/>

                            </div>
                        </div>

                        <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                            <div className="col-md-8">
                            <label htmlFor="name">Descripcion del Producto</label>
                                <input id="fname" name="name" type="text" placeholder="Descripción del Producto" className="form-control"
                                onChange={(e)=>{
                                    setDescripcionProducto(e.target.value)
                                }}/>
                                
                            </div>
                        </div>

                          {/* Formulario Pedido */}

                          <div className="container mt-5" style={{marginLeft:"5px"}}>
                        <h2 style={{ color: 'white' }}>Formulario de Insumos</h2>
                        <div className="row mt-3">
                            <div className="col-md-4    ">
                            <label>Selecciona Un Insumo:</label>

                                <select id="nInsumo" name="NombreInsumo" class="form-select" placeholder='Nombre Del Insumo'
                                    onChange={(e)=>{
                                    setSelectedProducto(e.target.value)
                                }} 
                                >
                                <option value='0'>Seleccione Un Insumo</option>
                                {insumos.map((producto) => (
                                    <option value={producto.id_insumos}>{producto.nombre_insumo}</option>
                                ))} 
                                </select>
            </div>
            <div className="col-md-4">
            <label>Cantidad:</label>
            <input
                className="form-control"
                type="number"
                value={nuevaCantidad}
                onChange={(e) => setNuevaCantidad(e.target.value)}
            />
            </div>
            <div className="col-md-4">
            <button className="btn btn-primary" onClick={agregarDato} style={{marginTop:"25px"}}>
                Agregar
            </button>
            </div>
        </div>

        <div className="row mt-3">
        <div className="col-md-8"> {/* Agrega esta línea para envolver la tabla en una columna */}
        <table className="table">
            <thead>
            <tr>
                <th scope="col-md-4">Insumo </th>
                <th scope="col-md-4">Cantidades</th>
                <th scope="col-md-4">Opciones</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
                <tbody>
            
                {datos.map((item, index) => (
                    
                    <tr key={index} >                   
                    <td> {item.nombre_insumo}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.precio_producto}</td>
                    <td>{item.cantidad_subtotal}</td>
                    <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => handleEliminar(index)} type="button" class="btn btn-primary" style={{ alignSelf: 'flex-end',backgroundColor:"black",borderColor:"black" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                        </svg>
                        {/* Borrar */}
                    </button>
                    </td>
                    </tr>
                ))}
                </tbody>
                
        </table>
        </div>
        </div>
        </div>
                        {/* Formulario Pedido */}

                        <div className="form-group">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-primary btn-lg1" onClick={(e) =>{
                                    e.preventDefault()
                                    handleClick()
                                }}>Registrar</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 text-center">
                              <Link to = '/platos_menu'> <button type="submit" className="btn btn-primary btn-lg1">Ir Atrás</button></Link> 
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

export default Registrar_Producto