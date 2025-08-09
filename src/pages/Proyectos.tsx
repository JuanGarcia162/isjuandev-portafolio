import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ProjectCard from "../components/ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  githubUrl?: string;
  tags: string[];
  status: "En Desarrollo" | "Completado" | "En Pausa";
}

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchProjects = () => {
    const projectsCollection = collection(db, "projects");
    
    return onSnapshot(projectsCollection, (snapshot) => {
      const fetchedProjects: Project[] = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Project)
      );
      setProjects(fetchedProjects);
    });
  };

  useEffect(() => {
    const unsubscribe = fetchProjects();
    return () => unsubscribe();
  }, []);

  const allTags = [...new Set(projects.flatMap((project) => project.tags))];
  const statuses = ["En Desarrollo", "Completado", "En Pausa"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || project.tags.includes(selectedTag);
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    return matchesSearch && matchesTag && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <section className="p-8 pt-24 md:p-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h2 className="text-4xl-custom font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Proyectos
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
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
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">Todas las tecnologías</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 rounded-lg 
                         bg-white dark:bg-gray-800 
                         text-gray-700 dark:text-gray-200
                         border border-gray-200 dark:border-gray-700
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                         focus:border-transparent
                         w-full md:w-48 cursor-pointer transition-all duration-200"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Todos los estados</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No se encontraron proyectos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Proyectos;