import React, { useState } from 'react';
import Project from './Project';
import { projects } from '../data/projects';
import 'bulma/css/bulma.min.css';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="columns is-vcentered" style={{paddingLeft: '20px', paddingRight: '20px'}}>
      <div className="column is-one-third">
        <h1 className="title is-2 has-text-centered">Portfolio</h1>
        {projects.map(project => (
          <button
            key={project.id}
            className={`button project-button ${selectedProject.id === project.id ? 'is-active' : ''}`}
            onClick={() => setSelectedProject(project)}
          >
            {project.name}
          </button>
        ))}
      </div>
      <div className="column">
        <Project project={selectedProject} />
      </div>
    </div>
  );
}

export default Home;
