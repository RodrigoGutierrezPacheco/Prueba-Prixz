"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getBooks } from "../services/books";
import { useRouter, useSearchParams } from "next/navigation";
import { useBook } from "@/context/BookContext";
import "./buscador.css";

export default function BuscarLibros() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const { setSelectedBook } = useBook();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await getBooks(
        searchType === "title" ? { title: query } : { author: query }
      );
      setBooks(data.docs || []);
      setError(null);
    } catch (err) {
      setError("No se pudieron cargar los libros.");
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/buscador?q=${encodeURIComponent(query)}`); 
      handleSearch(); 
    }
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    router.push("/book-detail");
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      setHasSearched(true);
      setLoading(true);
      getBooks(searchType === "title" ? { title: q } : { author: q })
        .then((data) => {
          setBooks(data.docs || []);
          setError(null);
        })
        .catch(() => {
          setError("No se pudieron cargar los libros.");
        })
        .finally(() => {
          setLoading(false);
          setCurrentPage(1);
        });
    }
  }, [searchParams, searchType]);
  

  const startIndex = (currentPage - 1) * booksPerPage;
  const selectedBooks = books.slice(startIndex, startIndex + booksPerPage);

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
        Buscador de Libros
      </motion.h1>
      <motion.form
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onSubmit={handleSearchSubmit}
        className="flex flex-col items-center w-full max-w-lg mb-8"
      >
        <div className="flex w-full mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar por ${
              searchType === "title" ? "título" : "autor"
            }`}
            className="flex-1 p-3 rounded-l-md border-none text-black focus:outline-none"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-3 bg-gray-700 text-white rounded-r-md focus:outline-none"
          >
            <option value="title">Buscar por título</option>
            <option value="author">Buscar por autor</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar"}
        </motion.button>
      </motion.form>

      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg"
        >
          Cargando...
        </motion.p>
      ) : error ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500"
        >
          {error}
        </motion.p>
      ) : hasSearched && books.length > 0 ? (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            {`Se encontraron ${books.length} libro(s)`}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {selectedBooks.map((book, index) => (
              <motion.div
                key={book?.cover_edition_key || index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col items-center relative"
              >
                {book.first_publish_year && (
                  <div className="absolute -top-4 right-2 transform translate-x-1/2 bg-blue-600 text-white text-xs font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
                    {book.first_publish_year}
                  </div>
                )}
                <div className="w-[150px] cursor-pointer h-[200px] mb-4 overflow-hidden transition-transform duration-700 hover:scale-105">
                  <Image
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "/images/libro.png"
                    }
                    alt={`Portada de ${book.title}`}
                    width={150}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="marquee-container">
                  <h2
                    className={`text-lg font-semibold mb-2 ${
                      book.title.length > 30 ? "marquee-text" : "truncate"
                    }`}
                  >
                    {book.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-400 flex-1 overflow-hidden truncate w-full">
                  Autor: {book.author_name?.join(", ") || "Sin información"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleViewDetails(book)}
                  className="mt-3 w-full py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition-colors duration-300"
                >
                  Ver Detalles
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-between w-full max-w-lg mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition-colors duration-300 disabled:opacity-50"
            >
              Anterior
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextPage}
              disabled={startIndex + booksPerPage >= books.length}
              className="px-6 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition-colors duration-300"
            >
              Siguiente
            </motion.button>
          </div>
        </>
      ) : hasSearched && books.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg"
        >
          No se encontraron resultados
        </motion.p>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg"
        >
          Introduce un término de búsqueda y presiona Buscar.
        </motion.p>
      )}
    </motion.div>
  );
}
