import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

async function getAboutData() {
  const [about, experience, education] = await Promise.all([
    supabase.from('about').select('*').limit(1).single(),
    supabase.from('work_experience').select('*').order('display_order', { ascending: true }),
    supabase.from('education').select('*').order('display_order', { ascending: true }),
  ]);

  return {
    about: about.data,
    experience: experience.data || [],
    education: education.data || [],
  };
}

export const revalidate = 60;

export default async function AboutPage() {
  const { about, experience, education } = await getAboutData();

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-start gap-6 mb-8">
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-images/pfp.png`}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-lg border-2 border-slate-700"
            unoptimized
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2 text-cyan-400">Musaab Elsheikh</h1>
          <p className="text-slate-400">{about?.job_title || 'Software Engineer'}</p>
          
          {/* Social Links */}
          <div className="flex gap-3 mt-4">
            {about?.linkedin_url && (
              <a 
                href={about.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 transition-colors p-2"
                title="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {about?.github_url && (
              <a 
                href={about.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 transition-colors p-2"
                title="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {about?.x_url && (
              <a 
                href={about.x_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 transition-colors p-2"
                title="X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Bio */}
      {about?.bio && (
        <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">About Me</h2>
          <div className="prose prose-invert prose-cyan max-w-none">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{about.bio}</p>
          </div>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Work Experience</h2>
          <div className="space-y-8">
            {experience.map((exp: any) => (
              <div key={exp.id} className="border-l-2 border-slate-800 pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-cyan-500"></div>
                <h3 className="text-xl font-semibold text-slate-200">{exp.position}</h3>
                <p className="text-cyan-400 mb-2">{exp.company} • {exp.start_date} - {exp.end_date || 'Present'}</p>
                {exp.description && <p className="text-slate-400">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Education</h2>
          <div className="space-y-8">
            {education.map((edu: any) => (
              <div key={edu.id} className="border-l-2 border-slate-800 pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-cyan-500"></div>
                <h3 className="text-xl font-semibold text-slate-200">{edu.degree}</h3>
                {edu.field_of_study && (
                  <p className="text-lg text-slate-300 mt-1">{edu.field_of_study}</p>
                )}
                <p className="text-cyan-400 mt-2">
                  {edu.institution} • {
                    edu.start_date && edu.end_date && edu.start_date !== edu.end_date
                      ? `${edu.start_date} - ${edu.end_date}`
                      : edu.start_date || edu.end_date
                  }
                </p>
                {edu.description && <p className="text-slate-400 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects CTA */}
      <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-6 text-center">
        <h3 className="text-xl font-semibold text-slate-200 mb-2">Want to see my work?</h3>
        <p className="text-slate-400 mb-6">Check out my portfolio to see the projects I've built.</p>
        <Link 
          href="/portfolio" 
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
        >
          View Projects
        </Link>
      </div>
    </section>
  );
}