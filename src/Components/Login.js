// src/components/Login.js
import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal, Button } from "react-bootstrap"; // Importa los componentes de Bootstrap necesarios

axios.defaults.withCredentials = true;
const Login = () => {
  const [credentials, setCredentials] = useState({ correo: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleModalClose = () => {
    setShowModal(false);
    const token = Cookies.get('token');
    if(token){
      navigate('/ListarUsuarios');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7288/Usuario/Login",
        {
          correo: credentials.correo,
          password: credentials.password,
        }
      );

      const { success, result, message } = response.data;

      if (success) {
        Cookies.set("token", result, { expires: 7 });
        setModalMessage("¡Login Exitoso!");
        setShowModal(true);
        
      } else {
        Cookies.remove("token");
        setModalMessage("Login Incorrecto!");
        setShowModal(true);
        console.error("Error:", message);
      }
    } catch (error) {
      setModalMessage("Login Incorrecto!");
      setShowModal(true);
      console.error("Error de red:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                type="text"
                className="form-control"
                id="correo"
                name="correo"
                value={credentials.correo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
