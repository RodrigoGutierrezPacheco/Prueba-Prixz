"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function NavBar() {
  const { isRegistered } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/buscador?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full bg-gradient-to-r from-blue-800 via-teal-700 to-green-700 text-white py-4 shadow-lg"
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          {/* Logo y Hamburger Icon */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group"
              >
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
              </motion.div>
            </Link>

            {/* Hamburger icon para la vista movil */}
            <button onClick={toggleMenu} className="md:hidden text-3xl">
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Links y buscador */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center md:gap-8 absolute md:relative top-20 left-0 w-full md:w-auto md:top-auto bg-blue-800 md:bg-transparent py-4 md:py-0 px-4 md:px-0`}
          >
            <Link href="/buscador" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group md:mb-0 mb-4"
              >
                Buscador
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
              </motion.div>
            </Link>
            {isRegistered ? (
              <Link href="/perfil" onClick={() => setIsMenuOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group md:mb-0 mb-4"
                >
                  Perfil
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
                </motion.div>
              </Link>
            ) : (
              <Link href="/registro" onClick={() => setIsMenuOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group md:mb-0 mb-4"
                >
                  Regístrate
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
                </motion.div>
              </Link>
            )}

            {/* buscador */}
            {!currentPath?.includes("/buscador") && (
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar un libro..."
                  className="px-4 py-2 rounded-lg text-black outline-none flex-grow md:flex-grow-0"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 rounded-lg text-black hover:bg-yellow-600 transition-colors duration-300"
                >
                  Buscar
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.nav>
    </Suspense>
  );
}
