// Logout.js (componente para gestionar el logout)
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div>
      <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Logout;