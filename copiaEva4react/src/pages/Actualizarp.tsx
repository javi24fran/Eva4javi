// Actualizar.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container } from 'react-bootstrap';
import { obtenerProducto, actualizarProducto } from '@/Firebase/promesas';
import { Producto } from '@/interfaces/iProductos';

const Actualizarp = () => {
  const router = useRouter();
  const { key } = router.query;
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (key) {
      obtenerProducto(key as string).then((prod) => {
        setProducto(prod);
      }).catch((e) => {
        console.log(e);
        alert("Algo ocurrió al cargar el producto");
      });
    }
  }, [key]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (producto) {
      setProducto({
        ...producto,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (producto) {
      try {
        await actualizarProducto(producto.key!, producto);
        alert('Producto actualizado con éxito');
        router.push('/TablaProductos');
      } catch (error) {
        alert('Error al actualizar el producto');
      }
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <Container>
      <h1 className="text-center my-4">Actualizar Producto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del producto"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la descripción del producto"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el precio del producto"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Actualizar
        </Button>
      </Form>
    </Container>
  );
};

export default Actualizarp;
