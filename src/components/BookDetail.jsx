import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function BookDetail({ book, onBack }) {
  const [imageError, setImageError] = useState(false);
  const [expandedFields, setExpandedFields] = useState({});

  if (!book) {
    return null;
  }

  const toggleExpand = (field) => {
    setExpandedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderList = (items, field) => {
    if (!items || items.length === 0) {
      return "Sin información.";
    }
    if (items.length > 10) {
      return (
        <>
          {expandedFields[field] ? (
            <>
              {items.join(", ")}
              <button
                onClick={() => toggleExpand(field)}
                className="text-blue-400 underline ml-2"
              >
                Ver menos
              </button>
            </>
          ) : (
            <>
              {items.slice(0, 10).join(", ")} ... 
              <button
                onClick={() => toggleExpand(field)}
                className="text-blue-400 underline ml-2"
              >
                Ver más
              </button>
            </>
          )}
        </>
      );
    }
    return items.join(", ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full px-4 py-10 bg-gradient-to-b from-indigo-900 to-gray-900 min-h-screen text-white"
    >
      <button
        onClick={onBack}
        className="mb-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        Volver
      </button>

      <div className="flex flex-col lg:flex-row items-center w-full max-w-5xl bg-gray-800 rounded-xl p-8 shadow-2xl transform transition-transform duration-300">
        {/* Imagen del libro */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:mr-8 flex justify-center lg:justify-start lg:sticky top-20 self-start">
          {!imageError ? (
            <Image
              src={
                book?.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
                  : "/images/imagen.png"
              }
              alt={`Portada de ${book?.title}`}
              width={300}
              height={400}
              className="object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              placeholder="blur"
              blurDataURL="/images/imagen.png"
              onError={() => setImageError(true)}
            />
          ) : (
            <Image
              src="/images/imagen.png"
              alt="Portada no disponible"
              width={300}
              height={400}
              className="object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>

        {/* Info del libro */}
        <div className="w-full lg:w-2/3 flex flex-col text-center lg:text-left bg-gray-700 p-6 rounded-lg transition-all duration-1000">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-400">
            {book?.title || "Sin información."}
          </h1>
          <p className="text-2xl font-semibold text-indigo-300 mb-4">
            Autor: {renderList(book?.author_name, "author_name")}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold text-blue-400">
              Año de Publicación:
            </span>{" "}
            {book?.first_publish_year || "Desconocido."}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold text-blue-400">Editorial(es):</span>{" "}
            {renderList(book?.publisher, "publisher")}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold text-blue-400">
              Número de Páginas:
            </span>{" "}
            {book?.number_of_pages_median || "Desconocido."}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold text-blue-400">Temas:</span>{" "}
            {renderList(book?.subject, "subject")}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold text-blue-400">País:</span>{" "}
            {renderList(book?.place, "place")}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-400">Descripción:</span>{" "}
            {book?.description?.value ||
              book?.description ||
              "No hay una descripción disponible."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
