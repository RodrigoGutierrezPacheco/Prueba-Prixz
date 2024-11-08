"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 md:p-8"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-blue-400 text-center"
      >
        Bienvenido a la Aplicación de Libros
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-base md:text-lg mb-4 md:mb-6 text-center max-w-full md:max-w-2xl"
      >
        Esta aplicación te permite explorar una variedad de libros y gestionar tu perfil de usuario. Puedes registrarte y personalizar tu perfil, consultar información de libros por título o autor, y ver los detalles de cada libro.
      </motion.p>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="list-disc list-inside mb-6 md:mb-8 max-w-full md:max-w-xl text-left"
      >
        <li className="mb-1 md:mb-2">Registrarse para crear tu cuenta de usuario.</li>
        <li className="mb-1 md:mb-2">Cerrar sesión de tu cuenta en cualquier momento.</li>
        <li className="mb-1 md:mb-2">Editar la información de tu perfil, como nombres, apellidos, teléfono y más.</li>
        <li className="mb-1 md:mb-2">Buscar libros por título o autor y explorar los resultados.</li>
        <li className="mb-1 md:mb-2">Ver los detalles de cada libro, incluyendo información como el autor, año de publicación, editorial, y mucho más.</li>
      </motion.ul>
    </motion.div>
  );
}
