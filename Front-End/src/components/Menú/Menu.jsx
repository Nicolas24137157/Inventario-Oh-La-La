import React from 'react'
import plato_comida from '@assets/plato_comida.jpg'
import insumo from '@assets/insumos.jpg'
import proveedores from '@assets/Proveedores.jpg'
import ventas from '@assets/ventas_comidas.jpg'
import reservas_mesas from '@assets/registro_mesas.jpeg'
import pedidos from '@assets/pedidos_comida.jpg'
import devoluciones from '@assets/devoluciones.jpg'
import seccion_registro from '@assets/seccion_registro.jpeg'
import registro_mesas from '/src/assets/reservamesarestaurante.jpg'
import inventario_insumos from '/src/assets/inventario.jpg'
import { Link } from 'react-router-dom'
import './Menu.css'
import Navbar from '../../navbar'




function Menu() {
  return (
    <Navbar>
    <div className="animate__animated animate__fadeIn animate">
        
        {/* <!-- Header--> */}
        
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Menú del Inventario del Restaurante Oh La Lá</h1>
                    <p className="lead fw-normal text-white-50 mb-0">Elige una opción</p>
                </div>
            </div>
        </header>
        {/* <!-- Section--> */}
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={plato_comida} alt="Plato_Comida" />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Productos del Menú</h5>
                                    {/* <!-- Product price--> */}
                                    {/* $40.00 - $80.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                               <Link to='/platos_menu'> <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Sale badge--> */}
                            {/* <div className="badge bg-dark text-white position-absolute" >Sale</div> */}
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={insumo} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Insumos</h5>
                                    {/* <!-- Product reviews--> */}
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    {/* <!-- Product price--> */}
                                    {/* <span className="text-muted text-decoration-line-through">$20.00</span> */}
                                    {/* $18.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <Link to = '/productos_insumos'><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Sale badge--> */}
                            {/* <div className="badge bg-dark text-white position-absolute" >Sale</div> */}
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={proveedores} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Proveedores</h5>
                                    {/* <!-- Product price--> */}
                                    {/* <span className="text-muted text-decoration-line-through">$50.00</span> */}
                                    {/* $25.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <Link to='/proveedores'><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={ventas} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Ventas</h5>
                                    {/* <!-- Product reviews--> */}
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    {/* <!-- Product price--> */}
                                    {/* $40.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                              <Link to = '/ventas'> <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Product image--> */}
                             <img className="card-img-top" src={reservas_mesas} alt="..." /> 
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                  <h5 className="fw-bolder">Registro de Mesas</h5>
                                    {/* <!-- Product reviews--> */}
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    {/* <!-- Product price--> */}
                                    {/* $40.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <Link to ="/mesas"><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Sale badge--> */}
                            {/* <div className="badge bg-dark text-white position-absolute">Sale</div> */}
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={registro_mesas} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Reservas</h5>
                                    {/* <!-- Product price--> */}
                                    {/* <span className="text-muted text-decoration-line-through">$50.00</span> */}
                                    {/* $25.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                               <Link to = '/reservas'> <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Sale badge--> */}
                            {/* <div className="badge bg-dark text-white position-absolute">Sale</div> */}
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={pedidos} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Pedidos</h5>
                                    {/* <!-- Product price--> */}
                                    {/* <span className="text-muted text-decoration-line-through">$50.00</span> */}
                                    {/* $25.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                              <Link to = '/pedidos'>  <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>

                   
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Sale badge--> */}
                            {/* <div className="badge bg-dark text-white position-absolute" >Sale</div> */}
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={devoluciones} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 className="fw-bolder">Sección de Registro De Devoluciones</h5>
                                    {/* <!-- Product reviews--> */}
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    {/* <!-- Product price--> */}
                                    {/* <span className="text-muted text-decoration-line-through">$20.00</span> */}
                                    {/* $18.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <Link to = "/devoluciones"><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={seccion_registro} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                  <h5 className="fw-bolder">Devoluciones</h5>
                                    {/* <!-- Product reviews--> */}
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    {/* <!-- Product price--> */}
                                    {/* $40.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <Link to ="/seccion_registros"><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col mb-5">
                        <div className="card h-100">
                            {/* <!-- Product image--> */}
                            <img className="card-img-top" src={inventario_insumos} alt="..." />
                            {/* <!-- Product details--> */}
                            <div className="card-body p-4">
                                <div className="text-center">
                                    {/* <!-- Product name--> */}
                                  <h5 className="fw-bolder">Inventario de Insumos</h5>
                                    {/* <!-- Product reviews--> */}
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    {/* <!-- Product price--> */}
                                    {/* $40.00 */}
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <Link to ="/inventario"><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Ingresar</a></div></Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
        {/* <!-- Footer--> */}
        <footer className="py-5 bg-dark mt-4">
            <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; Restaurante Oh La Lá</p>
            </div>
        </footer>

        
    </div>
    </Navbar>
  )
}


export default Menu