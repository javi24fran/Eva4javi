import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase'; // Importamos la instancia de autenticación de Firebase


export default function Home() {
  // Definimos los estados locales para gestionar el usuario, la contraseña y los errores
  const [persona, setPersona] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorPersona, setErrorPersona] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  // Función para validar los campos del formulario
  const validar = () => {
    let valid = true;

    // Validamos el campo de usuario
    if (!persona) {
      setErrorPersona("Por favor, ingresa tu usuario.");
      valid = false;
    } else {
      setErrorPersona("");
    }

    // Validamos el campo de contraseña
    if (!contrasena) {
      setErrorContrasena("Por favor, ingresa tu contraseña.");
      valid = false;
    } else {
      setErrorContrasena("");
    }

    return valid;
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenimos la recarga de la página
    if (validar()) { // Si la validación es exitosa
      try {
        // Intentamos iniciar sesión con el correo y la contraseña proporcionados
        await signInWithEmailAndPassword(auth, persona, contrasena);
        // Si el inicio de sesión es exitoso, redirigimos a la página de Productos
        window.location.href = "/Principal";
      } catch (error) {
        // Si el inicio de sesión falla, mostramos una alerta
        alert("Usuario o contraseña Incorrecta. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <>
      <div>
        <h1 id="titulo1">Beauty Shop</h1>
      </div>
      <header id='paginainicial'>
        <div className="container">
          <p>Bienvenido a BEAUTY SHOP, Inicia sesión para comprar.</p>
          <p>En caso de que no tengas una cuenta puedes registrarte.</p>
        </div>
      </header>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h3>INGRESA CON TU CORREO Y CONTRASEÑA</h3>
        {/* Campo de entrada para el correo */}
        <FloatingLabel controlId="floatingInput" label="Ingresa tu correo" className="mb-3">
          <Form.Control 
            type="text" 
            placeholder="Ej: nombre@example.com" 
            value={persona}
            onChange={(e) => setPersona(e.target.value)} // Actualizamos el estado del usuario
            isInvalid={!!errorPersona} // Indicamos si el campo es inválido
          />
          <Form.Control.Feedback type="invalid">
            {errorPersona}
          </Form.Control.Feedback>
        </FloatingLabel>
        {errorPersona && <p style={{ color: 'red' }}>{errorPersona}</p>}

        {/* Campo de entrada para la contraseña */}
        <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
          <Form.Control 
            type="password" 
            placeholder="Ingrese su contraseña" 
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)} // Actualizamos el estado de la contraseña
            isInvalid={!!errorContrasena} // Indicamos si el campo es inválido
          />
          <Form.Control.Feedback type="invalid">
            {errorContrasena}
          </Form.Control.Feedback>
        </FloatingLabel>
        {errorContrasena && <p style={{ color: 'red' }}>{errorContrasena}</p>}

        {/* Botón para iniciar sesión */}
        <Button 
          variant="light" 
          type="submit" 
          style={{ backgroundColor: '#ffb6c1', borderColor: '#ffb6c1', width: '100%', marginBottom: '10px' }}
          onClick={handleLogin} // Manejar el clic del botón de inicio de sesión
        >
          Ingresar
        </Button>

        {/* Botón para redirigir a la página de registro */}
        <Button 
          id="crearcuenta" 
          variant="light" 
          style={{ backgroundColor: '#ffb6c1', borderColor: '#ffb6c1', width: '100%' }} 
          onClick={() => window.location.href = "./Registrar"} // Redirigimos a la página de registro
        >
          Registrar
        </Button>
      </div>
    </>
  );
}





