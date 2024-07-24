import { registrarPersona, registrarUsuario, iniciarSesion } from '@/Firebase/promesas';
import { Persona } from '@/interfaces/iPersonas';
import React, { useState } from 'react';
import { Col, Form, Row, Button, FloatingLabel } from 'react-bootstrap';

const initialState: Persona = {
  apellido: '',
  correo: '',
  edad: 0,
  fechaNacimiento: '',
  nombre: '',
  rut: '',
  genero: '', // Añadimos el campo de género al estado inicial
};

export const Registrar = () => {
  const [persona, setPersona] = useState<Persona>(initialState);
  const [errors, setErrors] = useState<any>({});
  const [password, setPassword] = useState<string>('');
  const [aceptoTerminos, setAceptoTerminos] = useState<boolean>(false); // Estado para el checkbox de términos

  const handlePersona = (name: string, value: string) => {
    setPersona({ ...persona, [name]: value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAceptoTerminos(e.target.checked);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePersona('genero', e.target.value);
  };

  const validate = () => {
    let valid = true;
    let errors: any = {};

    if (!persona.nombre) {
      errors.nombre = "El nombre es obligatorio.";
      valid = false;
    }
    if (!persona.apellido) {
      errors.apellido = "El apellido es obligatorio.";
      valid = false;
    }
    if (!persona.rut) {
      errors.rut = "El RUT es obligatorio.";
      valid = false;
    }
    if (!persona.correo) {
      errors.correo = "El correo es obligatorio.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(persona.correo)) {
      errors.correo = "El correo no es válido.";
      valid = false;
    }
    if (!password) {
      errors.password = "La contraseña es obligatoria.";
      valid = false;
    }
    if (!persona.fechaNacimiento) {
      errors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
      valid = false;
    }
    if (!persona.edad || persona.edad <= 0) {
      errors.edad = "La edad debe ser mayor que 0.";
      valid = false;
    }
    if (!persona.genero) {
      errors.genero = "El género es obligatorio.";
      valid = false;
    }
    if (!aceptoTerminos) {
      errors.terminos = "Debes aceptar los términos y condiciones.";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const registrar = () => {
    if (validate()) {
      registrarUsuario(persona.correo, password)
        .then((userCredential) => {
          registrarPersona(persona)
            .then(() => {
              alert('Persona registrada con éxito');
              iniciarSesion(persona.correo, password)
                .then(() => {
                  window.location.href = './Principal';
                })
                .catch((e) => {
                  console.log(e);
                  alert('Error al iniciar sesión');
                });
            })
            .catch((e) => {
              console.log(e);
              alert('Ocurrió un error al registrar la persona');
            });
        })
        .catch((e) => {
          console.log(e);
          alert('Ocurrió un error al registrar el usuario');
        });
    }
  };

  return (
    <>
      <h2 className="text-center mt-4">CREAR UNA NUEVA CUENTA</h2>
      <Row className="justify-content-md-center mt-4">
        <Col md={8}>
          <Form>
            <Row>
              <Col md={6}>
                <FloatingLabel controlId="floatingNombre" label="Nombre" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre:"
                    name="nombre"
                    onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="floatingApellido" label="Apellido" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su apellido:"
                    name="apellido"
                    onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    isInvalid={!!errors.apellido}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.apellido}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel controlId="floatingRut" label="Rut" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Ingrese su Rut:"
                name="rut"
                onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                isInvalid={!!errors.rut}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rut}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingCorreo" label="Correo" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Ingrese su correo:"
                name="correo"
                onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                isInvalid={!!errors.correo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.correo}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña:"
                name="password"
                onChange={handlePassword}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingFechaNacimiento" label="Fecha de nacimiento" className="mb-3">
              <Form.Control
                type="date"
                placeholder="Ingrese su fecha de nacimiento:"
                name="fechaNacimiento"
                onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                isInvalid={!!errors.fechaNacimiento}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaNacimiento}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingEdad" label="Edad" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Ingrese su edad:"
                name="edad"
                onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                isInvalid={!!errors.edad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.edad}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Form.Group controlId="generoSelect" className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select value={persona.genero} onChange={handleSelect} isInvalid={!!errors.genero}>
                <option value="">Seleccione género</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.genero}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Acepto términos y condiciones"
                checked={aceptoTerminos}
                onChange={handleCheckbox}
                isInvalid={!!errors.terminos}
                feedback={errors.terminos}
              />
            </Form.Group>
            <Button type="button" variant="dark" className="w-100 mt-4" onClick={registrar}>
              Registrar
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Registrar;




