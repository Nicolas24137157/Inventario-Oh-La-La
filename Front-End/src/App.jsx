// 
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/menu", { replace: true });
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: user,
        password: password
      })
    };
    try {
      const res = await fetch('http://127.0.0.1:3000/login/', requestOptions);
      if (res.status === 200) {
        const token = await res.json();
        localStorage.setItem("token", token);
        // Muestra un mensaje de bienvenida con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido(a)!',
          text: 'Inicio de sesión exitoso',
        }).then(() => {
          // Redirige al componente de Menú
          navigate("/menu", { replace: true });
        });
      } else {
        // Muestra una alerta de SweetAlert2 cuando las credenciales no son válidas
        Swal.fire({
          icon: 'error',
          title: 'Error De Inicio De Sesión',
          text: 'Usuario o Contraseña Incorrecta',
        });
      }
    } catch (e) {
      console.log("error");
    }
  }

  return (
    <div className="d-lg-flex half ">
      <div className="bg order-1 order-md-2"></div>
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <form className='formulario'>
                <div className="form-group first">
                  <h3>Bienvenido Al Sistema de Inventario del Restaurante Oh La Lá</h3>
                  <label className='userps' htmlFor="username">Usuario</label>
                  <input type="text" className="form-control" placeholder="Usuario" id="username" value={user} onChange={e => setUser(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className='userps' htmlFor="password" value={password}>Contraseña</label>
                  <input type="password" className="form-control" placeholder="Contraseña" id="password" onChange={e => setPassword(e.target.value)} />
                  <input type="submit" value="Ingresar" className="btn btn-block btn-primary" style={{ marginTop: '20px' }} onClick={login} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
