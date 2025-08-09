import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo/Nombre */}
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            IsJuanDev
          </span>
          
          {/* Links de redes sociales */}
          <div className="mt-6 flex justify-center space-x-6">
            <a 
              href="https://github.com/IsJuanDev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/juangarcia162/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:juan@example.com" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Email
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} IsJuanDev. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;