export default function TaskList({ tasks }) {
    return (
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No hay tareas asignadas</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status ${task.status.replace(' ', '-')}`}>
                  {task.status}
                </span>
              </div>
              <p>{task.description}</p>
              <div className="task-meta">
                <span><strong>Proyecto:</strong> {task.project}</span>
                <span><strong>Fecha límite:</strong> {task.dueDate}</span>
              </div>
              <div className="actions">
                <button>Actualizar Estado</button>
              </div>
            </div>
          ))
        )}
  
        <style jsx>{`
          .task-list {
            margin-top: 1.5rem;
          }
          .task-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
          }
          .task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }
          .status {
            padding: 0.3rem 0.8rem;
            border-radius: 4px;
            font-size: 0.8rem;
            text-transform: capitalize;
          }
          .status.en-progreso {
            background: #fff3cd;
            color: #856404;
          }
          .status.pendiente {
            background: #f8d7da;
            color: #721c24;
          }
          .status.completada {
            background: #d4edda;
            color: #155724;
          }
          .task-meta {
            display: flex;
            gap: 1rem;
            margin: 0.5rem 0;
            font-size: 0.9rem;
            color: #666;
          }
          .actions {
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
        `}</style>
      </div>
    )
  }