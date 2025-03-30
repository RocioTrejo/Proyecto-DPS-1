import { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ProtectedRoute from '../../components/Shared/ProtectedRoute'
import Navbar from '../../components/Shared/Navbar'

export default function UsersPage() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'Manager', email: 'manager@example.com', role: 'manager' },
    { id: 3, name: 'Miembro', email: 'member@example.com', role: 'member' }
  ])

  if (user?.role !== 'admin') {
    return (
      <ProtectedRoute roles={['admin']}>
        <div>No tienes permisos para acceder a esta página</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute roles={['admin']}>
      <div>
        <Navbar />
        <div className="container">
          <h1>Gestión de Usuarios</h1>
          
          <button 
            className="add-button"
            onClick={() => console.log('Agregar nuevo usuario')}
          >
            + Nuevo Usuario
          </button>
          
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select defaultValue={user.role}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="member">Miembro</option>
                      </select>
                    </td>
                    <td>
                      <button>Guardar</button>
                      <button className="danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .add-button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
          cursor: pointer;
        }
        .users-table {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background: #f5f5f5;
        }
        select {
          padding: 0.3rem;
        }
        button {
          padding: 0.3rem 0.8rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          margin-right: 0.5rem;
          cursor: pointer;
        }
        .danger {
          background: #ff3333;
        }
      `}</style>
    </ProtectedRoute>
  )
}