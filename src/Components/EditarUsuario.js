import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import CustomModal from "./Utils/Modal";

const EditarUsuario = () => {
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
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7288/Usuario/GetById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success, result, message } = response.data;

        if (success) {
          setUsuario(result);
        } else {
          console.error("Error al obtener el usuario:", message);
        }
      } catch (error) {
        setModalMessage("¡No se pudo actualizar el registro!");
        setShowModal(true);
        console.error("Error de red:", error.message);
      }
    };

    fetchUsuario();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://localhost:7288/Usuario/Modify/${id}`,
        usuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, message } = response.data;

      if (success) {
        setModalMessage("¡Se actualizó el registro!");
        setShowModal(true);
      } else {
        setModalMessage("¡No se pudo actualizar el registro!");
        setShowModal(true);
        console.error("Error:", message);
      }
    } catch (error) {
      setModalMessage("¡No se pudo actualizar el registro!");
      setShowModal(true);
      console.error("Error de red:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Usuario</h2>
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
          Actualizar Usuario
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

export default EditarUsuario;
