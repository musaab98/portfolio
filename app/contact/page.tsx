'use client';
import React, { useState } from 'react';

const EMAIL = 'elsheikh.musaab@gmail.com';

export default function ContactPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const getMailtoHref = () => {
    const su = encodeURIComponent(subject || 'Message from portfolio');
    const body = encodeURIComponent(message || '');
    // Open Gmail compose directly instead of mailto
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${su}&body=${body}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-cyan-400">Get In Touch</h1>
        <p className="text-slate-400">Have a question or want to work together?</p>
      </div>

      <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Subject"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <textarea
              id="message"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
              placeholder="Your message..."
            />
          </div>

          <a
            href={getMailtoHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors font-medium text-center cursor-pointer"
          >
            Send Message
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={copyEmail}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium cursor-pointer"
          >
            {copied ? 'Copied!' : 'Alternatively, copy my email'}
          </button>
        </div>
      </div>
    </section>
  );
}
