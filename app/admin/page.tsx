import React from 'react';
import { createClient } from '@/lib/supabaseServer';
import StatusToggle from '@/components/StatusToggle';

async function getStats() {
  const supabase = await createClient();
  
  const [projects, experience, education, about] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact' }),
    supabase.from('work_experience').select('id', { count: 'exact' }),
    supabase.from('education').select('id', { count: 'exact' }),
    supabase.from('about').select('open_to_work').single(),
  ]);

  return {
    projects: projects.count || 0,
    experience: experience.count || 0,
    education: education.count || 0,
    openToWork: about.data?.open_to_work ?? true,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/admin/projects', icon: '🚀' },
    { label: 'Work Experience', value: stats.experience, href: '/admin/experience', icon: '💼' },
    { label: 'Education', value: stats.education, href: '/admin/education', icon: '🎓' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-200 mb-8">Dashboard</h1>
      
      {/* Status Toggle */}
      <div className="mb-8">
        <StatusToggle initialStatus={stats.openToWork} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className="text-4xl font-bold text-cyan-400">{card.value}</span>
            </div>
            <h2 className="text-slate-400">{card.label}</h2>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/projects"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            + Add Project
          </a>
          <a
            href="/admin/experience"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            + Add Experience
          </a>
          <a
            href="/admin/education"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            + Add Education
          </a>
        </div>
      </div>
    </div>
  );
}
