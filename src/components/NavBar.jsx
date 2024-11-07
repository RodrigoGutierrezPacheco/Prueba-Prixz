"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
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
        <div className="container mx-auto flex justify-between items-start px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={toggleMenu} className="md:hidden text-3xl">
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Menu para pantallas grandes */}
          <div className="hidden md:flex flex-row md:items-center md:gap-8">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group"
              >
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
              </motion.div>
            </Link>
            <Link href="/buscador">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group"
              >
                Buscador
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
              </motion.div>
            </Link>
            {isRegistered ? (
              <Link href="/perfil">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group"
                >
                  Perfil
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
                </motion.div>
              </Link>
            ) : (
              <Link href="/registro">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300 relative group"
                >
                  Regístrate
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-700 ease-in-out" />
                </motion.div>
              </Link>
            )}
            {!currentPath?.includes("/buscador") && (
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 w-auto"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar un libro..."
                  className="px-4 py-2 rounded-lg text-black outline-none"
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

          {/* Menu animado para telefonos */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex md:hidden flex-col gap-4 absolute top-20 left-0 w-full bg-blue-800 py-4 px-4 shadow-lg"
              >
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300"
                  >
                    Inicio
                  </motion.div>
                </Link>
                <Link href="/buscador" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300"
                  >
                    Buscador
                  </motion.div>
                </Link>
                {isRegistered ? (
                  <Link href="/perfil" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300"
                    >
                      Perfil
                    </motion.div>
                  </Link>
                ) : (
                  <Link href="/registro" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xl font-semibold cursor-pointer transition-transform duration-300 hover:text-yellow-300"
                    >
                      Regístrate
                    </motion.div>
                  </Link>
                )}
                {!currentPath?.includes("/buscador") && (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2 w-full"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar un libro..."
                      className="px-4 py-2 rounded-lg text-black outline-none flex-grow"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-yellow-500 rounded-lg text-black hover:bg-yellow-600 transition-colors duration-300"
                    >
                      Buscar
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </Suspense>
  );
}
