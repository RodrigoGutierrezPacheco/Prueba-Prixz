"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Perfil() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    nombres: user?.nombres || "",
    apellidos: user?.apellidos || "",
    telefono: user?.telefono || "",
    email: user?.email || "",
    fechaNacimiento: user?.fechaNacimiento || "",
    genero: user?.genero || "masculino",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edad, setEdad] = useState(0);

  useEffect(() => {
    if (user) {
      setForm({
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        telefono: user.telefono || "",
        email: user.email || "",
        fechaNacimiento: user.fechaNacimiento || "",
        genero: user.genero || "masculino",
      });
      calcularEdad(user.fechaNacimiento);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "fechaNacimiento") {
      calcularEdad(value);
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return;
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setEdad(age);
  };

  const validateForm = () => {
    const { nombres, apellidos, telefono, email, fechaNacimiento } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lettersRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{1,10}$/;

    if (!lettersRegex.test(nombres))
      return "Los nombres solo deben contener letras.";
    if (!lettersRegex.test(apellidos))
      return "Los apellidos solo deben contener letras.";
    if (!phoneRegex.test(telefono))
      return "El teléfono debe tener un máximo de 10 dígitos.";
    if (!emailRegex.test(email)) return "El email no es válido.";
    if (!fechaNacimiento) return "La fecha de nacimiento es obligatoria.";

    return null;
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      updateUser(form);
      setIsEditing(false);
      setError(null);
      setLoading(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full px-4 py-10 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen text-white"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Perfil del Usuario
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-lg bg-gray-800 rounded-lg p-8 shadow-2xl"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl font-bold text-center mb-6 text-blue-400"
        >
          Información del Usuario
        </motion.h2>
        <form className="flex flex-col gap-6">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            placeholder="Nombres"
            required
            className="border-none p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            required
            className="border-none p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            className="border-none p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border-none p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
            className="border-none p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.select
            whileFocus={{ scale: 1.05 }}
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="border-none p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </motion.select>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-blue-400"
          >
            Edad: {edad}
          </motion.p>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-center font-semibold"
            >
              {error}
            </motion.p>
          )}
          {isEditing && (
            <div className="flex gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="loader mr-2"></span> Guardando...
                  </span>
                ) : (
                  "Guardar"
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Cancelar
              </motion.button>
            </div>
          )}
        </form>
        {!isEditing && (
          <div className="flex gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Editar Información
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-3 rounded-md font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Cerrar Sesión
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
