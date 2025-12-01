import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProjectCard from '@/components/ProjectCard';

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

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-cyan-400">Projects</h1>
        <p className="text-slate-400">A collection of my work and side projects</p>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-lg border border-slate-800">
          <p className="text-slate-400 text-lg">No projects yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
