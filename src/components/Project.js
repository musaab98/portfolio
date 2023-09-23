import 'bulma/css/bulma.min.css';

const Project = ({ project }) => {
  return (
<div className="project-card-container">
  <div className="card">
    <div className="card-header">
      <p className="card-header-title custom-card-header-title">{project.name}</p>
    </div>
    <div className="card-content">
      <p className="content">{project.description}</p>
      <div className="content">
        <ul>
          {project.tools.map(tool => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <a href={project.link} className="button is-primary">Go to Project</a>
    </div>
  </div>
</div>

  );
}

export default Project;
