export default function Footer() {
    return (
      <footer className="bg-black text-white w-full py-10">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap justify-between gap-10">
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
              <h3 className="text-lg font-bold mb-4">Sobre la App</h3>
              <p className="text-sm leading-relaxed">
                Esta aplicación te permite explorar una amplia colección de libros y descubrir detalles relevantes sobre cada uno de ellos. Ideal para aquellos que buscan información completa y accesible al instante.
              </p>
            </div>
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <p className="text-sm leading-relaxed"> <a href="mailto:rodrigogutierrezpacheco@gmail.com" className="text-yellow-400 ml-1 underline hover:text-yellow-500">rodrigogutierrezpacheco@gmail.com</a></p>
              <p className="text-sm mt-4">
                Visita el repositorio en GitHub: 
                <a href="https://github.com/RodrigoGutierrezPacheco/Prueba-Prixz" className="text-yellow-400 underline hover:text-yellow-500" target="_blank" rel="noopener noreferrer"> GitHub</a>
              </p>
            </div>
            
          </div>
          <div className="text-center mt-10 border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BookApp by Rodrigo.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  