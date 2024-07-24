import Link from 'next/link';
import React from 'react';

const Principal = () => {
    return (
        <>
            <div>
                <h1 id="titulo1">Beauty Shop</h1>
            </div>
            <header id='paginainicial'>
                <div className="container">
                    <nav className="nav">
                        <Link href={"./Registrar"} className="link">Registrar nuevo usuario</Link>
                        <Link href={"./Productos"} className="link">Productos</Link>
                        <Link href={"./Tabla"} className="link">Tabla Usuarios</Link>
                        <Link href={"./"} className="link">Salir (volver a la página de inicio)</Link>
                    </nav>
                </div>
            </header>
            <div>
                <img src="/productos.png" alt="Productos" style={{ width: '100%', height: 'auto' }} />
            </div>
        </>
    );
}

export default Principal;
