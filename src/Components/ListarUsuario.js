import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Table, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import CustomModal from "./Utils/Modal";
import Logout from "./Logout";

const ListarUsuario = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7288/Usuario/List",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success, result, message } = response.data;

        if (success) {
          setUsers(result);
        } else {
          console.error("Error:", message);
        }
      } catch (error) {
        console.error("Error de red:", error.message);
      }
    };

    fetchUsers();
  }, [token]);

  const handleAddUserClick = () => {
    navigate("/AgregarUsuario");
  };

  const handleEditUserClick = (id) => {
    navigate(`/EditarUsuario/${id}`);
  };

  const handleDeleteUserClick = async (id) => {
    try {
      const response = await axios.post(
        "https://localhost:7288/Usuario/Delete/" + id,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, message } = response.data;

      if (success) {
        setModalMessage("¡Se eliminó el registro!");
        setShowModal(true);
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      } else {
        setModalMessage("¡No se pudo eliminar el registro!");
        setShowModal(true);
        console.error("Error al eliminar usuario:", message);
      }
    } catch (error) {
      setModalMessage("¡No se pudo eliminar el registro!");
      setShowModal(true);
      console.error("Error de red:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <Logout></Logout>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Usuarios</h2>
        <Button variant="success" onClick={handleAddUserClick}>
          Agregar Usuario
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{user.edad}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditUserClick(user.id)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUserClick(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal
        showModal={showModal}
        modalMessage={modalMessage}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default ListarUsuario;
