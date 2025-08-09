// PostCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: string;
    imageUrl?: string;
  }
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Añadimos valores por defecto para prevenir errores
  const {
    id = '', 
    title = 'Sin título', 
    description = 'Sin descripción', 
    category = 'Sin categoría', 
    date = '', 
    readTime = '0', 
    imageUrl 
  } = post;

  return (
    <div className="w-full md:w-96 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
      {imageUrl && (
        <div className="mb-4">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-900 dark:text-gray-100">{date || 'Fecha no disponible'}</span>
        <span className="bg-secondary text-xs px-2 py-1 rounded-full text-gray-900 dark:text-primary-dark">
          {category}
        </span>
      </div>
      <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-900 dark:text-gray-100 mb-4">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/blog/${id}`}
          className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 hover:from-blue-400 hover:to-blue-600 dark:hover:from-blue-300 dark:hover:to-blue-400 bg-clip-text text-transparent transition-colors duration-200"
        >
          Leer más
        </Link>
        <span className="text-sm text-gray-900 dark:text-gray-100">{readTime} min de lectura</span>
      </div>
    </div>
  );
};

export default PostCard;