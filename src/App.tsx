import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const Blog = lazy(() => import('./pages/Blog'));
const Tips = lazy(() => import('./pages/Tips'));
const Contacto = lazy(() => import('./pages/Contacto'));
const PostDetail = lazy(() => import('./components/PostDetail'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-white dark:bg-gray-800">
          <Suspense fallback={<div className="p-8 text-gray-700 dark:text-gray-200">Cargando...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<PostDetail  />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
