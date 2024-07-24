import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { registrarProducto } from '@/Firebase/promesas';
import { Producto } from '@/interfaces/iProductos';

const Capilar = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!nombre) errors.nombre = 'El nombre del producto es obligatorio.';
    if (!descripcion) errors.descripcion = 'La descripción es obligatoria.';
    if (!precio) errors.precio = 'El precio es obligatorio.';
    if (precio && isNaN(parseFloat(precio))) errors.precio = 'El precio debe ser un número válido.';
    if (parseFloat(precio) <= 0) errors.precio = 'El precio debe ser mayor que cero.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const producto: Producto = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        categoria: 'Capilar'
      };
      await registrarProducto(producto);
      alert('Producto registrado con éxito');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setErrors({});
    } catch (error) {
      alert('Error al registrar el producto');
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Registrar Producto Capilar</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la descripción del producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            isInvalid={!!errors.descripcion}
          />
          <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el precio del producto"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            isInvalid={!!errors.precio}
          />
          <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default Capilar;

