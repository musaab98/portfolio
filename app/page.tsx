import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-start gap-6 mb-8">
        <Image
          src="/pfp.png"
          alt="Profile"
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-2 text-cyan-400">About Me</h1>
          <p className="text-slate-400">Software Engineer</p>
          
          {/* Social Links */}
          <div className="flex gap-3 mt-4">
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors p-2"
              title="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors p-2"
              title="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a 
              href="https://x.com/yourhandle" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors p-2"
              title="X"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* About Content */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mb-8">
        <div className="prose prose-invert prose-cyan max-w-none">
          <p className="text-slate-300 leading-relaxed mb-4">
            Welcome! I'm a full-stack software engineer passionate about building scalable,
            user-friendly applications. This portfolio showcases my work and technical projects.
          </p>
          <p className="text-slate-300 leading-relaxed">
            (Your About content will be fetched from Supabase and rendered as markdown here)
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Work Experience</h2>
        <div className="space-y-8">
          {/* Experience Item 1 */}
          <div className="border-l-2 border-slate-800 pl-6 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-cyan-500"></div>
            <h3 className="text-xl font-semibold text-slate-200">Senior Software Engineer</h3>
            <p className="text-cyan-400 mb-2">Tech Company Inc. • 2021 - Present</p>
            <p className="text-slate-400">
              Led development of core platform features using React and Node.js. Improved system performance by 40% and mentored junior developers.
            </p>
          </div>
          
          {/* Experience Item 2 */}
          <div className="border-l-2 border-slate-800 pl-6 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-cyan-500"></div>
            <h3 className="text-xl font-semibold text-slate-200">Software Developer</h3>
            <p className="text-cyan-400 mb-2">StartUp LLC • 2019 - 2021</p>
            <p className="text-slate-400">
              Full stack development for client projects. Implemented responsive UI designs and RESTful APIs.
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Education</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-200">Bachelor of Science in Computer Science</h3>
            <p className="text-cyan-400">University of Technology • 2015 - 2019</p>
            <p className="text-slate-400 mt-2">
              Focus on Software Engineering and Distributed Systems. Graduated with Honors.
            </p>
          </div>
        </div>
      </div>

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