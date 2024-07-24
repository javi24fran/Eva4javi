// components/TablaProductos.tsx
import { obtenerProductos, eliminarProducto } from '../Firebase/promesas';
import { Producto } from '../interfaces/iProductos';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TablaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [show, setShow] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState<Producto | null>(null);

  useEffect(() => {
    obtenerProductos().then((productos) => {
      setProductos(productos);
    }).catch((e) => {
      console.log(e);
      alert("Algo ocurrió");
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (producto: Producto) => {
    setProductoEliminar(producto);
    setShow(true);
  };

  const handleDelete = async () => {
    if (productoEliminar) {
      await eliminarProducto(productoEliminar.key!);
      setProductos(productos.filter(producto => producto.key !== productoEliminar.key));
      handleClose();
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.key}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.precio}</td>
              <td>{p.categoria}</td>
              <td>
                <Link href={{ pathname: '/Actualizar', query: { key: p.key } }}>
                  <Button variant='warning' className="me-2"><FaEdit /></Button>
                </Link>
                <Button variant='danger' onClick={() => handleShow(p)}><MdDelete /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto {productoEliminar?.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TablaProductos;


