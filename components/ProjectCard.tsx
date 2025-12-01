import React from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  demo_url?: string;
  repo_url?: string;
  image_url?: string;
  published: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      {project.image_url ? (
        <div className="relative h-48 bg-slate-800 overflow-hidden">
          <img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-6xl text-slate-700">{'</>'}</div>
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h2>
        <p className="text-slate-400 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-3">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Live Demo
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors text-sm font-medium"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
