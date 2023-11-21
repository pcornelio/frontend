import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import ListarUsuario from './Components/ListarUsuario';
import AgregarUsuario from './Components/AgregarUsuario';
import EditarUsuario from './Components/EditarUsuario';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/Login" element={<Login />} exact />
        <Route path="/ListarUsuarios" element={<ListarUsuario />} exact />
        <Route path="/AgregarUsuario" element={<AgregarUsuario />} exact />
        <Route path="/EditarUsuario/:id" element={<EditarUsuario />} exact />
      </Routes>
    </Router>
  );
}

export default App;
