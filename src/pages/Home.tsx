import React from 'react';
import { Download } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <section className="hero p-8 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Contenedor de la imagen */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-full p-2">
            <img 
              className="w-48 h-48 object-cover rounded-full" 
              src="/Photo.svg" 
              width="192" 
              height="192" 
              loading="eager" 
              decoding="async" 
              fetchPriority="high" 
              alt="Juan Diego García" 
            />
          </div>
        </div>

        {/* Nombre */}
        <h1 className="text-5xl font-bold mt-8 mb-4 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Juan Diego García
        </h1>

        {/* Descripción */}
        <p className="text-2xl font-light mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Desarrollador Sr Full Stack | .NET + Angular, React, Flutter
        </p>

        {/* Botón CV */}
        <a 
          href="./CV-GarciaJuanDiego.pdf" 
          download="GarciaJuanDiego.pdf"
          className="group px-8 py-4 bg-btn-primary dark:bg-btn-primary-dark hover:bg-btn-hover dark:hover:bg-btn-hover-dark 
                     text-white font-semibold rounded-full shadow-lg 
                     transition-all duration-300 transform hover:-translate-y-1 
                     flex items-center gap-2"
        >
          <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
          Descargar CV
        </a>
      </section>
    </div>
  );
};

export default Home;