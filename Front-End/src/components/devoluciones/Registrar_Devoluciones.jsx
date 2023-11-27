import React from "react";
import "./Registrar_Devoluciones.css";
import { Link } from "react-router-dom";
import Navbar from "../../navbar";
import { useEffect,useState } from "react";
import { getventas } from "../Ventas/ventas.service";
import { postDevolucion } from "./devoluciones.service";
import Swal from 'sweetalert2'
//import { da } from "date-fns/locale";


function Registrar_Devoluciones() {

  const [ventas, setVentas] = useState([])
  const [selectventas, setSelectVentas] = useState('')
  const [observacion, setObservacion] = useState('')
  
  useEffect(()=>{
    getventas().then( ventas => setVentas(ventas))   
  },[])

  async function handleClick (){
    console.log(observacion + "jkjkjnnn")
    const datos = ventas.find(x=> x.numero_etiqueta == selectventas)
    console.log(datos)
    const devoluciones = JSON.stringify({ 
        observacion: observacion,
        identificacion:datos.identificacion,
        numero_etiqueta: datos.numero_etiqueta,
        id_producto: datos.id_producto

    })

  try{
    const data = await postDevolucion(devoluciones);
    Swal.fire({
            title: 'Devolucion Registrada Exitosamente',
            icon: 'success',
    }).then(()=>{
        navigate("/pedidos")
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
            <h1 className="display-4 fw-bolder">Devoluciones</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Sección de Devoluciones
            </p>
          </div>
        </div>
      </header>

      <div className="container">
        {/* <h1 class="display-4 fw-bolder">Registar Devolución</h1> */}
        <legend
          class="text-center header"
          style={{ position: "relative", left: "0px" }}
        >
          Registrar Devolución
        </legend>
        <div className="row">
          <div className="col-md-6">
            <div className="well well-sm">
              <form className="form-horizontal" method="post">
                <fieldset className="fieldset1">
                  <legend className="text-center header">
                    Devolución de Plato del Menú (Producto)
                  </legend>

                  <div className="form-group">
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        id="messageMenu"
                        name="messageMenu"
                        placeholder="Escriba el motivo por el cuál hace devolución del plato del Menú "
                        rows="7"
                        onChange={(e)=>{
                          setObservacion(e.target.value)}}
                      ></textarea>
                    </div>
                  </div>

                  <div class="form-group">
                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                    <div class="col-md-8">
                        <label htmlFor="unidadMedida">Seleccione La Venta</label>
                        <select id="unidadMedida" name="Tipo de Identificación" class="form-control"
                            onChange={(e)=>{
                                setSelectVentas(e.target.value)
                            }}
                        >
                            <option value='0'>Seleccione La Venta</option>
                            {ventas.map((venta) => (
                            <option value={venta.numero_etiqueta}>{venta.identificacion}{venta.fecha_venta}{venta.nombre_cliente}</option>
                        ))}
                            
                        </select>
                    </div>
                </div>


                  {/* me toca realizar en esta seccion un despegable con los platos del menú que tengo registrados hasta el momento y sea seleccionable */}

                  <div className="form-group">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-primary btn-lg1" onClick={(e) =>{
                                    e.preventDefault()
                                    handleClick()
                                }}>Enviar</button>
                            </div>
                        </div>
                
                </fieldset>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="well well-sm">
              <form className="form-horizontal" method="post">
                <fieldset className="fieldset2">
                  <legend id="insumotitulo" className="text-center header">
                    Devolución del Insumo
                  </legend>

                  <div>
                    <div className="form-group">
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          id="messageInsumo"
                          name="messageInsumo"
                          placeholder="Escriba el motivo por el cuál hace devolución de uno o varios insumos"
                          rows="7"
                          onChange={(e)=>{
                            setObservacion(e.target.value)
                        }}
                        ></textarea>
                      </div>
                    </div>

                    
                    <div className="form-group">
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          id="insumoDevolver"
                          name="insumoDevolver"
                          placeholder="Insumo(s) a devolver"
                          rows="7"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          id="cantidadDevolver"
                          name="cantidadDevolver"
                          placeholder="Cantidad a devolver del insumo(s)"
                          rows="7"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary">
                      
                      Enviar
                    </button>
                  </div>

                  <Link to="/Menu">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg d-block mx-auto"
                      style={{marginTop:'30px'}}
                    >
                      Ir Atrás
                    </button>
                  </Link>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group"></div>

      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Restaurante Oh La Lá
          </p>
        </div>
      </footer>
    </div>
    </Navbar>
  );
}

export default Registrar_Devoluciones;
