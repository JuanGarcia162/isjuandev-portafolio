// Blog.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import PostCard from "../components/PostCard";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: Timestamp;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función de utilidad para convertir Timestamp a fecha legible
  const formatTimestampToDate = (timestamp: Timestamp): string => {
    if (!timestamp) return "";

    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const fetchPosts = () => {
      try {
        setLoading(true);
        const postsRef = collection(db, "posts");
        // Ordenamos por createdAt en orden descendente (más reciente primero)
        const q = query(postsRef, orderBy("createdAt", "desc"));
        
        return onSnapshot(q, (snapshot) => {
          const postsData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              // Convierte el Timestamp a una cadena de fecha
              date: formatTimestampToDate(data.createdAt),
              // Asegúrate de que todos los campos tengan un valor por defecto
              title: data.title || "Sin título",
              description: data.description || "Sin descripción",
              category: data.category || "Sin categoría",
              readTime: data.readTime || "0",
              content: data.content || "",
              author: data.author || "",
              imageUrl: data.imageUrl || "",
              createdAt: data.createdAt,
            };
          });

          setPosts(postsData);
          setLoading(false);
        }, (err) => {
          console.error("Error fetching posts:", err);
          setError(
            "Error al cargar los posts. Por favor, intenta de nuevo más tarde."
          );
          setLoading(false);
        });
      } catch (err) {
        console.error("Error setting up posts listener:", err);
        setError(
          "Error al configurar la escucha de posts. Por favor, intenta de nuevo más tarde."
        );
        setLoading(false);
        return () => {}; // Retornar una función vacía en caso de error
      }
    };

    const unsubscribe = fetchPosts();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const categories = [...new Set(posts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-16 flex justify-center items-center">
        <div className="text-gray-900 dark:text-white text-xl">
          Cargando posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-16 flex justify-center items-center">
        <div className="text-white dark:text-gray-900 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <section className="p-8 pt-24 md:p-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Artículos
            </h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="pl-10 pr-4 py-2 rounded-lg 
                            bg-white dark:bg-gray-800 
                            text-gray-700 dark:text-gray-200
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                            focus:border-transparent
                            w-full md:w-64 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 rounded-lg 
                bg-white dark:bg-gray-800 
                text-gray-700 dark:text-gray-200
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-transparent
                w-full md:w-56 cursor-pointer transition-all duration-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 dark:text-gray-500 text-lg">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
