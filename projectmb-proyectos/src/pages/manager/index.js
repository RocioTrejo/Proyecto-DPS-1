import React, { useState } from 'react';
import ProtectedRoute from '@components/Auth/Shared/ProtectedRoute';
import { ROLES } from 'src/utils/roles'; // Asegúrate de que la ruta sea correcta
import styles from '@styles/manager.module.css';

export default function ManagerPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
  ]); // Usuarios registrados
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleAddProject = () => {
    if (newProject.trim() !== '') {
      setProjects([...projects, { id: Date.now(), name: newProject, users: [] }]);
      setNewProject('');
    }
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  const handleAssignUser = (userId) => {
    if (selectedProject) {
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, users: [...project.users, users.find((user) => user.id === userId)] }
          : project
      );
      setProjects(updatedProjects);
    }
  };

  return (
    <ProtectedRoute requiredRole={ROLES.MANAGER}>
      <div className={styles.managerContainer}>
        <h1 className={styles.title}>Panel del Gerente de Proyectos</h1>
        <div className={styles.projectInputContainer}>
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Nuevo Proyecto"
            className={styles.inputField}
          />
          <button onClick={handleAddProject} className={styles.addButton}>
            Crear Proyecto
          </button>
        </div>
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <li
              key={project.id}
              className={styles.projectItem}
              onClick={() => setSelectedProject(project)}
            >
              <span>{project.name}</span>
              <ul>
                {project.users.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
              <button onClick={() => handleDeleteProject(project.id)} className={styles.deleteButton}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        {selectedProject && (
          <div className={styles.assignContainer}>
            <h2>Asignar Usuarios a {selectedProject.name}</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <button onClick={() => handleAssignUser(user.id)} className={styles.assignButton}>
                    Asignar {user.username}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}