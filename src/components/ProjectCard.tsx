// ProjectCard.tsx
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
  githubUrl?: string;
  status: 'En Desarrollo' | 'Completado' | 'En Pausa';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  link,
  tags,
  githubUrl,
  status
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Desarrollo':
        return 'bg-yellow-500';
      case 'Completado':
        return 'bg-green-500';
      case 'En Pausa':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="max-w-sm rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          src={imageUrl} 
          alt={title}
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-primary-dark dark:text-white ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-2xl mb-3 text-primary-dark dark:text-white">{title}</h3>
        <p className="text-gray-900 dark:text-white text-base mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-btn-primary dark:bg-btn-primary-dark text-gray-900 dark:text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-text-hover dark:hover:text-text-hover-dark transition-colors"
          >
            <ExternalLink size={18} />
            <span>Demo</span>
          </a>
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-text-hover dark:hover:text-text-hover-dark transition-colors"
            >
              <Github size={18} />
              <span>Código</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;