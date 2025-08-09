// PostDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from './Spinner';

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;  // Cambia de Timestamp a string
  readTime: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt?: Timestamp;  // Opcional si ya no lo usas directamente
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Función de utilidad para convertir Timestamp a fecha legible
  const formatTimestampToDate = (timestamp: Timestamp): string => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data(),
            // Convierte el Timestamp a una cadena de fecha
            date: formatTimestampToDate(docSnap.data().createdAt),
          } as Post);
        } else {
          setError('Post no encontrado');
        }
      } catch (error) {
        console.error('Error cargando post:', error);
        setError('Error al cargar el post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-16 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Spinner size="lg" color="text-text-hover dark:text-text-hover-dark" />
          <p className="mt-4 text-gray-800 dark:text-gray-200 text-lg">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-16 flex flex-col items-center justify-center">
        <p className="text-white text-xl mb-4">{error}</p>
        <Link 
          to="/blog" 
          className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 hover:from-blue-400 hover:to-blue-600 dark:hover:from-blue-300 dark:hover:to-blue-400 bg-clip-text text-transparent transition-colors duration-200"
        >
          ← Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 p-16">
        <Link 
          to="/blog" 
          className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 hover:from-blue-400 hover:to-blue-600 dark:hover:from-blue-300 dark:hover:to-blue-400 bg-clip-text text-transparent transition-colors duration-200 mb-6 inline-block"
        >
          ← Volver al blog
        </Link>
        
        <article className="bg-white dark:bg-gray-800 p-8 rounded-lg hover:shadow-2xl transition-all duration-300">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-900 dark:text-gray-100">{post.date}</span>
              <span className="bg-secondary dark:bg-gray-100 text-gray-900 px-3 py-1 rounded-full ">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>
            {post.author && (
              <div className="text-gray-900 dark:text-gray-100 mb-4">Por {post.author}</div>
            )}
            <div className="text-gray-900 dark:text-gray-100">
              {post.readTime} min de lectura
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-8">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-900 dark:text-gray-100 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;