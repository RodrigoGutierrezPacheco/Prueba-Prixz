import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ModalDetalle({ book, onClose }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (book) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-3xl relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0 relative">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-8 h-8 animate-spin"></div>
              </div>
            )}
            <Image
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "/images/libro.png"
              }
              alt={`Portada de ${book.title}`}
              width={200}
              height={300}
              className="object-cover rounded-md"
              onLoadingComplete={() => setIsImageLoading(false)}
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-200">
            <h2 className="text-3xl font-bold mb-4 text-white">{book.title}</h2>
            <p className="mb-2">
              <strong>Autor(es):</strong> {book.author_name?.join(", ") || "Desconocido"}
            </p>
            <p className="mb-2">
              <strong>Año de publicación:</strong> {book.first_publish_year || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Editor:</strong> {book.publisher?.join(", ") || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Número de páginas:</strong> {book.number_of_pages_median || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Idioma:</strong> {book.language?.join(", ") || "Desconocido"}
            </p>
            <p className="mb-4">
              <strong>ISBN:</strong> {book.isbn?.join(", ") || "N/A"}
            </p>
            <div className="mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .loader {
          border-top-color: transparent;
        }
      `}</style>
    </div>
  );
}
