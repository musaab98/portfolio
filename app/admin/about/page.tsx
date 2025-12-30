'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';

interface AboutData {
  id?: string;
  bio: string;
  job_title: string;
  linkedin_url: string;
  github_url: string;
  x_url: string;
}

export default function AdminAbout() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AboutData>({
    bio: '',
    job_title: '',
    linkedin_url: '',
    github_url: '',
    x_url: '',
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const { data: about } = await supabase
      .from('about')
      .select('*')
      .limit(1)
      .single();
    
    if (about) {
      setData(about);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    if (data.id) {
      await supabase
        .from('about')
        .update({
          bio: data.bio,
          job_title: data.job_title,
          linkedin_url: data.linkedin_url,
          github_url: data.github_url,
          x_url: data.x_url,
        })
        .eq('id', data.id);
    } else {
      await supabase
        .from('about')
        .insert({
          bio: data.bio,
          job_title: data.job_title,
          linkedin_url: data.linkedin_url,
          github_url: data.github_url,
          x_url: data.x_url,
          open_to_work: true,
        });
    }
    
    setSaving(false);
    router.refresh();
  };

  if (loading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-200">Edit About</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Basic Info</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
              <input
                type="text"
                value={data.job_title}
                onChange={(e) => setData({ ...data, job_title: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
              <textarea
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                rows={6}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                placeholder="Write about yourself..."
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Social Links</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={data.linkedin_url}
                onChange={(e) => setData({ ...data, linkedin_url: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={data.github_url}
                onChange={(e) => setData({ ...data, github_url: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="https://github.com/yourusername"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">X (Twitter) URL</label>
              <input
                type="url"
                value={data.x_url}
                onChange={(e) => setData({ ...data, x_url: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="https://x.com/yourhandle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
