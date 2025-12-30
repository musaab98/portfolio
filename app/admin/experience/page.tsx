'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

export default function AdminExperience() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data } = await supabase
      .from('work_experience')
      .select('*')
      .order('display_order', { ascending: true });
    
    setExperiences(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;

    if (isNew) {
      await supabase.from('work_experience').insert({
        company: editing.company,
        position: editing.position,
        start_date: editing.start_date,
        end_date: editing.end_date || null,
        description: editing.description,
        display_order: experiences.length,
      });
    } else {
      await supabase
        .from('work_experience')
        .update({
          company: editing.company,
          position: editing.position,
          start_date: editing.start_date,
          end_date: editing.end_date || null,
          description: editing.description,
        })
        .eq('id', editing.id);
    }

    setEditing(null);
    setIsNew(false);
    fetchExperiences();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    await supabase.from('work_experience').delete().eq('id', id);
    fetchExperiences();
    router.refresh();
  };

  const openNew = () => {
    setEditing({
      id: '',
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      display_order: 0,
    });
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-200">Work Experience</h1>
        <button
          onClick={openNew}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          + Add Experience
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              {isNew ? 'Add Experience' : 'Edit Experience'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                <input
                  type="text"
                  value={editing.company}
                  onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                <input
                  type="text"
                  value={editing.position}
                  onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Job Title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                  <input
                    type="text"
                    value={editing.start_date}
                    onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="2021"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                  <input
                    type="text"
                    value={editing.end_date || ''}
                    onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Present"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder="Describe your role and achievements..."
                />
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
                onClick={() => { setEditing(null); setIsNew(false); }}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience List */}
      {experiences.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-lg border border-slate-800">
          <p className="text-slate-400">No work experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-200">{exp.position}</h3>
                  <p className="text-cyan-400">{exp.company} • {exp.start_date} - {exp.end_date || 'Present'}</p>
                  <p className="text-slate-400 mt-2">{exp.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(exp); setIsNew(false); }}
                    className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
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
