import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import CustomModal from "./Utils/Modal";

const AgregarUsuario = () => {

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    password: "",
    edad: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/ListarUsuarios");
  };

  const token = Cookies.get("token");

  if (!token) {
    navigate("/");
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7288/Usuario/Create",
        usuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, result, message } = response.data;

      if (success) {
        // Éxito al crear el usuario, puedes redirigir a la lista de usuarios u hacer algo más
        navigate("/ListarUsuarios");
      } else {
        // Maneja la respuesta en caso de error
        console.error("Error:", message);
      }
    } catch (error) {
      // Maneja errores de la solicitud
      console.error("Error de red:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa el correo"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa la contraseña"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEdad">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa la edad"
            name="edad"
            value={usuario.edad}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Usuario
        </Button>
      </Form>
      <CustomModal
        showModal={showModal}
        modalMessage={modalMessage}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default AgregarUsuario;
