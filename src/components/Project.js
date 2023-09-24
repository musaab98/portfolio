import 'bulma/css/bulma.min.css';

const Project = ({ project }) => {
  return (
    <div className="project-card-container">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title custom-card-header-title">{project.name}</p>
        </div>
        <div className="card-content">
          <div dangerouslySetInnerHTML={{ __html: project.description }} />
          <div className="content">
            <br />
            <p><strong>Tools and Software:</strong></p> {/* Added Text */}
            <ul className="two-columns-list">
              {project.tools.map(tool => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <p className="content">
            <strong>GitHub: </strong><a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a>
          </p>
          <a href={project.link} className="button is-primary">Go to Project</a>
        </div>
      </div>
    </div>
  );
}

export default Project;
