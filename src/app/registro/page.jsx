"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import "../../app/globals.css";

export default function Registro() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    genero: "masculino",
  });
  const [edad, setEdad] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombres" || name === "apellidos") {
      if (/[^A-Za-z\s]/.test(value)) return;
    }

    if (name === "telefono") {
      if (/[^0-9]/.test(value)) return;
      if (value.length > 10) {
        setError("El teléfono no puede tener más de 10 dígitos.");
        return;
      } else {
        setError(null);
      }
    }

    setForm({ ...form, [name]: value });

    if (name === "fechaNacimiento" && value) {
      const birthDate = new Date(value);
      if (!isNaN(birthDate)) {
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
      } else {
        setEdad(null);
      }
    }
  };

  const validateForm = () => {
    const { nombres, apellidos, telefono, email, fechaNacimiento } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lettersRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!lettersRegex.test(nombres))
      return "Los nombres solo deben contener letras.";
    if (!lettersRegex.test(apellidos))
      return "Los apellidos solo deben contener letras.";
    if (!phoneRegex.test(telefono))
      return "El teléfono debe tener exactamente 10 dígitos.";
    if (!emailRegex.test(email)) return "El email no es válido.";
    if (!fechaNacimiento) return "La fecha de nacimiento es obligatoria.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const userData = {
        ...form,
        edad,
      };

      login(userData);
      setError(null);
      setLoading(false);
      router.push("/perfil");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center w-full px-4 py-16 bg-gradient-to-b from-indigo-900 to-gray-900 min-h-screen text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-lg bg-gray-800 rounded-lg p-8 shadow-2xl transform transition-transform duration-300"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-3xl font-bold text-center mb-6 text-blue-400"
        >
          Formulario de Registro
        </motion.h1>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
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
            placeholder="Teléfono (10 dígitos)"
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
          {form.fechaNacimiento && !isNaN(new Date(form.fechaNacimiento)) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-lg font-semibold"
            >
              Edad: <span className="text-blue-400">{edad}</span>
            </motion.p>
          )}
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="loader mr-2"></span> Guardando...
              </span>
            ) : (
              "Guardar"
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
