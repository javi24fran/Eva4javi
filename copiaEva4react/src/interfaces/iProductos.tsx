export interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: 'Capilar' | 'Maquillaje' | 'Skincare';
    key?: string;
  }
  