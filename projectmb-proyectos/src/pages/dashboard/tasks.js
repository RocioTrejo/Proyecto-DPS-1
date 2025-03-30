import { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ProtectedRoute from '../../components/Shared/ProtectedRoute'
import Navbar from '../../components/Shared/Navbar'
import TaskList from '../../components/Tasks/TaskList'


export default function TasksPage() {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Implementar autenticación', 
      description: 'Crear sistema de login y registro',
      project: 'Sistema de Gestión',
      assignedTo: user.email,
      status: 'en progreso',
      dueDate: '2023-12-15'
    }
  ])

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div className="container">
          <h1>Mis Tareas</h1>
          
          <div className="filters">
            <select>
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
          
          <TaskList tasks={tasks} />
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .filters {
          margin: 1rem 0;
        }
        select {
          padding: 0.5rem;
          border-radius: 4px;
        }
      `}</style>
    </ProtectedRoute>
  )
}