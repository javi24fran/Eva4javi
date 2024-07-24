import { obtenerPersonas, eliminarPersona } from '../Firebase/promesas';
import { Persona } from '../interfaces/iPersonas';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const Tabla = () => {
    const [personas, setPersonas] = useState<Persona[]>([]);
    useEffect(() => {
        obtenerPersonas().then((personas) => {
            setPersonas(personas);
        }).catch((e) => {
            console.log(e);
            alert("Algo ocurrió");
        });
    }, []);

    const handleDelete = async (key: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            await eliminarPersona(key);
            setPersonas(personas.filter(persona => persona.key !== key));
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Rut</th>
                        <th>Correo</th>
                        <th>Fecha Nacimiento</th>
                        <th>Edad</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((p) => (
                        <tr key={p.key}>
                            <td>{p.nombre}</td>
                            <td>{p.apellido}</td>
                            <td>{p.rut}</td>
                            <td>{p.correo}</td>
                            <td>{p.fechaNacimiento}</td>
                            <td>{p.edad}</td>
                            <td>
                                <Link href={{ pathname: '/Actualizar', query: { key: p.key } }}>
                                <Button variant='warning' className="me-2"><FaEdit /></Button>
                                </Link>
                                <Button variant='danger' onClick={() => handleDelete(p.key!)}><MdDelete /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
export default Tabla;

