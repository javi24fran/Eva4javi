import { addDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from './firebase';
import { Persona } from "@/interfaces/iPersonas";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { Producto } from "@/interfaces/iProductos";

export const registrarPersona = async (persona: Persona) => {
    const docRef = await addDoc(collection(db, 'personas'), persona);
};

export const registrarUsuario = async (correo: string, password: string) => {
    return createUserWithEmailAndPassword(auth, correo, password);
};

export const iniciarSesion = async (correo: string, password: string) => {
    return signInWithEmailAndPassword(auth, correo, password);
};

export const obtenerPersonas = async () => {
    let personas: Persona[] = [];
    const querySnapshot = await getDocs(collection(db, 'personas'));
    querySnapshot.forEach((doc) => {
        let persona: Persona = {
            rut: doc.data().rut,
            apellido: doc.data().apellido,
            correo: doc.data().correo,
            edad: doc.data().edad,
            fechaNacimiento: doc.data().fechaNacimiento,
            nombre: doc.data().nombre,
            genero: doc.data().genero,
            key: doc.id
        };
        personas.push(persona);
    });
    return personas;
};

export const obtenerPersona = async (key: string) => {
    const docRef = doc(db, "personas", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let persona: Persona = {
            rut: docSnap.data().rut,
            apellido: docSnap.data().apellido,
            correo: docSnap.data().correo,
            edad: docSnap.data().edad,
            fechaNacimiento: docSnap.data().fechaNacimiento,
            nombre: docSnap.data().nombre,
            genero: docSnap.data().genero,
            key: docSnap.id
        }
        return persona;
    } else {
        return undefined;
    }
};

export const actualizarPersona = async (persona: Persona) => {
    const docRef = doc(db, "personas", persona.key!);
    await updateDoc(docRef, {
        nombre: persona.nombre,
        apellido: persona.apellido,
        rut: persona.rut,
        correo: persona.correo,
        fechaNacimiento: persona.fechaNacimiento,
        edad: persona.edad
    });
};

export const eliminarPersona = async (key: string) => {
    const docRef = doc(db, "personas", key);
    await deleteDoc(docRef);
};

export const registrarProducto = async (producto: Producto) => {
  const docRef = await addDoc(collection(db, 'productos'), producto);
};

export const obtenerProductos = async () => {
  let productos: Producto[] = [];
  const querySnapshot = await getDocs(collection(db, 'productos'));
  querySnapshot.forEach((doc) => {
    let producto: Producto = {
      nombre: doc.data().nombre,
      descripcion: doc.data().descripcion,
      precio: doc.data().precio,
      categoria: doc.data().categoria,
      key: doc.id
    };
    productos.push(producto);
  });
  return productos;
};

export const eliminarProducto = async (key: string) => {
  const docRef = doc(db, "productos", key);
  await deleteDoc(docRef);
};

export const obtenerProducto = async (key: string) => {
  const docRef = doc(db, "productos", key);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      key: docSnap.id
    } as Producto;
  } else {
    throw new Error("Producto no encontrado");
  }
};

export const actualizarProducto = async (key: string, producto: Producto) => {
  const docRef = doc(db, "productos", key);
  await updateDoc(docRef, { ...producto });
};