import Link from 'next/link';
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Productos = () => {
  return (
    <Container>
      <h1 className="text-center my-4">Productos</h1>
      <Row>
        <Col md={4}>
          <Link href="/Capilar" className="text-decoration-none">
              <Card>
                <Card.Img variant="top" src="/Capilar.png" />
                <Card.Body>
                  <Card.Title className="text-center">Capilar</Card.Title>
                </Card.Body>
              </Card>

          </Link>
        </Col>
        <Col md={4}>
          <Link href="/Maquillaje" className="text-decoration-none">
              <Card>
                <Card.Img variant="top" src="/Maquillaje.png" />
                <Card.Body>
                  <Card.Title className="text-center">Maquillaje</Card.Title>
                </Card.Body>
              </Card>

          </Link>
        </Col>
        <Col md={4}>
          <Link href="/Skincare" className="text-decoration-none">
            
              <Card>
                <Card.Img variant="top" src="/skincare.jpg" />
                <Card.Body>
                  <Card.Title className="text-center">Skincare</Card.Title>
                </Card.Body>
              </Card>
            
          </Link>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Link href="/TablaProductos">
            <Button variant="primary">Ver Tabla de Productos</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Productos;

