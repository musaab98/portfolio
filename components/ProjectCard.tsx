import React from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  project_url?: string;
  image_url?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
      {project.image_url && (
        <div className="h-48 bg-slate-800">
          <img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-200 mb-2">{project.title}</h3>
        <p className="text-slate-400 mb-4">{project.description}</p>
        
        {/* Technologies List */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Technologies:</h4>
            <ul className="list-disc list-inside grid grid-cols-2 gap-x-4 gap-y-1">
              {project.technologies.map((tech, index) => (
                <li key={index} className="text-sm text-slate-400">{tech}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Project Link */}
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            View Project
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
