'use client';
import React, { useState } from 'react';
import { createClient } from '@/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';

interface StatusToggleProps {
  initialStatus: boolean;
}

export default function StatusToggle({ initialStatus }: StatusToggleProps) {
  const [isOpenToWork, setIsOpenToWork] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    const supabase = createClient();
    const newStatus = !isOpenToWork;
    
    // First get the about row id
    const { data: aboutData } = await supabase
      .from('about')
      .select('id')
      .limit(1)
      .single();
    
    if (!aboutData?.id) {
      // No about row exists, create one
      const { error: insertError } = await supabase
        .from('about')
        .insert({ open_to_work: newStatus });
      
      if (!insertError) {
        setIsOpenToWork(newStatus);
        router.refresh();
      }
    } else {
      // Update existing row
      const { error } = await supabase
        .from('about')
        .update({ open_to_work: newStatus })
        .eq('id', aboutData.id);

      if (!error) {
        setIsOpenToWork(newStatus);
        router.refresh();
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">Availability Status</h2>
          <div className="flex items-center gap-2">
            {isOpenToWork ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-green-400">Open to work</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-yellow-400">Not seeking opportunities</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
            isOpenToWork ? 'bg-green-600' : 'bg-yellow-600'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              isOpenToWork ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
