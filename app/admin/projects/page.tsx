'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  project_url: string;
  image_url: string;
  published: boolean;
  display_order: number;
}

export default function AdminProjects() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    
    setProjects(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;

    const slug = editing.slug || editing.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (isNew) {
      await supabase.from('projects').insert({
        title: editing.title,
        slug,
        description: editing.description,
        technologies: editing.technologies,
        project_url: editing.project_url || null,
        image_url: editing.image_url || null,
        published: editing.published,
        display_order: projects.length,
      });
    } else {
      await supabase
        .from('projects')
        .update({
          title: editing.title,
          slug,
          description: editing.description,
          technologies: editing.technologies,
          project_url: editing.project_url || null,
          image_url: editing.image_url || null,
          published: editing.published,
        })
        .eq('id', editing.id);
    }

    setEditing(null);
    setIsNew(false);
    setTechInput('');
    fetchProjects();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
    router.refresh();
  };

  const togglePublished = async (project: Project) => {
    await supabase
      .from('projects')
      .update({ published: !project.published })
      .eq('id', project.id);
    fetchProjects();
    router.refresh();
  };

  const openNew = () => {
    setEditing({
      id: '',
      title: '',
      slug: '',
      description: '',
      technologies: [],
      project_url: '',
      image_url: '',
      published: false,
      display_order: 0,
    });
    setIsNew(true);
    setTechInput('');
  };

  const addTech = () => {
    if (techInput.trim() && editing) {
      setEditing({
        ...editing,
        technologies: [...editing.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    if (editing) {
      setEditing({
        ...editing,
        technologies: editing.technologies.filter((_, i) => i !== index),
      });
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-200">Projects</h1>
        <button
          onClick={openNew}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          + Add Project
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              {isNew ? 'Add Project' : 'Edit Project'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Project Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder="Describe your project..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Add technology..."
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editing.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-cyan-400 rounded text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(index)}
                        className="text-slate-500 hover:text-red-400 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project URL</label>
                <input
                  type="url"
                  value={editing.project_url}
                  onChange={(e) => setEditing({ ...editing, project_url: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="https://github.com/..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={editing.image_url}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="published" className="text-sm text-slate-300 cursor-pointer">
                  Published (visible on portfolio)
                </label>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => { setEditing(null); setIsNew(false); setTechInput(''); }}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-lg border border-slate-800">
          <p className="text-slate-400">No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold text-slate-200">{project.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${project.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-slate-800 text-cyan-400 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => togglePublished(project)}
                    className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer ${
                      project.published 
                        ? 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400' 
                        : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                    }`}
                  >
                    {project.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => { setEditing(project); setIsNew(false); }}
                    className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
