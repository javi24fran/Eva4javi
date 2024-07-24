import { actualizarPersona, obtenerPersona } from '../Firebase/promesas';
import { Persona } from '../interfaces/iPersonas';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const initialState: Persona = {
    apellido: "",
    correo: "",
    edad: 0,
    fechaNacimiento: "",
    nombre: "",
    rut: "",
    genero:""
};

export const Actualizar = () => {
    const router = useRouter();
    const [persona, setPersona] = useState<Persona>(initialState);

    const handlePersona = (name: string, value: string) => {
        setPersona({ ...persona, [name]: value });
    }

    useEffect(() => {
        const key = router.query.key as string;
        if (key) {
            obtenerPersona(key).then((p) => {
                if (p) {
                    setPersona(p);
                } else {
                    router.push('/Tabla');
                }
            });
        } else {
            router.push('/Tabla');
        }
    }, [router.query.key]);

    const modificar = () => {
        actualizarPersona(persona).then(() => {
            alert("Se actualizó con éxito");
            router.push('/Tabla');
        });
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese su nombre: '
                        value={persona.nombre}
                        name="nombre"
                        onChange={(e) => { handlePersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese su apellido: '
                        value={persona.apellido}
                        name="apellido"
                        onChange={(e) => { handlePersona(e.currentTarget.name, e.currentTarget.value) }} />

                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rut:</Form.Label>
                    <Form.Control type='text' placeholder='Ingrese su rut: '
                        value={persona.rut}
                        name="rut"
                        onChange={(e) => { handlePersona(e.currentTarget.name, e.currentTarget.value) }} />

                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Correo:</Form.Label>
                    <Form.Control type='email' placeholder='Ingrese su correo: '
                        value={persona.correo}
                        name="correo"
                        onChange={(e) => { handlePersona(e.currentTarget.name, e.currentTarget.value) }} />

                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha Nacimiento:</Form.Label>
                    <Form.Control type='date' placeholder='Ingrese su fecha de nacimiento: '
                        value={persona.fechaNacimiento}
                        name="fechaNacimiento"
                        onChange={(e) => { handlePersona(e.currentTarget.name, e.currentTarget.value) }} />

                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Edad:</Form.Label>
                    <Form.Control type='number' placeholder='Ingrese su edad: '
                        value={persona.edad}
                        name="edad"
                        onChange={(e) => { handlePersona(e.currentTarget.name, e.currentTarget.value) }} />

                    <Form.Text></Form.Text>
                </Form.Group>
                <Button type="button" variant='success'
                    onClick={modificar}>Modificar</Button>
            </Form>
        </>
    );
}
export default Actualizar;
