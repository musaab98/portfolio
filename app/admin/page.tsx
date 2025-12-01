import React from 'react';

export default function AdminDashboard() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>Protected area. Login will be required here.</p>
      <div className="mt-4 space-x-4">
        <a href="/admin/projects" className="text-blue-600 hover:underline">Manage Projects</a>
        <a href="/admin/about" className="text-blue-600 hover:underline">Edit About</a>
      </div>
    </section>
  );
}
