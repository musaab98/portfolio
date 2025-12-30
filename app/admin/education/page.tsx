'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

export default function AdminEducation() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [educations, setEducations] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Education | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    const { data } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true });
    
    setEducations(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;

    if (isNew) {
      await supabase.from('education').insert({
        institution: editing.institution,
        degree: editing.degree,
        field_of_study: editing.field_of_study,
        start_date: editing.start_date,
        end_date: editing.end_date || null,
        description: editing.description,
        display_order: educations.length,
      });
    } else {
      await supabase
        .from('education')
        .update({
          institution: editing.institution,
          degree: editing.degree,
          field_of_study: editing.field_of_study,
          start_date: editing.start_date,
          end_date: editing.end_date || null,
          description: editing.description,
        })
        .eq('id', editing.id);
    }

    setEditing(null);
    setIsNew(false);
    fetchEducations();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    
    await supabase.from('education').delete().eq('id', id);
    fetchEducations();
    router.refresh();
  };

  const openNew = () => {
    setEditing({
      id: '',
      institution: '',
      degree: '',
      field_of_study: '',
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
        <h1 className="text-3xl font-bold text-slate-200">Education</h1>
        <button
          onClick={openNew}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          + Add Education
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              {isNew ? 'Add Education' : 'Edit Education'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Institution</label>
                <input
                  type="text"
                  value={editing.institution}
                  onChange={(e) => setEditing({ ...editing, institution: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="University Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Degree</label>
                <input
                  type="text"
                  value={editing.degree}
                  onChange={(e) => setEditing({ ...editing, degree: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Bachelor of Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Field of Study</label>
                <input
                  type="text"
                  value={editing.field_of_study}
                  onChange={(e) => setEditing({ ...editing, field_of_study: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Computer Science"
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
                    placeholder="2015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                  <input
                    type="text"
                    value={editing.end_date || ''}
                    onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="2019"
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
                  placeholder="Notable achievements, focus areas..."
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

      {/* Education List */}
      {educations.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-lg border border-slate-800">
          <p className="text-slate-400">No education added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div key={edu.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-200">{edu.degree}{edu.field_of_study && ` in ${edu.field_of_study}`}</h3>
                  <p className="text-cyan-400">{edu.institution} • {edu.start_date} - {edu.end_date || 'Present'}</p>
                  {edu.description && <p className="text-slate-400 mt-2">{edu.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(edu); setIsNew(false); }}
                    className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
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
