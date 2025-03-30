import Link from 'next/link'

export default function ProjectList({ projects, userRole }) {
  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p><strong>Manager:</strong> {project.manager}</p>
          
          <div className="actions">
            <Link href={`/dashboard/projects/${project.id}`}>
              <button>Ver Detalles</button>
            </Link>
            
            {userRole === 'admin' && (
              <>
                <button>Editar</button>
                <button className="danger">Eliminar</button>
              </>
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .project-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .project-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        button {
          padding: 0.3rem 0.8rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .danger {
          background: #ff3333;
        }
      `}</style>
    </div>
  )
}